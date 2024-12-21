import FastColorGenerator from "./dist/index.js";
import { performance } from "node:perf_hooks";
import { serialize } from "v8";

function getMemoryUsageOfReference(ref) {
  const serialized = serialize(ref); // Convert the reference to a Buffer
  return serialized.length; // The size of the serialized Buffer in bytes
}

function generateSeededColor(seed = 1_000_000) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  hash = (hash * 16807) % 2147483647; // A common multiplier for randomness
  const random = (hash & 0xffffff) / 0xffffff; // Return a normalized value [0, 1]
  const color = `#${Math.floor(random * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
  return color;
}

function testSimpleFunction(amount, analyzeMemory = true) {
  const startTime = performance.now();

  let color = "";
  for (let i = 0; i < amount; i++) {
    color = generateSeededColor();
  }
  const endTime = performance.now();
  const usedMemory = analyzeMemory ? getMemoryUsageOfReference(color) : 0;
  return { usedMemory, startTime, endTime };
}
testSimpleFunction._name = "Simple function     ";

function testFastColorGenerator(amount, analyzeMemory = true) {
  const fastColorGenerator = new FastColorGenerator();
  const startTime = performance.now();
  let color = "";
  for (let i = 0; i < amount; i++) {
    fastColorGenerator.next();
    color = fastColorGenerator.hex;
  }

  const endTime = performance.now();
  const usedMemory = analyzeMemory ? getMemoryUsageOfReference(color) : 0;
  return { usedMemory, startTime, endTime };
}
testFastColorGenerator._name = "Fast Color Generator";

function performanceTest(test, amount) {
  const runs = 10; // Number of times to run the test
  let totalTime = 0;
  let totalMemory = 0;

  for (let i = 0; i < runs; i++) {
    const { startTime, endTime, usedMemory } = test(amount);

    totalTime += endTime - startTime;
    totalMemory += usedMemory;
  }

  const averageTime = (totalTime / runs).toFixed(8);
  const averageMemory = totalMemory / runs;

  console.log(
    `${test._name}: ${averageTime} ms | ${
      test.name.includes("Set") ? averageMemory + " Bytes" : "N/A"
    } | ${amount} colors`
  );
}

// Run tests
console.clear();
[1, 100, 1_000, 10_000, 100_000, 1_000_000, 256 * 256 * 256].forEach(
  async (amount) => {
    console.log("");
    [testSimpleFunction, testFastColorGenerator].forEach((test) => {
      performanceTest(test, amount);
    });
    await new Promise((resolve) => {
      setTimeout(resolve, 5_000); // Let garbadge collection do its thing for more accurate memory logging
    });
  }
);
