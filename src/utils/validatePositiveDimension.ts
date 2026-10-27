export default function validatePositiveDimension(name: string, value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(
      `${name} must be a finite number greater than 0. Received: ${value}`,
    );
  }
}
