import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "@/app/App";
import "@/shared/config/i18n";
import { store } from "./app/store";

const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
