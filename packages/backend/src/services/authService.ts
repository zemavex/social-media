import axios from "axios";
import bcrypt from "bcrypt";
import type { RegisterSchema, LoginSchema } from "~shared/user";
import { API_ERROR_CODES } from "~shared/core";
import { User, UserRow } from "@/entities/user";
import { BadRequestError, ConflictError, UnauthorizedError } from "@/errors";

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

const githubAuth = async (code: string): Promise<UserRow> => {
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
): Promise<UserRow> => {
  const foundUser = await User.findById(userId);
  if (!foundUser) throw new UnauthorizedError();

  const githubUser = await getGithubUser(code);

  const foundUserByGithub = await User.findByGithubId(githubUser.id);
  if (foundUserByGithub) {
    if (foundUserByGithub.id === userId) {
      throw new ConflictError(API_ERROR_CODES.GITHUB_CONNECTED_TO_CURRENT_USER);
    }
    throw new ConflictError(API_ERROR_CODES.GITHUB_CONNECTED_TO_ANOTHER_USER);
  }

  const user = await User.updateGithubId(githubUser.id, userId);

  return user;
};

async function register(userData: RegisterSchema): Promise<UserRow> {
  const foundUser = await User.findByEmail(userData.email);
  if (foundUser) throw new ConflictError(API_ERROR_CODES.EMAIL_ALREADY_USED);

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return newUser;
}

async function login({ email, password }: LoginSchema): Promise<UserRow> {
  const foundUser = await User.findByEmail(email);
  if (!foundUser?.password) {
    throw new BadRequestError(API_ERROR_CODES.INVALID_CREDENTIALS);
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) {
    throw new BadRequestError(API_ERROR_CODES.INVALID_CREDENTIALS);
  }

  return foundUser;
}

export const authService = {
  githubAuth,
  githubConnect,
  register,
  login,
};
