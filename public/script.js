// $(document).ready(function () {
//   $("#title").focus();
//   $("#text").autosize();
// });
const userQuestion = document.forms[0];
let found = false;
userQuestion.addEventListener("submit", async (e) => {
  e.preventDefault();
  let questionData = document.querySelector("#questionText").value;
  console.log(questionData);
  const response = await fetch("http://localhost:5004/api/phrases", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: `{ "question": "${questionData}" }`,
  });
  while (document.querySelector("#answerText").firstChild) {
    document
      .querySelector("#answerText")
      .removeChild(document.querySelector("#answerText").firstChild);
  }
  let text = await response.text();
  if (text.charAt(text.length - 1) == "9") {
    found = true;
    text = text.slice(0, text.length - 1);
  }
  console.log(text);
  let answer = document.createTextNode(text);
  document.querySelector("#answerText").appendChild(answer);
  // let userQuestion = document.querySelector("#questionText").value;
  // console.log(userQuestion);
  // document.querySelector("#questionText").value = userQuestion.concat(
  //   " ",
  //   `\n\n${text}`
  // );

  document.querySelector(".rate").style.visibility = "visible";
});

const rating = async () => {
  if (found == false) {
    let questionData = document.querySelector("#questionText").value;
    let answerData = document.querySelector("#answerText").value;
    let starRating = 85;
    const response = await fetch("http://localhost:5004/api/rating", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: `{ "question": "${questionData}",
    "answer": "${answerData}" 
    "fit": "${starRating}" }`,
    });
  }
};
// document.querySelector("#star-5").addEventListener("click", rating);
