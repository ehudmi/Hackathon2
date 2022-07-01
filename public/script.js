const userQuestion = document.forms[0];
let found = false;

const deleteInfo = (elem) => {
  while (document.querySelector(elem).firstChild) {
    document
      .querySelector(elem)
      .removeChild(document.querySelector(elem).firstChild);
  }
};

const appendInfo = (loc, elem) => {
  document.querySelector(loc).appendChild(document.createTextNode(elem));
};

// Submit question
userQuestion.addEventListener("submit", async (e) => {
  e.preventDefault();
  let questionData = document.querySelector("#questionText").value;
  if (questionData.search("wh") !== 0 && questionData.search("how") !== 0) {
    alert(
      "please submit a WH question (who, why, what, where, when or how)..."
    );
  } else {
    if (questionData.endsWith("?")) {
      console.log("it is ok");
    } else {
      questionData = questionData.concat("", "?");
    }
    const response = await fetch("/api/phrases", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: `{ "question": "${questionData}" }`,
    });
    deleteInfo("#answerText");
    let text = await response.text();
    if (text.charAt(text.length - 1) == "9") {
      found = true;
      text = text.slice(0, text.length - 1);
    } else {
      found = false;
    }
    appendInfo("#answerText", text);

    document.querySelector(".rate").style.visibility = "visible";
    document.querySelector("#star-5").addEventListener("click", rating);
  }
});

// Submit rating
const rating = async () => {
  if (found == false) {
    let questionData = document.querySelector("#questionText").value;
    let answerData = document.querySelector("#answerText").value;
    let starRating = 85;
    const response = await fetch("/api/phrases", {
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
    appendInfo(".feedbackText", feedback);
  } else {
    appendInfo(".feedbackText", "Thank you, we have it already");
  }
  const feedbackTime = () => {
    setTimeout(() => {
      document.querySelector(".rate").style.visibility = "hidden";
      document.querySelector("input.star-5").checked = false;
      deleteInfo(".feedbackText");
    }, 2500);
  };
  feedbackTime();
};

// resetting the stars
const starArray = [
  "input.star-1",
  "input.star-2",
  "input.star-3",
  "input.star-4",
];

starArray.forEach((elem) => {
  document.querySelector(elem).addEventListener("click", () => {
    appendInfo(
      ".feedbackText",
      "I see my answer is not to your liking - would you like a cup of tea?"
    );
    setTimeout(() => {
      if (document.querySelector(elem).checked) {
        document.querySelector(elem).checked = false;
        deleteInfo(".feedbackText");
        document.querySelector(".rate").style.visibility = "hidden";
      }
    }, 2500);
  });
});
