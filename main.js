//take element of the DOM
const btn = document.querySelector(".btnToggle");
const wrapper = document.querySelector(".appWrapper");

//variable that allow to switch between lightmode and darkmode function
let isDark = false;

//status of app (improvement: json)
let status = [
  {
    cLight: 0,
    cDark: 0,
  },
];

//on dark mode:  add dark mode css class
//variable change her value
// push a new object in status array with the incremented cDark (counter) and cLight is the same of
// the prevous object
function darkMode() {
  wrapper.classList.add("addDark");
  isDark = true;
  btn.textContent = "Light Mode";
  let newcDark = status[status.length - 1].cDark + 1;
  status.push({
    cLight: status[status.length - 1].cLight,
    cDark: newcDark,
  });
  console.log(status);
}

//on light mode: remove dark mode css class
//variable change her value
// push a new object in status array with the incremented cLight (counter) and cLDark is the same of
// the prevous object

function lightMode() {
  wrapper.classList.remove("addDark");
  isDark = false;
  btn.textContent = "Dark Mode";
  let newLight = status[status.length - 1].cLight + 1;
  status.push({
    cLight: newLight,
    cDark: status[status.length - 1].cDark,
  });
  console.log(status);
}

//function that uses isDark variable to switch between lightmode and darkmode
function handleToggle() {
  if (isDark === false) {
    darkMode();
  } else if (isDark === true) {
    lightMode();
  }
}

btn.addEventListener("click", handleToggle);
