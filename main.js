//take element of the DOM
const btnToggle = document.querySelector(".btnToggle");
const wrapper = document.querySelector(".appWrapper");
const howManyTimes = document.querySelector(".howManyTimes");
const title = document.querySelector(".title");
const btnSave = document.querySelector(".btnSave");
const btnReset = document.querySelector(".btnReset");
const checkbox = document.querySelector("input[name=checkbox]");
const btnClear = document.querySelector(".btnClear");
const lastStatus = document.querySelector(".lastStatus");
const averageValueField = document.querySelector(".averageValueField");
const statsWrapper = document.querySelector(".statsWrapper");
const showStats = document.querySelector(".showStats");

//data
let state = [
  {
    cLight: 0,
    cDark: 0,
  },
];
//variable that allow to switch between lightmode and darkmode function
let isDark = false;

// average calculation function
const average = (a, b) => (a + b) / 2;
//HOF
const averageClick = (a, b, fn) => fn(a, b);

//create and save the file from state to localstorage
function handleMounted() {
  const session = localStorage.getItem("data");
  if (!session) {
    const newSession = localStorage.setItem("data", JSON.stringify(state));
  } else {
    const newState = JSON.parse(session);
    state = newState;
  }
  howManyTimes.textContent = `You clicked ${state.length - 1} times`;
  const lastLightValue = state[state.length - 1].cLight;
  const lastDarkValue = state[state.length - 1].cDark;
  let averageValue = averageClick(lastLightValue, lastDarkValue, average);
  averageValueField.textContent = `Average Click: ${averageValue}`;
}

//UI rendering
function renderDarkModeUI() {
  title.textContent = `Dark Mode`;
  title.classList.add("addLightText");
  howManyTimes.classList.add("addLightText");
  averageValueField.classList.add("addLightText");
  wrapper.classList.add("addDark");
  btnClear.classList.add("addDarkButton");
  lastStatus.textContent = `Last status was: Light`;
  lastStatus.classList.add("addLightText");
  showStats.classList.add("addDarkButton");
}
function renderLightModeUI() {
  title.textContent = `Light Mode`;
  title.classList.remove("addLightText");
  howManyTimes.classList.remove("addLightText");
  wrapper.classList.remove("addDark");
  btnClear.classList.remove("addDarkButton");
  lastStatus.textContent = `Last status was: Dark`;
  lastStatus.classList.remove("addLightText");
  showStats.classList.remove("addDarkButton");
  averageValueField.classList.remove("addLightText");
}

//on dark mode:  add dark mode css class
//variable change her value
// push a new object in status array with the incremented cDark (counter) and cLight is the same of
// the prevous object
function darkMode() {
  renderDarkModeUI();
  isDark = true;
  let newcDark = state[state.length - 1].cDark + 1;
  state.push({
    cLight: state[state.length - 1].cLight,
    cDark: newcDark,
  });
  localStorage.setItem("data", JSON.stringify(state));
}

//on light mode: remove dark mode css class
//variable change her value
// push a new object in status array with the incremented cLight (counter) and cLDark is the same of
// the prevous object

function lightMode() {
  renderLightModeUI();
  isDark = false;
  let newLight = state[state.length - 1].cLight + 1;
  state.push({
    cLight: newLight,
    cDark: state[state.length - 1].cDark,
  });
  localStorage.setItem("data", JSON.stringify(state));
}

function handleShowStats() {
  statsWrapper.classList.add("visible");
  showStats.textContent = "Hide Stats";
}
function handleHideStats() {
  statsWrapper.classList.remove("visible");
  showStats.textContent = "Show Stats";
}

//handle stats box based on button content
function showHideStats() {
  showStats.textContent === "Show Stats"
    ? handleShowStats()
    : handleHideStats();
}

//on page loading, store state into local storage (just one time)
document.addEventListener("DOMContentLoaded", handleMounted, { once: true });

//switch between dark and light mode
checkbox.addEventListener("change", () => {
  howManyTimes.textContent = `You clicked ${state.length} times`;

  const lastLightValue = state[state.length - 1].cLight;
  const lastDarkValue = state[state.length - 1].cDark;
  let averageValue = averageClick(lastLightValue, lastDarkValue, average);
  averageValueField.textContent = `Average Click: ${averageValue}`;

  if (!this.checked && isDark === false) {
    darkMode();
  } else if (!this.checked && isDark === true) {
    lightMode();
  }
});
//clear local storage and state
btnClear.addEventListener("click", () => {
  localStorage.clear();
  state.splice(1);
  localStorage.setItem("data", JSON.stringify(state));
  howManyTimes.textContent = `You clicked ${state.length - 1} times`;
  averageValueField.textContent = `Average Click: ${0}`;
});

showStats.addEventListener("click", showHideStats);
