import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import Layout from "@/components/layouts/Layout";
import "./index.css";
import store from "./state";
import "@/utils/leafletIconConfig.ts";
import { logEvent } from "@/utils/logEvent";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <Layout />
        </Provider>
    </StrictMode>
);

logEvent("page_view", { path: window.location.pathname });
