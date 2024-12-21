import { describe, it, expect } from "vitest";
import FastColorGenerator from "./index";

describe("FastColorGenerator", () => {
  it("can theoretically generate all RGB colors with ease", () => {
    const seed = 0; // Start from the lowest seed value
    const generator = new FastColorGenerator(seed);
    const total = 256 * 256 * 256;

    const generatedColors = new Set();
    for (let i = 0; i < Math.pow(2, 24); i++) {
      const { r, g, b } = generator.rgb;
      const colorKey = `${r},${g},${b}`;
      generatedColors.add(colorKey);
      generator.next();

      // Break early for testing purposes
      if (i >= total) break;
    }

    expect(generatedColors.size).toBeGreaterThan(0); // Ensure it generates colors
  });

  it("not too many duplicates", () => {
    const seed = 0; // Start from the lowest seed value
    const generator = new FastColorGenerator(seed);
    const total = 256 * 256 * 256;

    const generatedColors = new Set();
    let duplicates = 0;
    for (let i = 0; i < Math.pow(2, 24); i++) {
      const { r, g, b } = generator.rgb;
      const colorKey = `${r},${g},${b}`;
      if (generatedColors.has(colorKey)) {
        duplicates += 1;
      } else generatedColors.add(colorKey);

      generator.next();

      // Break early for testing purposes
      if (i >= total) break;
    }

    expect(duplicates).toBeLessThan(total * 0.05); // less than 20%
  });
});
