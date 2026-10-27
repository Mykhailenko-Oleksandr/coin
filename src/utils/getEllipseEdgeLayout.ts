import { EDGE_SEGMENT_COUNT } from "../components/Coin/Coin";

/**
 * Обчислює ідеально рівномірний розподіл кутів для сегментів еліптичного ребра
 * та загальну довжину (периметр) еліпса методом чисельного інтегрування.
 *
 * @param {number} radiusX - Горизонтальний радіус (півось `X`) еліпса монети.
 * @param {number} radiusY - Вертикальний радіус (півось `Y`) еліпса монети.
 * @returns {{ angles: number[]; circumference: number }} Об'єкт, що містить:
 *   - `angles`: Масив точних кутів у радіанах для кожного сегмента ребра.
 *   - `circumference`: Загальна довжина (периметр) еліпса.
 */

export default function getEllipseEdgeLayout(radiusX: number, radiusY: number) {
  // Робимо дуже детальну сітку (2048+ точок), щоб максимально точно виміряти периметр еліпса
  const sampleCount = Math.max(2048, EDGE_SEGMENT_COUNT * 32);

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

  // Масив, де будуть ідеально вивірені кути для кожного сегмента
  const angles: number[] = [];
  let sampleIndex = 0;

  // Розподіляємо наші сегменти так, щоб відстань між ними по периметру була рівною
  for (let index = 0; index < EDGE_SEGMENT_COUNT; index += 1) {
    // Цільова відстань від початку монети для поточного сегмента
    const targetLength = (index / EDGE_SEGMENT_COUNT) * circumference;

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

  return { angles, circumference };
}
