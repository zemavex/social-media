import { Provider } from "react-redux";
import { AppRouter } from "./router";
import { store } from "./store";
import "./styles/index.scss";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
