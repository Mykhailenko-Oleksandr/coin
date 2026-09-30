// import css from "./Coin.module.css";

// interface CoinProps {
//   frontImgUrl: string;
//   backImgUrl?: string;
//   width?: number;
//   height?: number;
//   color?: string;
//   thickness?: number;
//   animationSpeed?: string;
// }

// const Coin = (props: CoinProps) => {
//   const {
//     frontImgUrl,
//     backImgUrl,
//     width = 200,
//     height,
//     thickness = 40,
//     color = "rgb(46, 46, 46)",
//     animationSpeed = "5s",
//   } = props;

//   const halfThickness = Math.ceil(thickness / 2);
//   return (
//     <div className={css.wrap}>
//       <div
//         className={css.coin}
//         style={{
//           width: `${width}px`,
//           height: `${height ?? width}px`,
//           animationDuration: animationSpeed,
//         }}
//       >
//         <img
//           src={frontImgUrl}
//           alt="Coin front"
//           className={css.front}
//           style={{
//             transform: `translateZ(${halfThickness + 1}px)`,
//           }}
//         />
//         <div
//           className={css.edgeFront}
//           style={{
//             backgroundColor: color,
//             transform: `translateZ(${halfThickness}px)`,
//           }}
//         ></div>
//         <div
//           className={css.center}
//           style={{ backgroundColor: color, width: `${thickness}px` }}
//         ></div>
//         <div
//           className={css.edgeBack}
//           style={{
//             backgroundColor: color,
//             transform: `translateZ(-${halfThickness}px)`,
//           }}
//         ></div>
//         <img
//           src={backImgUrl ?? frontImgUrl}
//           alt="Coin back"
//           className={css.back}
//           style={{
//             transform: `translateZ(-${halfThickness + 1}px)`,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Coin;

import css from "./Coin.module.css";

interface CoinProps {
  frontImgUrl: string;
  backImgUrl?: string;
  size?: number; // Зручніше використовувати одне число для ширини/висоти
  thickness?: number; // Краще передавати число у пікселях
  color?: string;
  animationSpeed?: string;
}

const Coin = ({
  frontImgUrl,
  backImgUrl,
  size = 200,
  thickness = 40,
  color = "rgb(46, 46, 46)",
  animationSpeed = "5s",
}: CoinProps) => {
  const halfThickness = Math.ceil(thickness / 2);

  return (
    <div className={css.wrap}>
      <div
        className={css.coin}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: animationSpeed,
        }}
      >
        {/* Передня сторона */}
        <div
          className={css.side}
          style={{ transform: `translateZ(${halfThickness + 1}px)` }}
        >
          <img src={frontImgUrl} alt="Coin front" className={css.image} />
        </div>

        {/* Переднє ребро */}
        <div
          className={css.edge}
          style={{
            backgroundColor: color,
            transform: `translateZ(${halfThickness}px)`,
          }}
        />

        {/* Центральне кільце (товщина) */}
        <div
          className={css.center}
          style={{
            backgroundColor: color,
            width: `${thickness}px`,
            height: `${size}px`,
          }}
        />

        {/* Заднє ребро */}
        <div
          className={css.edge}
          style={{
            backgroundColor: color,
            transform: `translateZ(-${halfThickness}px)`,
          }}
        />

        {/* Задня сторона */}
        <div
          className={css.side}
          style={{
            transform: `rotateY(180deg) translateZ(${halfThickness + 1}px)`,
          }}
        >
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
