// $(document).ready(function () {
//   $("#title").focus();
//   $("#text").autosize();
// });
const userQuestion = document.forms[0];
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
  const text = await response.text();
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
  let formData = new FormData(userQuestion);
  console.log(formData);
  const response = await fetch("http://localhost:5004/api/rating", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
};
document.querySelector("#star-5").addEventListener("click", rating);
