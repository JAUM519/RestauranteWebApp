import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store.js";
import { startAuthListener } from "./features/auth/authThunks.js";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";

// Contextos
import { AppProvider } from "./context/AppContext.jsx";
import { LiveProvider } from "./context/LiveContext.jsx";
import { HistoryProvider } from "./context/HistoryContext.jsx";
import { PedidoProvider } from "./context/PedidoContext.jsx";

import "./index.scss";

// Registrar helper de seeding en desarrollo
if (import.meta.env?.DEV) {
  import("./data/seedFirestoreMenu.js")
    .then((mod) => mod.attachSeedHelper?.())
    .catch(() => {});
}

function Bootstrap() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(startAuthListener());
  }, [dispatch]);

  return (
    <LiveProvider>
      <AppProvider>
        <HistoryProvider>
          <PedidoProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </PedidoProvider>
        </HistoryProvider>
      </AppProvider>
    </LiveProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Bootstrap />
    </Provider>
  </React.StrictMode>
);
