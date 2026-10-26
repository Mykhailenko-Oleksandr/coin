import css from "./Coin.module.css";
import type { CSSProperties } from "react";

interface CoinProps {
  frontImgUrl: string;
  backImgUrl?: string;
  width?: number;
  height?: number;
  color?: string;
  thickness?: number;
  animationSpeed?: string;
  shine?: boolean;
  shadow?: boolean;
}

const Coin = (props: CoinProps) => {
  const {
    frontImgUrl,
    backImgUrl,
    width = 200,
    height,
    thickness = 40,
    color = "rgb(46, 46, 46)",
    animationSpeed = "5s",
    shine = false,
    shadow = false,
  } = props;

  const styleVariables = {
    "--coin-width": `${width}px`,
    "--coin-height": `${height ?? width}px`,
    "--coin-speed": animationSpeed,
    "--coin-thickness": `${thickness}px`,
    "--coin-color": color,
  } as CSSProperties;

  return (
    <div className={css.wrap}>
      <div
        className={css.coin}
        style={styleVariables}>
        <div className={`${css.imgBoxFront} ${shine ? css.imgShine : ""}`}>
          <img
            src={frontImgUrl}
            alt="Coin front"
            className={css.image}
          />
        </div>
        <div className={css.edgeFront}></div>
        <div className={css.center}></div>
        <div className={css.edgeBack}></div>
        <div className={`${css.imgBoxBack} ${shine ? css.imgShine : ""}`}>
          <img
            src={backImgUrl ?? frontImgUrl}
            alt="Coin back"
            className={css.image}
          />
        </div>
        {shadow && <div className={css.shadow}></div>}
      </div>
    </div>
  );
};

export default Coin;
