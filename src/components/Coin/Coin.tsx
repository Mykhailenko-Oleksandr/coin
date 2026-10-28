import css from "./Coin.module.css";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
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
  if (height !== undefined) {
    validatePositiveDimension("height", height);
  }

  const coinRef = useRef<HTMLDivElement>(null);
  const [renderedSize, setRenderedSize] = useState({
    width,
    height: height ?? width,
  });

  useEffect(() => {
    const coinElement = coinRef.current;
    if (!coinElement) return;

    const observer = new ResizeObserver(([entry]) => {
      const actualWidth = entry.contentRect.width;

      const actualHeight =
        height === undefined ? actualWidth : entry.contentRect.height;

      setRenderedSize((current) => {
        if (
          Math.abs(current.width - actualWidth) < 0.01 &&
          Math.abs(current.height - actualHeight) < 0.01
        ) {
          return current;
        }
        return { width: actualWidth, height: actualHeight };
      });
    });

    observer.observe(coinElement);
    return () => observer.disconnect();
  }, [height]);

  const radiusX = renderedSize.width / 2;
  const radiusY = renderedSize.height / 2;
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
        ref={coinRef}
        className={`${css.coin} ${coinClassName ?? ""}`}
        data-round={height === undefined ? "true" : undefined}
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
