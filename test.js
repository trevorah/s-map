import sMap from "./index.js";
import { test } from "node:test";
import assert from "node:assert";
import { setTimeout } from "node:timers/promises";

test("sync map", async () => {
  const stream = ReadableStream.from([1, 2, 3]);
  const map = sMap((chunk) => chunk * 2);
  const result = await Array.fromAsync(stream.pipeThrough(map));
  assert.deepEqual(result, [2, 4, 6]);
});

test("async map", async () => {
  const stream = ReadableStream.from([1, 2, 3]);
  const map = sMap(async (chunk) => chunk * 2);
  const result = await Array.fromAsync(stream.pipeThrough(map));
  assert.deepEqual(result, [2, 4, 6]);
});

test("concurrency", async () => {
  const stream = ReadableStream.from([1, 2]);
  const map = sMap(
    async (chunk) => {
      await setTimeout(100);
      return chunk * 2;
    },
    { concurrency: 2 }
  );
  const timer = performance.now();
  const result = await Array.fromAsync(stream.pipeThrough(map));
  assert.deepEqual(result, [2, 4]);
  assert.ok(performance.now() - timer < 200);
});

test.todo("concurrency limit");
