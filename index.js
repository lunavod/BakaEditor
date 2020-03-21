// import Document from './document'

class BakaEditor extends HTMLElement {
    template = `<div id="wrapper">
        <div id="buttons">
            <a href="#" id="bold" class="">B</a>
            <a href="#" id="italic" class="">I</a>
            <a href="#" id="strike" class="">S</a>
        </div>
        <div id="placeholder">Type something!</div>
        <div id="editor" contenteditable></div >
    </div>`

    elms = {}

    __cursorPos = 0
    __cursorPosListeners = [
        offset => {
            console.log('Cursor position:', offset)
        },
        offset => {
            const styles = Object.keys(this.document.getStylesAtOffset(offset))
            console.log(this.document.getStylesAtOffset(offset))
            this.elms.wrapper
                .querySelectorAll('#buttons > a')
                .forEach(el => el.classList.remove('active'))
            styles.forEach(style => {
                this.elms.buttons[style].classList.add('active')
                this.document.styles[style].active = true
            })
        }
    ]
    get cursorPos() {
        return this.__cursorPos
    }
    set cursorPos(val) {
        this.__cursorPos = val
        this.__cursorPosListeners.forEach(cb => setTimeout(() => cb(val), 1))
    }

    connectedCallback() {
        this.innerHTML = this.template
        this.elms.wrapper = this.querySelector('#wrapper')
        this.elms.editor = this.querySelector('#editor')
        this.elms.placeholder = this.querySelector('#placeholder')
        this.document = new Document()
        this.document.addEventListener('update', this.onTextUpdate.bind(this))
        this.document.addEventListener('update', this.logger.bind(this))
        this.initEditor()
        this.initButtons()
    }

    initButtons() {
        this.elms.buttons = {
            wrapper: this.elms.wrapper.querySelector('#buttons'),
            bold: this.elms.wrapper.querySelector('#buttons #bold'),
            italic: this.elms.wrapper.querySelector('#buttons #italic'),
            strike: this.elms.wrapper.querySelector('#buttons #strike')
        }

        this.elms.buttons.bold.addEventListener('click', e => {
            this.elms.editor.focus()
            this.document.styles.bold.active = !this.document.styles.bold.active
            this.elms.buttons.bold.classList.toggle('active')

            let range = this.getSelection()
            if (!range.collapsed) {
                console.log('bold', range.startOffset, range.endOffset)
                this.cursorPos = range.endOffset
                this.document.mark('bold', range.startOffset, range.endOffset)
            }
        })
    }

    logger(historyEvent) {
        console.log(
            '\n%cFired event %s\n%c%s\n%s\n%c%s\n%s%o\n%s%o\n',
            ['font-weight: bold', 'margin-bottom: 6px'].join(';'),
            historyEvent.type.toUpperCase(),
            ['color: rgba(0,0,0,1)', 'padding-bottom: 6px'].join(';'),
            this.document.text,
            this.document.toHtml(),
            ['color: rgba(0,0,0,.9)', 'line-height: 1.4em'].join(';'),
            `Document length: ${this.document.text.length}; Cursor position: ${this.cursorPos}`,
            'Event details:',
            historyEvent,
            'Bold ranges:',
            this.document.styles.bold.ranges
        )
    }

    onTextUpdate(event) {
        if (this.document.text.length) {
            this.elms.placeholder.classList.add('invisible')
        } else {
            this.elms.placeholder.classList.remove('invisible')
        }
        this.elms.editor.innerHTML = this.document.toHtml()
        this.setCursorPos(this.cursorPos)
    }

    initEditor() {
        if (this.document.text.length) {
            this.elms.placeholder.classList.add('invisible')
        } else {
            this.elms.placeholder.classList.remove('invisible')
        }

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
            if (e.key.length === 1) return

            if (ignore.indexOf(e.key) >= 0) {
                setTimeout(() => {
                    this.cursorPos = this.getCursorPos()
                }, 1)
                return
            }

            e.preventDefault()
            let node = window.getSelection().getRangeAt(0).endContainer
            if (node.nodeName == '#text') node = node.parentElement

            let cP = this.getCursorPos()
            let range = this.getSelection()

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

    getContainerOffset(container) {
        let nodes = Array.from(this.elms.editor.childNodes)
        while (nodes.filter(node => node.childNodes.length).length) {
            nodes = nodes
                .map(el =>
                    el.nodeName === '#text' || el.nodeName === 'BR'
                        ? [el]
                        : Array.from(el.childNodes)
                )
                .flat(Infinity)
        }

        let offset = 0
        for (let node of nodes) {
            if (node === container) break
            console.log(node)
            offset += node.length || 1
        }

        console.log('GET CONTAINER AT OFFSET:', container, offset)
        return offset
    }

    getContainerAtOffset(offset) {
        let nodes = Array.from(this.elms.editor.childNodes)
        while (nodes.filter(node => node.childNodes.length).length) {
            nodes = nodes
                .map(el =>
                    el.nodeName === '#text' || el.nodeName === 'BR'
                        ? [el]
                        : Array.from(el.childNodes)
                )
                .flat(Infinity)
        }

        console.log(nodes)
        let lastNode
        let x = 0
        for (let node of nodes) {
            if (node.nodeName !== '#text' && node.nodeName !== 'BR') {
                if (!node.firstChild) continue
                node = node.firstChild
            }
            lastNode = node
            if (x + (node.length || 1) >= offset) break
            x += node.length || 1
            console.log('X:', x, 'Offset:', offset, 'Node:', node)
        }
        return { line: lastNode || nodes[0], n: x }
    }

    setCursorPos(offset) {
        let containerData = this.getContainerAtOffset(offset)
        let node = containerData.line
        let n = containerData.n

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

        const brCount = Array.from(preCaretRange.cloneContents().childNodes)
            .map(el =>
                el.nodeName === '#text'
                    ? []
                    : Array.from(el.querySelectorAll('*'))
            )
            .flat(Infinity)
            .filter(el => el.nodeName === 'BR').length
        caretOffset += brCount

        return caretOffset
    }

    getSelection() {
        let range = window.getSelection().getRangeAt(0)
        let result = {}
        let firstOffset = this.getContainerOffset(range.startContainer)
        let secondOffset = this.getContainerOffset(range.endContainer)

        console.log('Offsets:', firstOffset, secondOffset)

        result.collapsed = range.collapsed

        result.startContainer = range.startContainer
        result.startOffset = range.startOffset + firstOffset

        result.endContainer = range.endContainer
        result.endOffset = range.endOffset + secondOffset

        return result
    }
}

customElements.define('baka-editor', BakaEditor)
