/**
 *  @typedef {object} AccordionItem
 *  @prop {Node} button
 *  @prop {HTMLElement | null} content
 *  @prop {boolean} open
 */

class Accordion {
    /** @type {Array<AccordionItem>} */
    items = []

    constructor(cssSelector) {
        if (!cssSelector) throw new Error("Accordion constructor - missing cssSelector")

        this.accordion = document.querySelector(cssSelector)

        /** @type {NodeList} */
        const buttons = this.accordion.querySelectorAll('button[aria-expanded]');

        this.items = [...buttons].map(button => {
            /** @type {string} */
            const controlId = button.getAttribute('aria-controls')

            const content = document.getElementById(controlId)

            const open = button.getAttribute('aria-expanded') === 'true'

            return { button, content, open }
        })

        this.setUpListeners()
    }

    setUpListeners() {
        this.items.forEach((item) => {
            item.button.addEventListener("click", () => this.toggle(item))
        })
    }

    /**
     * @param {AccordionItem} item
     */
    toggle(item) {
        const itemIsClosed = !item.open

        // console.log(item)

        this.items.forEach(item => this._closeItem(item))

        if (itemIsClosed) this._openItem(item)
    }

    /** @param {AccordionItem} item */
    _closeItem(item) {
        item.button.setAttribute('aria-expanded', "false")
        item.open = false
        item.content.classList.remove("open")
    }

    /** @param {AccordionItem} item */
    _openItem(item) {
        item.button.setAttribute('aria-expanded', "true")
        item.open = true
        item.content.classList.add("open")
    }
}

new Accordion("#accordionGroup")