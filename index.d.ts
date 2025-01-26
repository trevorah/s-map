export default function sMap<T, U>(
  fn: (chunk: T) => Promise<U> | U,
  options?: { concurrency?: number }
): TransformStream<T, U>;
