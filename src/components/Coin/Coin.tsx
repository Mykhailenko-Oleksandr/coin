import css from "./Coin.module.css";

interface CoinProps {
  frontImgUrl: string;
  backImgUrl?: string;
  width?: number;
  height?: number;
  color?: string;
  thickness?: number;
  animationSpeed?: string;
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
  } = props;

  const halfThickness = Math.ceil(thickness / 2);
  return (
    <div className={css.wrap}>
      <div
        className={css.coin}
        style={{
          width: `${width}px`,
          height: `${height ?? width}px`,
          animationDuration: animationSpeed,
        }}>
        <div
          className={css.imgBox}
          style={{
            transform: `translateZ(${halfThickness + 1}px)`,
          }}>
          <img
            src={frontImgUrl}
            alt="Coin front"
            className={css.image}
          />
        </div>
        <div
          className={css.edge}
          style={{
            backgroundColor: color,
            transform: `translateZ(${halfThickness}px)`,
          }}></div>
        <div
          className={css.center}
          style={{ backgroundColor: color, width: `${thickness}px` }}></div>
        <div
          className={css.edge}
          style={{
            backgroundColor: color,
            transform: `translateZ(-${halfThickness}px)`,
          }}></div>
        <div
          className={css.imgBox}
          style={{
            transform: `rotateY(180deg) translateZ(${halfThickness + 1}px)`,
          }}>
          <img
            src={backImgUrl ?? frontImgUrl}
            alt="Coin back"
            className={css.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Coin;
