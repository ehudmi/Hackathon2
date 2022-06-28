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
    console.log(text);
    found = true;
    text = text.slice(0, text.length - 1);
  } else {
    found = false;
  }
  console.log(text);
  let answer = document.createTextNode(text);
  document.querySelector("#answerText").appendChild(answer);

  document.querySelector(".rate").style.visibility = "visible";
  document.querySelector("#star-5").addEventListener("click", rating);
});

// to fix //
const rating = async () => {
  while (document.querySelector("#paragraphFeedback").firstChild) {
    document
      .querySelector("#paragraphFeedback")
      .removeChild(document.querySelector("#paragraphFeedback").firstChild);
  }
  if (found == false) {
    let questionData = document.querySelector("#questionText").value;
    let answerData = document.querySelector("#answerText").value;
    let starRating = 85;
    const response = await fetch("http://localhost:5004/api/phrases", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: `{ "question": "${questionData}",
      "answer": "${answerData}" ,
      "fit": "${starRating}" }`,
    });
    let feedback = await response.text();
    let paragraph = document.createElement("p");
    paragraph.setAttribute("id", "paragraphFeedback");
    let feedbackText = document.createTextNode(feedback);
    document.querySelector(".stars").appendChild(paragraph);
    paragraph.appendChild(feedbackText);
  } else {
    let paragraph = document.createElement("p");
    paragraph.setAttribute("id", "paragraphFeedback");
    let feedbackText = document.createTextNode("Thank you, we have it already");
    document.querySelector(".stars").appendChild(paragraph);
    paragraph.appendChild(feedbackText);
  }
};
