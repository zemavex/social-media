import axios from "axios";
import bcrypt from "bcrypt";
import { User, UserModel } from "entities/user";
import { ConflictError, UnauthorizedError } from "errors";

interface GithubUser {
  id: number;
  login: string;
  avatar_url?: string;
  name?: string;
}

const githubOAuth = async (code: string): Promise<UserModel> => {
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

  let user = await User.findByGithubId(githubUser.id);
  if (!user) {
    user = await User.createWithGithub(githubUser.id);
  }

  return user;
};

async function register(email: string, password: string): Promise<UserModel> {
  const foundUser = await User.findByEmail(email);
  if (foundUser)
    throw new ConflictError(`User with email "${email}" already exists`);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword });

  return newUser;
}

async function login(email: string, password: string): Promise<UserModel> {
  const LoginError = new UnauthorizedError("Invalid email or password");

  const foundUser = await User.findByEmail(email);
  if (!foundUser) throw LoginError;
  if (!foundUser.password) throw LoginError;

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) throw LoginError;

  return foundUser;
}

export const authService = {
  githubOAuth,
  register,
  login,
};
