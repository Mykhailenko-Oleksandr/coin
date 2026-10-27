import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import css from "./App.module.css";
import Coin from "./components/Coin/Coin";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Coin
      containerClassName={css.wrapCoin}
      frontImgUrl="coin2.jfif"
      backImgUrl="coin.png"
      width={400}
      thickness={30}
      animationSpeed="5s"
      shine
      shadow
      color="rgb(166, 115, 12)"
    />
  </StrictMode>,
);
