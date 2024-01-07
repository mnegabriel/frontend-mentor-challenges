/** @type {HTMLFormElement} */
const form = document.querySelector("#ratingForm")

/** @type {HTMLDivElement} */
const ratingCard = document.querySelector(".card.rating")

/** @type {HTMLDivElement} */
const resultCard = document.querySelector(".card.result")

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const rating = formData.get("rating")

    await handleRatingSubmit(rating)
})

/**
 * @param {string} rating
 */
async function handleRatingSubmit(rating) {
    try {
        toggleLoadingStatus(true)
        await new Promise(res => setTimeout(res, 3000))

        ratingCard.classList.add("hidden")
        resultCard.classList.remove("hidden")

        /** @type {HTMLSpanElement} */
        const resultPlacement = document.querySelector("[data-result]")

        resultPlacement.innerText = rating
    } catch (error) {
        console.log(error)
    } finally {
        toggleLoadingStatus(false)

    }
}

/**
 * @param {boolean} bool
 */
function toggleLoadingStatus(bool) {


    /** @type {NodeListOf<HTMLInputElement>}*/
    const inputs = document.querySelectorAll("[type='radio']")

    /** @type {HTMLButtonElement}*/
    const submitButton = document.querySelector('button')

    inputs.forEach(input => {
        bool
            ? input.setAttribute("disabled", "")
            : input.removeAttribute("disabled")
    })

    bool
        ? submitButton.setAttribute("disabled", "")
        : submitButton.removeAttribute("disabled")

}