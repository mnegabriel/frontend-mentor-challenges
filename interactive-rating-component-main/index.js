/** @type {HTMLFormElement} */
const form = document.querySelector("#ratingForm")

/** @type {HTMLDivElement} */
const ratingCard = document.querySelector(".card.rating")

/** @type {HTMLDivElement} */
const resultCard = document.querySelector(".card.result")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const rating = formData.get("rating")

    handleRatingSubmit(rating)
})

/**
 * @param {string} rating
 */
function handleRatingSubmit(rating) {
    ratingCard.classList.add("hidden")
    resultCard.classList.remove("hidden")

    /** @type {HTMLSpanElement} */
    const resultPlacement = document.querySelector("[data-result]")

    resultPlacement.innerText = rating
}