const EDGE_SEGMENT_SPACING = Math.PI * 2;
const MIN_EDGE_SEGMENT_COUNT = 24;
const MAX_EDGE_SEGMENT_COUNT = 160;
import type { CoinDetailLevel } from "../components/Coin/Coin.types";

/**
 * Розраховує периметр еліпса та рівномірні позиції сегментів його бокового ребра.
 * Рівномірність визначається відстанню вздовж периметра, а не різницею кутів.
 *
 * @param {number} radiusX - Горизонтальний радіус (півось `X`) еліпса монети.
 * @param {number} radiusY - Вертикальний радіус (півось `Y`) еліпса монети.
 * @param {CoinDetailLevel} detail - Рівень деталізації ребра: `detailed` (за замовчуванням)
 *   або `simplified`, що створює приблизно вдвічі менше сегментів.
 * @returns {{ angles: number[]; circumference: number; segmentCount: number }} Об'єкт, що містить:
 *   - `angles`: Кути в радіанах для рівномірного розташування сегментів.
 *   - `circumference`: Обчислена довжина периметра еліпса.
 *   - `segmentCount`: Кількість сегментів для вибраного рівня деталізації.
 */

export default function getEllipseEdgeLayout(
  radiusX: number,
  radiusY: number,
  detail: CoinDetailLevel = "detailed",
) {
  // Робимо дуже детальну сітку (2048+ точок), щоб максимально точно виміряти периметр еліпса
  const sampleCount = 2048;

  // Розмір одного мікро-кроку в радіанах
  const angleStep = (Math.PI * 2) / sampleCount;

  // Масив для збереження накопиченої довжини від початку
  const cumulativeLengths = [0];

  // Проходимо по кожній мікро-точці еліпса і рахуємо довжину дуги (метод чисельного інтегрування)
  for (let index = 0; index < sampleCount; index += 1) {
    const startAngle = index * angleStep;
    const endAngle = startAngle + angleStep;

    // Рахуємо швидкість зміни довжини (похідну) на початку та в кінці кроку за допомогою теореми Піфагора (Math.hypot)
    const startSpeed = Math.hypot(
      radiusX * Math.sin(startAngle),
      radiusY * Math.cos(startAngle),
    );
    const endSpeed = Math.hypot(
      radiusX * Math.sin(endAngle),
      radiusY * Math.cos(endAngle),
    );

    // Знаходимо довжину поточного мікро-сегмента (метод трапецій)
    const segmentLength = ((startSpeed + endSpeed) / 2) * angleStep;

    // Додаємо довжину до загальної скарбнички довжин
    cumulativeLengths.push(cumulativeLengths[index] + segmentLength);
  }

  // Загальна довжина (периметр) еліпса — це останній елемент нашого накопиченого масиву
  const circumference = cumulativeLengths[sampleCount];
  // Підбираємо кількість сегментів за довжиною периметра та обмежуємо її для продуктивності.
  const detailedSegmentCount = Math.min(
    MAX_EDGE_SEGMENT_COUNT,
    Math.max(
      MIN_EDGE_SEGMENT_COUNT,
      Math.round(circumference / EDGE_SEGMENT_SPACING),
    ),
  );
  // У спрощеному режимі зменшуємо кількість сегментів удвічі, але не нижче 12.
  const segmentCount =
    detail === "simplified"
      ? Math.max(12, Math.round(detailedSegmentCount / 2))
      : detailedSegmentCount;

  // Масив, де будуть ідеально вивірені кути для кожного сегмента
  const angles: number[] = [];
  let sampleIndex = 0;

  // Розподіляємо наші сегменти так, щоб відстань між ними по периметру була рівною
  for (let index = 0; index < segmentCount; index += 1) {
    // Цільова відстань від початку монети для поточного сегмента
    const targetLength = (index / segmentCount) * circumference;

    // Шукаємо в нашій детальній карті довжин найближчу мікро-точку, що перейшла цільову довжину
    while (
      sampleIndex < sampleCount - 1 &&
      cumulativeLengths[sampleIndex + 1] < targetLength
    ) {
      sampleIndex += 1;
    }

    // Вираховуємо точну позицію між мікро-точками (субпіксельна інтерполяція)
    const startLength = cumulativeLengths[sampleIndex];
    const endLength = cumulativeLengths[sampleIndex + 1];
    const fraction = (targetLength - startLength) / (endLength - startLength);

    // Додаємо ідеально розрахований кут для цього сегмента в масив
    angles.push((sampleIndex + fraction) * angleStep);
  }

  return { angles, circumference, segmentCount };
}
