# Fast Color Generator

![Build](https://github.com/UltraCakeBakery/FastBooleanArray/actions/workflows/ci.yml/badge.svg?event=build)

Fast Color Generator is a high-performance JavaScript library for generating pseudo-random colors efficiently. This utility uses a Linear Congruential Generator (LCG) for deterministic color generation, making it ideal for applications requiring random or seeded colors, such as data visualization, gaming, and procedural art.

## Features

- **High-Performance**: Efficient color generation with a minimal memory footprint (Up to 2x faster!)
- **Predictability and Seedable**: Deterministic color generation based on a seed valu, allowing you to generates the same sequence of colors consistently.
- **Versatile API**: Easy-to-use getter and setter methods for hex and RGB values.
- **Lightweight**: No external dependencies, perfect for high-performance use cases.
- **Type-safe and tested**: Written in typescript with zero errors, 100% test coverage through vitest unit testing..

---

## Why Use Fast Color Generator?

---

## Installation

Install the package via npm:

```bash
npm install fast-color-generator --save
pnpm install fast-color-generator --save
```

---

## Usage

Here’s how to use the Fast Color Generator:

```javascript
import FastColorGenerator from "fast-color-generator";

// Create a new generator instance with an optional seed
const generator = new FastColorGenerator(12345);

// Generate the next color
generator.next();

// Get the current color in hex format
console.log(generator.hex); // Output: #3a2f1c (example)

// Get the current color as an RGB object
console.log(generator.rgb); // Output: { r: 58, g: 47, b: 28 }

// Set a specific color using a hex string
generator.hex = "#ff8800";

// Set a specific color using an RGB object
generator.rgb = { r: 255, g: 136, b: 0 };
```

---

## API

### `new FastColorGenerator(seed?: number)`

Creates a new Fast Color Generator instance. If no seed is provided, the current timestamp is used.

- **Parameters**:
  - `seed` (number): A 32-bit integer used as the starting state.

---

### `next()`

Advances the internal state to generate the next color.

---

### `hex: string`

Gets or sets the current color as a hexadecimal string in the format `#rrggbb`.

- **Getter Example**:

  ```javascript
  console.log(generator.hex); // "#3a2f1c"
  ```

- **Setter Example**:
  ```javascript
  generator.hex = "#00ff00";
  ```

---

### `rgb: { r: number; g: number; b: number }`

Gets or sets the current color as an RGB object.

- **Getter Example**:

  ```javascript
  console.log(generator.rgb); // { r: 58, g: 47, b: 28 }
  ```

- **Setter Example**:
  ```javascript
  generator.rgb = { r: 200, g: 150, b: 100 };
  ```

---

## Benchmark Results

### Performance Comparison

| Colors Generated | Simple Function (ms) | Fast Color Generator (ms) |
| ---------------- | -------------------- | ------------------------- |
| 1                | 0.0033               | 0.01085                   |
| 100              | 0.02345              | 0.09258                   |
| 1,000            | 0.26076              | 0.33389                   |
| 10,000           | 1.43601              | 0.82281                   |
| 100,000          | 12.48264             | 6.02200                   |
| 1,000,000        | 123.56793            | 58.55502                  |
| 16,777,216       | 2053.39782           | 946.79718                 |

The Fast Color Generator is more efficient for large-scale color generation, outperforming simple implementations significantly as the dataset grows. However, due to the initialization cost of its constructor, it should be used with caution for small-scale operations.

While we couldn't benchmark it directly, we observed that the garbage collector tends to manage the Fast Color Generator more efficiently, likely because it involves less overhead:

The Math.random() and string operations (such as toString and padStart) in the simple function create intermediate objects and strings, which the garbage collector must handle.
The Fast Color Generator relies on more direct computations (bitwise operations) with fewer intermediate objects, reducing the load on the garbage collector.
Therefore, we assume that using this library helps improve the performance of the rest of your code, as it minimizes the compute power needed for memory allocation compared to more common, leaving more breathing room.

---

## Acknowledgements

The [Linear Congruential Generator (LCG)](https://en.wikipedia.org/wiki/Linear_congruential_generator) algorithm used in this library was originally published in 1958 by W. E. Thomson and A. Rotenberg. Its simplicity and speed make it a popular choice for pseudo-random number generation.

---

## Contributing

Contributions are welcome! Feel free to report issues, suggest features, or submit pull requests on the [GitHub repository](https://github.com/YourUsername/FastColorGenerator).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
