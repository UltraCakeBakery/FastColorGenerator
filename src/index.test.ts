import { describe, it, expect } from "vitest";
import FastColorGenerator from "./index";

describe("FastColorGenerator", () => {
  it("initializes with a valid default seed", () => {
    const generator = new FastColorGenerator();
    expect(generator.rgb).toHaveProperty("r");
    expect(generator.rgb).toHaveProperty("g");
    expect(generator.rgb).toHaveProperty("b");
  });

  it("generates valid hex colors", () => {
    const generator = new FastColorGenerator(12345);
    const hexColor = generator.hex;
    expect(hexColor).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("throws an error for invalid hex color input", () => {
    const generator = new FastColorGenerator();
    expect(() => {
      generator.hex = "invalid";
    }).toThrowError("Invalid hex color format. Expected format: #rrggbb.");
  });

  it("allows setting and getting RGB values", () => {
    const generator = new FastColorGenerator();
    const rgb = { r: 255, g: 128, b: 64 };
    generator.rgb = rgb;
    expect(generator.rgb).toEqual(rgb);
  });

  it("throws an error for invalid RGB values", () => {
    const generator = new FastColorGenerator();
    expect(() => {
      generator.rgb = { r: -1, g: 256, b: 300 };
    }).toThrowError("RGB values must be integers between 0 and 255.");
  });

  it("allows setting hex and reflects in RGB", () => {
    const generator = new FastColorGenerator();
    generator.hex = "#ff8040";
    expect(generator.rgb).toEqual({ r: 255, g: 128, b: 64 });
  });

  it("uses the linear congruential generator to produce new states", () => {
    const seed = 12345;
    const generator = new FastColorGenerator(seed);
    const initialColor = generator.rgb;
    generator.next();
    const nextColor = generator.rgb;
    expect(nextColor).not.toEqual(initialColor);
  });

  it("ensures reproducibility with the same seed", () => {
    const seed = 54321;
    const generator1 = new FastColorGenerator(seed);
    const generator2 = new FastColorGenerator(seed);

    for (let i = 0; i < 100; i++) {
      expect(generator1.rgb).toEqual(generator2.rgb);
      generator1.next();
      generator2.next();
    }
  });
});
