import { backendURL } from "../config";

async function fetchURLs() {
  // fetch URLs for the resources to be downloaded from the api
  try {
    const resonse = await fetch(`${backendURL}/api/geturls`);
    if (resonse.ok) {
      const data: Array<string> = await resonse.json();
      console.log("data is", data);
      return data;
    } else {
      throw new Error();
    }
  } catch (error) {
    return "error";
  }
}

function populateLinksList(
  linksListElement: HTMLElement,
  URLArray: Array<string>,
) {
  // create <div> element for every <a> and append it to the html element
  console.log("urls is", URLArray);
  URLArray.forEach((URL) => {
    const anchorContainer = document.createElement("div");
    const anchor = document.createElement("a");

    // then set attributes for <div> and <a>
    anchor.textContent = URL;
    anchor.href = `${backendURL}/api/download/${URL}`;

    anchorContainer.appendChild(anchor);
    linksListElement.appendChild(anchorContainer);
  });
}

async function main() {
  const URLArray = await fetchURLs();
  if (URLArray === "error") {
    console.log("errot during fetching urls");
    return;
  }
  const linksListElement = document.querySelector("main")!;
  populateLinksList(linksListElement, URLArray);
  document.body.appendChild(linksListElement);
}

main();
