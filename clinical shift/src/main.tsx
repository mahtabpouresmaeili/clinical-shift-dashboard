import ReactDOM from "react-dom/client";
import { AppProviders } from "./app/providers/AppProviders";

import "./styles/index.css";
import AppRouter from "./app/router/AppRouter";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <AppRouter />
  </AppProviders>
);