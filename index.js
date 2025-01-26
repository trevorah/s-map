export default function sMap(fn) {

  // const xyz= Promise.

  const write = new WritableStream({
    async write(chunk, controller) {

 
    },
  });

  // const reader = new ReadableStream({

  let pro




  return new TransformStream({
    async transform(chunk, controller) {

      while (true) {
        const ready = await queueReady();


      }

      // outside of the parent promise
      fn(chunk).then((result) => {

        controller.enqueue(result);
      }).catch((error) => {
        controller.error(error);
      });

      


    },
  });
}
