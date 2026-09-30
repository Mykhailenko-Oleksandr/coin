import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Coin from "./components/Coin/Coin";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Coin
      frontImgUrl="price.webp"
      width={400}
      color="red"
      thickness={60}
      animationSpeed="50s"
    />
    {/* <Coin frontImgUrl="coin.png" width={400} color="red" /> */}
  </StrictMode>,
);
