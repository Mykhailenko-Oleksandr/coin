import css from "./Coin.module.css";
import { useMemo, type CSSProperties } from "react";
import type { CoinDetailLevel } from "./Coin.types";
import getEllipseEdgeLayout from "../../utils/getEllipseEdgeLayout";
import validatePositiveDimension from "../../utils/validatePositiveDimension";

interface CoinProps {
  frontImgUrl: string;
  backImgUrl?: string;
  detail?: CoinDetailLevel;
  width?: number;
  height?: number;
  color?: string;
  thickness?: number;
  animationSpeed?: string;
  shine?: boolean;
  shadow?: boolean;
  shadowDistance?: number;
}

const Coin = (props: CoinProps) => {
  const {
    frontImgUrl,
    backImgUrl,
    detail = "detailed",
    width = 200,
    height,
    thickness = 40,
    color = "rgb(46, 46, 46)",
    animationSpeed = "5s",
    shine = false,
    shadow = false,
    shadowDistance = 50,
  } = props;

  validatePositiveDimension("width", width);
  validatePositiveDimension("thickness", thickness);
  if (height) {
    validatePositiveDimension("height", height);
  }

  const styleVariables = {
    "--coin-width": `${width}px`,
    "--coin-height": `${height ?? width}px`,
    "--coin-speed": animationSpeed,
    "--coin-thickness": `${thickness}px`,
    "--coin-color": color,
    "--shadow-distance": `-${shadowDistance}px`,
  } as CSSProperties;

  const coinHeight = height ?? width;
  const radiusX = width / 2;
  const radiusY = coinHeight / 2;
  const { angles, circumference, segmentCount } = useMemo(
    () => getEllipseEdgeLayout(radiusX, radiusY, detail),
    [radiusX, radiusY, detail],
  );

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
        <div
          className={css.edgeFront}
          aria-hidden="true"></div>
        <div
          className={css.edgeSide}
          aria-hidden="true">
          {angles.map((angle, index) => {
            // Обчислює координати сегмента на еліптичному контурі.
            const x = radiusX * Math.cos(angle);
            const y = radiusY * Math.sin(angle);

            // Повертає сегмент уздовж дотичної до контуру монети.
            const tangentAngle = Math.atan2(
              radiusY * Math.cos(angle),
              -radiusX * Math.sin(angle),
            );

            return (
              <div
                key={index}
                className={css.edgeSegment}
                style={{
                  width: `${(circumference / segmentCount) * 1.08}px`,
                  transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotateZ(${tangentAngle}rad) rotateX(90deg)`,
                }}
              />
            );
          })}
        </div>
        <div
          className={css.edgeBack}
          aria-hidden="true"></div>
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
