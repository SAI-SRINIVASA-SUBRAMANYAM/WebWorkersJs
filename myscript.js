const worker = new Worker("./worker.js");
const heavyTask = document.querySelector(".heavy");
const discreetTask = document.querySelector(".discreet");

function heavyComputedTask() {
  let i = 0;
  while (i < 10_00_00_00_000) i++;

  const formattedNumber = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(i);
  alert(`Woohhh 'i' is at: , ${formattedNumber}`);
}

heavyTask.addEventListener("click", () => {
  const checkBox = document.querySelector("#enableWorker");
  console.log(checkBox.checked);
  if (checkBox.checked === true) {
    worker.postMessage("start_data_processing");
  } else {
    heavyComputedTask();
  }
});

worker.addEventListener("message", (e) => {
  if (e.data && e.data.status === "done_data_processing") {
    alert(e.data.message);
  }
});

discreetTask.addEventListener("click", () => {
  console.log("Change of view");
  if (document.body.style.background === "") {
    document.body.style.background = "yellow";
    document.body.style.color = "blue";
    heavyTask.style.background = "yellow";
    discreetTask.style.background = "yellow";
  } else {
    document.body.style.background = "";
    document.body.style.color = "";
    discreetTask.style.background = "white";
    heavyTask.style.background = "white";
  }
});
