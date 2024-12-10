const adviceId = document.querySelector(".js-advice-id");
const adviceQuote = document.querySelector(".js-advice-quote");
const adviceGenBtn = document.querySelector(".js-advice-generate-button");

// Debounce to avoid multiple api calls
let isFetching = false;

async function generateAdvice() {
  if (isFetching) return;
  isFetching = true;
  adviceGenBtn.disabled = true;

  try {
    adviceId.innerHTML = "---";
    adviceQuote.innerHTML = "Loading advice...";

    const response = await fetch("https://api.adviceslip.com/advice", {
      cache: "no-store",
    });
    const advicesData = await response.json();

    if (response.ok) {
      adviceId.innerHTML = advicesData.slip.id;
      adviceQuote.innerHTML = advicesData.slip.advice;
    } else {
      adviceQuote.innerHTML = "Unexpected response format. Please try again.";
    }
  } catch {
    console.error("An error occurred: Failed to fetch advice.");
    adviceQuote.innerHTML = "Failed to generate advice. Please try again.";
  } finally {
    isFetching = false;
    adviceGenBtn.disabled = false;
  }
}

adviceGenBtn.addEventListener("click", generateAdvice);
