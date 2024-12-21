// Lookup table for hex digits
const hexDigits = "0123456789abcdef";

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export default class FastColorGenerator {
  private state: number;

  /**
   * Creates an instance of FastColorGenerator.
   * @param seed - The seed value for the generator. Defaults to the current timestamp.
   */
  constructor(seed: number = Date.now()) {
    this.state = seed >>> 0; // Ensure the seed is a 32-bit unsigned integer
  }

  /**
   * Generates the next pseudo-random color state.
   */
  next(): void {
    const multiplier = 1664525;
    const increment = 1013904223;

    // Linear Congruential Generator (LCG) for pseudo-random numbers
    this.state = (this.state * multiplier + increment) >>> 0;
  }

  /**
   * Gets the current color as a hex string (e.g., #rrggbb).
   */
  get hex(): string {
    const { r, g, b } = this.rgb;
    return `#${hexDigits[r >> 4]}${hexDigits[r & 0xf]}${hexDigits[g >> 4]}${
      hexDigits[g & 0xf]
    }${hexDigits[b >> 4]}${hexDigits[b & 0xf]}`;
  }

  /**
   * Sets the color using a hex string (e.g., #rrggbb).
   * @param value - The hex color string to set.
   * @throws {Error} - If invalid hex color format was passed.
   */
  set hex(value: string) {
    if (!/^#[0-9a-fA-F]{6}$/.test(value)) {
      throw new Error("Invalid hex color format. Expected format: #rrggbb.");
    }

    const r = parseInt(value.slice(1, 3), 16);
    const g = parseInt(value.slice(3, 5), 16);
    const b = parseInt(value.slice(5, 7), 16);

    this.rgb = { r, g, b };
  }

  /**
   * Gets the current color as an RGB object.
   */
  get rgb(): RGB {
    return {
      r: (this.state >> 16) & 0xff,
      g: (this.state >> 8) & 0xff,
      b: this.state & 0xff,
    };
  }

  /**
   * Sets the color using an RGB object.
   * @param value - The RGB object to set.
   */
  set rgb(value: RGB) {
    const { r, g, b } = value;
    if (
      !this.isValidChannel(r) ||
      !this.isValidChannel(g) ||
      !this.isValidChannel(b)
    ) {
      throw new Error("RGB values must be integers between 0 and 255.");
    }

    this.state = ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
  }

  /**
   * Validates if a color channel value is between 0 and 255.
   * @param value - The channel value to validate.
   * @returns True if the value is valid, false otherwise.
   */
  private isValidChannel(value: number): boolean {
    return Number.isInteger(value) && value >= 0 && value <= 255;
  }
}
