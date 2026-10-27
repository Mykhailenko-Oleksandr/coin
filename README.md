# Coin

A React and TypeScript project featuring a customizable 3D spinning coin. The coin supports separate front and back images, a beveled edge made of evenly spaced segments, optional shine and shadow effects, and reduced-motion preferences.

**Author:** Oleksandr Mykhailenko  
**License:** [MIT](./LICENSE)

## Contents

- [English](#english)
- [Українська](#українська)

## English

### Requirements

- Node.js and npm

### Run the project

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally after running `npm run build`. |
| `npm run lint` | Run ESLint. |

### Use the Coin component

The component is located at `src/components/Coin/Coin.tsx`.

```tsx
import Coin from "./components/Coin/Coin";

export default function App() {
  return (
    <Coin
      frontImgUrl="/coin-front.png"
      backImgUrl="/coin-back.png"
      width={300}
      height={300}
      thickness={24}
      color="#b8860b"
      animationSpeed="5s"
      detail="detailed"
      shine
      shadow
    />
  );
}
```

Pass any image URL that the browser can access, such as an imported asset URL, a site-relative URL, or a remote URL. `frontImgUrl` is required. If `backImgUrl` is omitted, the front image is also used on the back.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `frontImgUrl` | `string` | Required | URL of the front image. |
| `backImgUrl` | `string` | `frontImgUrl` | URL of the back image. Falls back to `frontImgUrl`. |
| `containerClassName` | `string` | `undefined` | Additional CSS class applied to the outer container. The component's base class is preserved. |
| `coinClassName` | `string` | `undefined` | Additional CSS class applied to the rotating coin element. |
| `width` | `number` | `200` | Coin width in pixels. |
| `height` | `number` | `width` | Coin height in pixels. Defaults to a round coin. |
| `thickness` | `number` | `40` | Coin thickness in pixels. |
| `color` | `string` | `"rgb(46, 46, 46)"` | Base CSS color used for the coin and its edge. |
| `animationSpeed` | `string` | `"5s"` | CSS duration for the rotation and shine animation, such as `"3s"` or `"750ms"`. |
| `detail` | `"detailed" \| "simplified"` | `"detailed"` | Edge detail level. `simplified` renders approximately half as many edge segments. |
| `shine` | `boolean` | `false` | Enable the animated shine over the coin images. |
| `shadow` | `boolean` | `false` | Show the shadow beneath the coin. |
| `shadowClassName` | `string` | `undefined` | Additional CSS class applied to the shadow. |
| `shadowDistance` | `number` | `50` | Shadow offset in pixels. Used when `shadow` is enabled. |

The detailed edge uses 24–160 segments depending on the coin perimeter. The simplified edge uses approximately half as many, with a minimum of 12.

### Container sizing and positioning

By default, the outer container has the same width and height as the coin. Use `containerClassName` to size or position it with your own CSS. For example, to center the coin in the viewport:

```tsx
<Coin
  frontImgUrl="/coin.png"
  containerClassName="coinViewport"
/>
```

```css
.coinViewport {
  width: 100%;
  min-height: 100svh;
  display: grid;
  place-items: center;
}
```

To fill a parent container, set `width: 100%` and `height: 100%` on the class and make sure the parent has a defined size.

### Motion accessibility

The coin rotates continuously by default. When the user's system or browser requests reduced motion (`prefers-reduced-motion: reduce`), rotation is stopped and the animated shine is hidden.

## Українська

### Вимоги

- Node.js та npm

### Запуск проєкту

```bash
npm install
npm run dev
```

Відкрийте локальну адресу, яку Vite покаже в терміналі.

### Доступні команди

| Команда | Опис |
| --- | --- |
| `npm run dev` | Запустити сервер розробки Vite. |
| `npm run build` | Перевірити типи TypeScript і створити production-збірку в `dist/`. |
| `npm run preview` | Локально переглянути production-збірку після `npm run build`. |
| `npm run lint` | Запустити ESLint. |

### Використання компонента Coin

Компонент розташований у `src/components/Coin/Coin.tsx`.

```tsx
import Coin from "./components/Coin/Coin";

export default function App() {
  return (
    <Coin
      frontImgUrl="/coin-front.png"
      backImgUrl="/coin-back.png"
      width={300}
      height={300}
      thickness={24}
      color="#b8860b"
      animationSpeed="5s"
      detail="detailed"
      shine
      shadow
    />
  );
}
```

Передавайте будь-який URL зображення, доступний браузеру: імпортований URL ресурсу, шлях відносно сайту або URL зовнішнього ресурсу. `frontImgUrl` — обов’язковий проп. Якщо `backImgUrl` не вказано, на зворотному боці використовується переднє зображення.

### Пропси

| Проп | Тип | Значення за замовчуванням | Опис |
| --- | --- | --- | --- |
| `frontImgUrl` | `string` | Обов’язковий | URL переднього зображення. |
| `backImgUrl` | `string` | `frontImgUrl` | URL зображення зворотного боку. Якщо не вказано, використовується `frontImgUrl`. |
| `containerClassName` | `string` | `undefined` | Додатковий CSS-клас зовнішнього контейнера. Базовий клас компонента зберігається. |
| `coinClassName` | `string` | `undefined` | Додатковий CSS-клас елемента монети, що обертається. |
| `width` | `number` | `200` | Ширина монети в пікселях. |
| `height` | `number` | Значення `width` | Висота монети в пікселях. За замовчуванням монета кругла. |
| `thickness` | `number` | `40` | Товщина монети в пікселях. |
| `color` | `string` | `"rgb(46, 46, 46)"` | Базовий CSS-колір монети та її ребра. |
| `animationSpeed` | `string` | `"5s"` | Тривалість циклу обертання та відблиску у форматі CSS, наприклад `"3s"` або `"750ms"`. |
| `detail` | `"detailed" \| "simplified"` | `"detailed"` | Деталізація ребра. `simplified` створює приблизно вдвічі менше сегментів. |
| `shine` | `boolean` | `false` | Увімкнути анімований відблиск на зображеннях монети. |
| `shadow` | `boolean` | `false` | Показати тінь під монетою. |
| `shadowClassName` | `string` | `undefined` | Додатковий CSS-клас для тіні. |
| `shadowDistance` | `number` | `50` | Відстань тіні в пікселях. Використовується, якщо `shadow` увімкнено. |

Деталізоване ребро використовує від 24 до 160 сегментів залежно від периметра монети. Спрощене — приблизно вдвічі менше, але не менше 12.

### Розмір і розташування контейнера

За замовчуванням зовнішній контейнер має таку саму ширину й висоту, як монета. Щоб змінити розмір або розташування, передайте клас через `containerClassName` і опишіть його у CSS. Наприклад, щоб розмістити монету по центру viewport:

```tsx
<Coin
  frontImgUrl="/coin.png"
  containerClassName="coinViewport"
/>
```

```css
.coinViewport {
  width: 100%;
  min-height: 100svh;
  display: grid;
  place-items: center;
}
```

Щоб заповнити батьківський контейнер, задайте класу `width: 100%` і `height: 100%`, а батьківському елементу — визначені розміри.

### Доступність руху

За замовчуванням монета безперервно обертається. Якщо в налаштуваннях системи або браузера ввімкнено зменшення руху (`prefers-reduced-motion: reduce`), обертання зупиняється, а анімований відблиск приховується.

## License / Ліцензія

This project is licensed under the [MIT License](./LICENSE).  
Проєкт розповсюджується за ліцензією [MIT](./LICENSE).
