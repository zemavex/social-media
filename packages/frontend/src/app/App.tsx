import { useThemeEffect } from "@/shared/theme";
import { AppRouter } from "./router";
import "./styles/index.scss";

const App = () => {
  useThemeEffect();

  return <AppRouter />;
};

export default App;
