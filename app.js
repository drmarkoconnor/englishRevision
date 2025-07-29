// v0.1 3 BUTTONS (START - SHOW ANSWER AND NEXT QUESTION)
// AND 2 TEXT PARAGRAPHS ON HTML PAGE(QUESTION AND ANSWER)

// VARIABLES

// QUESTION AND ANSWER PARAGRAPHS INSIDE CARD ELEMENTS
const infoCard = document.querySelector("#infoCard");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const rightCount = document.querySelector("#rightCount");
const wrongCount = document.querySelector("#wrongCount");
const correctList = document.querySelector("#correctList");
const incorrectList = document.querySelector("#incorrectList");

// BUTTONS
const btnShowAnswer = document.querySelector("#showA");
const btnNextQuestion = document.querySelector("#nextQ");
const btnStart = document.querySelector("#btnStart");
const btnCorrect = document.querySelector("#btnCorrect");
const btnIncorrect = document.querySelector("#btnIncorrect");

// COUNTER FOR QUESTIONS ANSWERED IS BADGE INSIDE BTNSTART
const badge = document.querySelector("#qCount");
let qAsked = 0;
let rightCounter = 0;
let wrongCounter = 0;

// AXIOS SIMPLIFIES FETCH STATEMENTS AND DATA HANDLING
// NEEDS A CDN SCRIPT LINK ON HTML PAGE
axios({
  method: "get",
  url: "flash_english.json",
}).then((res) => {
  data = Object.assign({}, res.data);
  console.log(data);
});

// EVENTLISTENERS
// Pressing 'enter' key acts like a button click
addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.key == "Enter") {
    btnStart.click();
  }
});
// z-key x-key and associated button listeners event listeener for correct counter

btnCorrect.addEventListener("click", addCorrect);
btnIncorrect.addEventListener("click", addIncorrect);

addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.key == "z") {
    addCorrect();
  }
});
addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.key == "x") {
    addIncorrect();
  }
});
// end of apostrophe listener

// Text of button changes inside btnSwitchers function and used by switch statement for flow
// which in turn changes the button text for the next iteration through
// start quiz -> show Answer -> Next Question -> Show Answer -> Next Question
//   - until reset happens after the 10th question

btnStart.addEventListener("click", () => {
  btnSwitchers();
});

// FUNCTIONS

// returns random data.front and data.back as array ie question and answer
function returnRandQ() {
  let randNum = Math.floor(Math.random() * 194);
  question.innerHTML = data[randNum].front;
  answer.innerHTML = data[randNum].back;
  answer.classList.toggle("d-none");
}
// updates the counter for questions asked
function updateBadge() {
  qAsked++;
  badge.textContent = qAsked;
}
function reset() {
  btnStart.textContent = "Start Quiz";
  qAsked = 0;
  badge.textContent = qAsked;
  answer.textContent = "Answer will appear be here";
  answer.classList.remove("d-none");
  question.textContent = "Question will appear here";
}

function btnSwitchers() {
  switch (btnStart.innerText) {
    case "Start Quiz":
      infoCard.classList.add("d-none");
      updateBadge();
      returnRandQ();
      btnStart.textContent = "Show Answer";
      break;
    case "Show Answer":
      answer.classList.toggle("d-none");
      btnStart.textContent = "Next Question";
      break;
    case "Next Question":
      if (qAsked == 10) {
        reset();
      } else {
        updateBadge();
        returnRandQ();
        btnStart.textContent = "Show Answer";
      }
      break;
    default:
      console.log(btnStart.textContent);
  }
}
function addCorrect() {
  if (btnStart.textContent == "Next Question") {
    rightCounter++;
    rightCount.textContent = rightCounter;
    addCorrectLister();
    btnStart.click();
  }
}
function addIncorrect() {
  if (btnStart.textContent == "Next Question") {
    wrongCounter++;
    wrongCount.textContent = wrongCounter;
    addIncorrectLister();
    btnStart.click();
  }
}
function addCorrectLister() {
  let newItem = document.createElement("li");
  newItem.innerHTML = question.textContent;
  correctList.appendChild(newItem);
}

function addIncorrectLister() {
  let newItem = document.createElement("li");
  newItem.innerHTML = question.textContent;
  incorrectList.appendChild(newItem);
}
