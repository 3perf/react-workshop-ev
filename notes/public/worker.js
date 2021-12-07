// eslint-disable-next-line no-restricted-globals

function doWork(data) {
  console.log("Hello from worker, let’s run a loop for 5 seconds!");
  console.log("Data I received:", data);
  const begin = Date.now();
  while (begin + 5000 > Date.now());
  console.log("The loop is done!");
  return 3;
}

self.addEventListener("message", (event) => {
  if (event.data.type === "doWork") {
    const result = doWork(event.data);
    self.postMessage({ type: "doWork", result });
  }

  if (event.data.type === "somethingElse") {
    // ...
  }
});

// → onmessage / addEventListener("message")
// → postMessage()
