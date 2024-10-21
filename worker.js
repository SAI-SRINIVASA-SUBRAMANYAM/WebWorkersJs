function heavyComputedTask() {
  let i = 0;
  while (i < 10_00_00_00_000) i++;

  const formattedNumber = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(i);
  self.postMessage({
    status: "done_data_processing",
    message: `Woohhh 'i' is at: , ${formattedNumber}`,
  });
}

self.addEventListener("message", function (e) {
  if (e.data === "start_data_processing") {
    heavyComputedTask();
  }
});
