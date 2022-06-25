// $(document).ready(function () {
//   $("#title").focus();
//   $("#text").autosize();
// });
const userQuestion = document.forms[0];
userQuestion.addEventListener("submit", async (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  console.log(formData);
  const response = await fetch("http://localhost:5004/api/phrases", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  // while (document.querySelector("#response-container").firstChild) {
  //   document
  //     .querySelector("#response-container")
  //     .removeChild(
  //       document.querySelector("#response-container").firstChild
  //     );
  // }
  const text = await response.text();
  // let messageH5 = document.createElement("h5");
  let messageText = document.createTextNode(text);
  document.querySelector("#text").appendChild(messageText);
  // messageH5.appendChild(messageText);
});
