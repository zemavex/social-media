import path from "path";
import { configDotenv } from "dotenv";

const pathToEnv = path.join(__dirname, "..", "..", "..", "..", ".env");

configDotenv({ path: pathToEnv });
