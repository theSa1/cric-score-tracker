import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { RecoilUndoRoot } from "recoil-undo";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <RecoilUndoRoot>
        <App />
      </RecoilUndoRoot>
    </RecoilRoot>
  </StrictMode>
);
