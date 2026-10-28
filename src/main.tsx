import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import css from "./App.module.css";
import Coin from "./components/Coin/Coin";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Coin
      containerClassName={css.wrapCoin}
      coinClassName={css.coin}
      frontImgUrl="coinFront.png"
      backImgUrl="coinBack.png"
      thickness={30}
      animationSpeed="5s"
      shine
      shadow
      color="#d39d45"
    />
  </StrictMode>,
);
