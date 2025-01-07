import { AppRouter } from "./router";
import { useAuthenticate } from "./model/useAuthenticate";

const App = () => {
  const { isAuthenticating } = useAuthenticate();

  if (isAuthenticating) return "loading...";

  return <AppRouter />;
};

export default App;
