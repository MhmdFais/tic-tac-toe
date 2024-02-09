//Game baord appear

let startBtn = document.querySelector(".start-button");
startBtn.addEventListener("click", () => {
    document.querySelector(".outer-frame").style.display = "none";
    document.querySelector(".board-frame").style.display = "grid";
});