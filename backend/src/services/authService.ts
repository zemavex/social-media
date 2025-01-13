import axios from "axios";
import bcrypt from "bcrypt";
import { User, UserModel } from "entities/user";
import { ConflictError, UnauthorizedError } from "errors";

interface GithubUserInfo {
  login: string;
  id: number;
  avatar_url: string | null;
  name: string | null;
}

const githubOAuth = async (code: string): Promise<GithubUserInfo> => {
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

  const userInfo = await axios.get<GithubUserInfo>(
    `https://api.github.com/user`,
    {
      headers: { Authorization: `Bearer ${oauthRes.data.access_token}` },
    }
  );

  return userInfo.data;
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
