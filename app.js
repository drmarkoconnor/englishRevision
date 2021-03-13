// v0.1 3 BUTTONS (START - SHOW ANSWER AND NEXT QUESTION)
// AND 2 TEXT PARAGRAPHS ON HTML PAGE(QUESTION AND ANSWER)

// VARIABLES

// QUESTION AND ANSWER PARAGRAPHS INSIDE CARD ELEMENTS
const infoCard = document.querySelector("#infoCard");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");

// BUTTONS
const btnShowAnswer = document.querySelector("#showA");
const btnNextQuestion = document.querySelector("#nextQ");
const btnStart = document.querySelector("#btnStart");

// Jokey inspiring banner
const banner = document.querySelector("#banner");

// COUNTER FOR QUESTIONS ANSWERED IS BADGE INSIDE BTNSTART
const badge = document.querySelector("#qCount");
let qAsked = 0;

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
function bannerQuotes() {
  let randQuoteNum = Math.floor(Math.random() * 10) + 1;
  switch (randQuoteNum) {
    case 1:
      banner.textContent =
        "Great Job, Charlotte! Remember  --> You can do it! Keep concentrating - Come on let's do it again!!!";
      break;
    case 2:
      banner.textContent =
        "Great Job, Charlotte! Remember  --> Be the be you want to be - Come on let's do it again!!!";
      break;
    case 3:
      banner.textContent =
        "Great Job, Charlotte! Remember  --> Don't hide the inside - let it out girl! - Come on let's do it again!!!";
      break;
    case 4:
      banner.textContent =
        "Great Job, Charlotte! Remember  --> Yous ownin' these questions - wow! - Come on let's do it again!!!";
      break;
    case 5:
      banner.textContent =
        "Great Job, Charlotte! Remember  --> Go girl - be the best - Come on let's do it again!!!";
      break;
    case 6:
      banner.textContent =
        "Great Job, Charlotte! Remember  --> You are You: Take it, Make it, no need to Fake it - Come on let's do it again!!!";
      break;
    case 7:
      banner.textContent =
        "Great Job, Charlotte! Remember  --> Smashin' it, girlfriend! - Come on let's do it again!!!";
      break;
    case 8:
      banner.textContent =
        "Great Job, Charlotte! Remember  --> You're the one - number one - Come on let's do it again!!!";
      break;
    case 9:
      banner.textContent =
        "Great Job, Charlotte! Remember  --> Let tomorrow be the yesterday you wanted today - Come on let's do it again!!!";
      break;
    case 10:
      banner.textContent =
        "Great Job, Charlotte! Remember  --> You did it! Now do it again!! - Come on let's do it again!!!";

      break;
    default:
  }
}
function reset() {
  bannerQuotes();
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
      banner.textContent = "";
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
