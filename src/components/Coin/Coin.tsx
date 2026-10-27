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
  containerClassName?: string;
  coinClassName?: string;
  shadowClassName?: string;
}

const Coin = (props: CoinProps) => {
  const {
    frontImgUrl,
    backImgUrl,
    containerClassName,
    coinClassName,
    detail = "detailed",
    width = 200,
    height,
    thickness = 40,
    color = "rgb(46, 46, 46)",
    animationSpeed = "5s",
    shine = false,
    shadow = false,
    shadowClassName,
    shadowDistance = 50,
  } = props;

  validatePositiveDimension("width", width);
  validatePositiveDimension("thickness", thickness);
  if (height) {
    validatePositiveDimension("height", height);
  }

  const coinHeight = height ?? width;
  const radiusX = width / 2;
  const radiusY = coinHeight / 2;
  const { angles, circumference, segmentCount } = useMemo(
    () => getEllipseEdgeLayout(radiusX, radiusY, detail),
    [radiusX, radiusY, detail],
  );
  const edgeWidth = (circumference / segmentCount) * 1.08;

  const styleVariables = {
    "--coin-width": `${width}px`,
    "--coin-height": `${height ?? width}px`,
    "--coin-speed": animationSpeed,
    "--coin-thickness": `${thickness}px`,
    "--coin-color": color,
    "--shadow-distance": `-${shadowDistance}px`,
    "--edge-width": `${edgeWidth}px`,
  } as CSSProperties;

  return (
    <div className={`${css.wrap} ${containerClassName ?? ""}`}>
      <div
        className={`${css.coin} ${coinClassName ?? ""}`}
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
            const x = radiusX * Math.cos(angle);
            const y = radiusY * Math.sin(angle);

            const tangentAngle = Math.atan2(
              radiusY * Math.cos(angle),
              -radiusX * Math.sin(angle),
            );

            return (
              <div
                key={index}
                className={css.edgeSegment}
                style={
                  {
                    "--edge-x": `${x}px`,
                    "--edge-y": `${y}px`,
                    "--edge-angle": `${tangentAngle}rad`,
                  } as CSSProperties
                }
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
        {shadow && (
          <div className={`${css.shadow} ${shadowClassName ?? ""}`}></div>
        )}
      </div>
    </div>
  );
};

export default Coin;
