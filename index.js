class Document {
    text = ''
    history = []

    insert(start, value) {
        const historyItem = { type: 'insert', value, start }
        this.history.push(historyItem)

        let arr = Array.from(this.text)
        arr.splice(start, 0, value)
        this.text = arr.join('')

        this.fireUpdate(historyItem)
    }

    replace(start, end, value) {
        const historyItem = {
            type: 'replace',
            value,
            start,
            end,
            oldValue: this.text.slice(start, end)
        }
        this.history.push(historyItem)

        let arr = Array.from(this.text)
        arr.splice(start, end - start, value)
        this.text = arr.join('')

        this.fireUpdate(historyItem)
    }

    delete(start, n, dir = 'back') {
        const historyItem = { type: 'delete', n, start, dir }
        this.history.push(historyItem)

        let arr = Array.from(this.text)
        arr.splice(start, n)
        this.text = arr.join('')

        this.fireUpdate(historyItem)
    }

    listeners = {}

    addEventListener(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].push(callback)
        } else {
            this.listeners[event] = [callback]
        }
    }

    fireUpdate(...data) {
        const callbacks = this.listeners['update']
        if (!callbacks) return
        callbacks.forEach(callback => callback(...data))
    }

    toHtml() {
        return this.text
            .split('\n')
            .map(
                line =>
                    `<div ${!line.length ? 'class="empty"' : ''}>${line.replace(
                        / /gm,
                        '&nbsp;'
                    ) || ''}</div>`
            )
            .join('\n')
    }
}

function index(el) {
    if (!el) return -1
    var i = 0
    while ((el = el.previousElementSibling)) {
        i++
    }
    return i
}

class BakaEditor extends HTMLElement {
    template = '<div id="editor" contenteditable><div></div></div>'
    elms = {}
    cursorPos = 0

    connectedCallback() {
        this.innerHTML = this.template
        this.elms.editor = this.querySelector('#editor')
        this.document = new Document()
        this.document.addEventListener('update', this.onTextUpdate.bind(this))
        this.initEditor()
    }

    onTextUpdate(event) {
        this.elms.editor.innerHTML = this.document.toHtml()
        this.setCursorPos(this.cursorPos)
        console.log(this.document.text, this.cursorPos)
    }

    initEditor() {
        this.elms.editor.innerHTML = this.document.toHtml()

        let ignore = [
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Home',
            'End',
            'PageUp',
            'PageDown'
        ]

        this.elms.editor.addEventListener('keypress', e => {
            e.preventDefault()
            if (e.key.length !== 1) return

            let range = this.getSelection()
            console.log('Range:', range)
            if (range.collapsed) {
                this.cursorPos += 1
                let cP = this.getCursorPos()
                this.document.insert(cP, e.key)
            } else {
                this.cursorPos = range.startOffset + e.key.length
                this.document.replace(range.startOffset, range.endOffset, e.key)
            }
        })

        this.elms.editor.addEventListener('keydown', e => {
            if (e.key.length === 1) {
                return
            }

            if (ignore.indexOf(e.key) >= 0) {
                setTimeout(() => {
                    console.log('Before', this.cursorPos)
                    this.cursorPos = this.getCursorPos()
                    console.log('After', this.cursorPos)
                }, 1)
                return
            }

            e.preventDefault()
            let node = window.getSelection().getRangeAt(0).endContainer
            if (node.nodeName == '#text') node = node.parentElement

            let cP = this.getCursorPos()
            let range = this.getSelection()
            console.log(`cP: ${cP}, index: ${index(node)}`)

            switch (e.key) {
                case 'Enter':
                    if (range.collapsed) {
                        this.cursorPos += 1
                        this.document.insert(cP, '\n')
                    } else {
                        this.cursorPos += 1
                        this.document.replace(
                            range.startOffset,
                            range.endOffset,
                            '\n'
                        )
                    }
                    break
                case 'Backspace':
                    if (cP < 1) break
                    if (range.collapsed) {
                        this.cursorPos -= 1
                        this.document.delete(cP - 1, 1)
                    } else {
                        this.cursorPos = range.startOffset
                        this.document.replace(
                            range.startOffset,
                            range.endOffset,
                            ''
                        )
                    }
                    break
                case 'Delete':
                    if (range.collapsed) {
                        this.document.delete(cP, 1, 'forward')
                    } else {
                        this.cursorPos = range.startOffset
                        this.document.replace(
                            range.startOffset,
                            range.endOffset,
                            ''
                        )
                    }
            }
        })

        this.elms.editor.addEventListener('mouseup', e => {
            var range = window.getSelection().getRangeAt(0)
            if (
                range.startContainer.parentElement.classList.contains('empty')
            ) {
                this.setCursorPos(0, range.startContainer)
            }
            this.cursorPos = this.getCursorPos()
        })
    }

    getContainerAtOffset(offset) {
        let lines = this.elms.editor.querySelectorAll('*')
        let n = 0
        for (let line of lines) {
            if (n + line.innerText.length >= offset) return { line, n }
            n += line.innerText.length + 1
        }
        console.log('Returning default')
        return { line: this.elms.editor.firstChild, n: 0 }
    }

    setCursorPos(offset) {
        let containerData = this.getContainerAtOffset(offset)
        let node = containerData.line
        let n = containerData.n

        console.log(containerData)

        if (node.firstChild) node = node.firstChild

        var range = window.getSelection().getRangeAt(0)
        range.setEnd(node, offset - n)
        range.setStart(node, offset - n)
    }

    getCursorPos() {
        var caretOffset = 0
        var range = window.getSelection().getRangeAt(0)
        var selected = range.toString().length
        var preCaretRange = range.cloneRange()

        preCaretRange.selectNodeContents(this.elms.editor)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        caretOffset = preCaretRange.toString().length - selected

        return caretOffset
    }

    getSelection() {
        return window.getSelection().getRangeAt(0)
    }
}

customElements.define('baka-editor', BakaEditor)
