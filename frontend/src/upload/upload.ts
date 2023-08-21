import { backendURL } from "../config";

const form = document.querySelector("form")!;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const requestBody = new FormData(form);
  console.log(requestBody);
  const response = await fetch(`${backendURL}/api/upload`, {
    method: "post",
    body: requestBody,
  });
  if (response.ok) {
    alert("uploaded");
  } else {
    alert("error with file upload");
  }
});
