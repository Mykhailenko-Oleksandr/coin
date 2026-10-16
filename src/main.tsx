import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Coin from "./components/Coin/Coin";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Coin
      frontImgUrl="coin2.jfif"
      backImgUrl="coin.png"
      width={400}
      thickness={50}
      animationSpeed="2s"
      shine
    />
    {/* <Coin frontImgUrl="coin.png" width={400} color="red" /> */}
  </StrictMode>,
);
