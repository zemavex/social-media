import axios from "axios";
import bcrypt from "bcrypt";
import {
  User,
  UserModel,
  type LoginSchema,
  type RegisterSchema,
} from "entities/user";
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  ERROR_CODES,
} from "errors";

interface GithubUser {
  id: number;
  login: string;
  avatar_url?: string;
  name?: string;
}

const getGithubUser = async (code: string): Promise<GithubUser> => {
  const {
    GITHUB_OAUTH_CLIENT_ID: client_id,
    GITHUB_OAUTH_CLIENT_SECRET: client_secret,
  } = process.env;

  const oauthRes = await axios.post<{ access_token: string }>(
    "https://github.com/login/oauth/access_token",
    null,
    {
      params: {
        client_id,
        client_secret,
        code,
      },
      headers: { Accept: "application/json" },
    }
  );

  const { data: githubUser } = await axios.get<GithubUser>(
    `https://api.github.com/user`,
    {
      headers: { Authorization: `Bearer ${oauthRes.data.access_token}` },
    }
  );

  return githubUser;
};

const githubAuth = async (code: string): Promise<UserModel> => {
  const githubUser = await getGithubUser(code);

  let user = await User.findByGithubId(githubUser.id);
  if (!user) {
    user = await User.createWithGithub(githubUser.id);
  }

  return user;
};

const githubConnect = async (
  userId: number,
  code: string
): Promise<UserModel> => {
  const foundUser = await User.findById(userId);
  if (!foundUser) throw new UnauthorizedError();

  const githubUser = await getGithubUser(code);

  const foundUserByGithub = await User.findByGithubId(githubUser.id);
  if (foundUserByGithub)
    throw new ConflictError(ERROR_CODES.GITHUB_ALREADY_CONNECTED);

  const user = await User.updateGithubId(githubUser.id, userId);

  return user;
};

async function register(userData: RegisterSchema): Promise<UserModel> {
  const foundUser = await User.findByEmail(userData.email);
  if (foundUser) throw new ConflictError(ERROR_CODES.EMAIL_ALREADY_USED);

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return newUser;
}

async function login({ email, password }: LoginSchema): Promise<UserModel> {
  const foundUser = await User.findByEmail(email);
  if (!foundUser?.password) {
    throw new BadRequestError(ERROR_CODES.INVALID_CREDENTIALS);
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) {
    throw new BadRequestError(ERROR_CODES.INVALID_CREDENTIALS);
  }

  return foundUser;
}

export const authService = {
  githubAuth,
  githubConnect,
  register,
  login,
};
