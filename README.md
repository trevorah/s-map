# web-stream-map

A map function for Web Streams with concurrency support. Like node's ReadableStream.map(), but for Web Streams. Works in browsers and Node.js.

## Installation

```bash
npm install web-stream-map
```

## Usage

sMap creates a `TransformStream` that can be pipeThrough()'d into a stream.

### Basic

```js
import sMap from "web-stream-map";

const stream = ReadableStream.from([1, 2, 3]);
const result = await Array.fromAsync(
  stream.pipeThrough(sMap((chunk) => chunk * 2))
);
console.log(result); // [2, 4, 6]
```

### Concurrency

```js
import sMap from "web-stream-map";
import { setTimeout } from "node:timers/promises";

const stream = ReadableStream.from([1, 2, 3]);
const result = await Array.fromAsync(
  stream.pipeThrough(
    sMap(
      async (chunk) => {
        await setTimeout(100);
        return chunk * 2;
      },
      { concurrency: 5 }
    )
  )
);

console.log(result); // [2, 4, 6], but in 100ms
```

## API

### sMap(fn, options)

- `fn` - A function that takes a chunk and returns a promise or value.
- `options` - An optional object with a `concurrency` property. Defaults to 1.

Returns a `TransformStream` that maps over the input stream and applies the function to each chunk.
