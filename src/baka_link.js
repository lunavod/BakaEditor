// @flow

export default class BakaLink extends HTMLElement {
    connectedCallback(): void {
        const observer = new MutationObserver((mutations) => {
            if (this.querySelector('a')) return
            this.update()
        })

        observer.observe(this, { childList: true })

        this.update()
    }

    update() {
        const el = document.createElement('a')
        el.href = this.innerText
        el.target = '_blank'
        el.innerText = this.innerText
        this.innerHTML = ''
        this.appendChild(el)
    }
}

customElements.define('baka-link', BakaLink)
