import Document from './document'
import Editable from './editable'

class BakaEditor extends HTMLElement {
    template = `<div id="wrapper">
        <div id="buttons">
            <a href="#" id="bold" class="">B</a>
            <a href="#" id="italic" class="">I</a>
            <a href="#" id="strike" class="">S</a>
        </div>
        <div id="placeholder">Type something!</div>
        <baka-editable id="editor" />
    </div>`

    elms = {}

    connectedCallback() {
        this.innerHTML = this.template
        this.elms.wrapper = this.querySelector('#wrapper')
        this.elms.editor = this.querySelector('#editor')
        this.elms.placeholder = this.querySelector('#placeholder')
        this.buttonsState = {}
        this.document = new Document()
        this.document.addEventListener('update', this.onTextUpdate.bind(this))
        this.document.addEventListener('update', this.logger.bind(this))
        this.initEditor()
        this.initButtons()
        this.elms.editor.addCursorPosListener(offset => {
            console.log('Cursor position:', offset)
        })
    }

    updateButtons() {
        let range = this.elms.editor.getSelection()
        let offset = range.startOffset

        // console.log(
        //     'Styles at range:',
        //     this.document.getStylesAtRange(range.startOffset, range.endOffset)
        // )
        const styles = range.collapsed
            ? Object.keys(this.document.getStylesAtOffset(offset))
            : this.document.getStylesAtRange(range.startOffset, range.endOffset)
        console.log(this.document.getStylesAtOffset(offset))
        this.elms.wrapper
            .querySelectorAll('#buttons > a')
            .forEach(el => el.classList.remove('active'))
        styles.forEach(style => {
            this.elms.buttons[style].classList.add('active')
        })
    }

    initButtons() {
        this.elms.editor.addCursorPosListener(() => this.updateButtons())
        this.buttonsState = {
            bold: false,
            italic: false,
            strike: false
        }
        this.elms.buttons = {
            wrapper: this.elms.wrapper.querySelector('#buttons'),
            bold: this.elms.wrapper.querySelector('#buttons #bold'),
            italic: this.elms.wrapper.querySelector('#buttons #italic'),
            strike: this.elms.wrapper.querySelector('#buttons #strike')
        }

        const onButtonClick = (buttonName, e) => {
            e.preventDefault()
            this.elms.editor.focus()

            const range = this.elms.editor.getSelection()
            if (!range.collapsed) {
                const styles = this.document.getStylesAtRange(
                    range.startOffset,
                    range.endOffset
                )
                if (styles.indexOf(buttonName) >= 0) {
                    this.document.unmark(
                        buttonName,
                        range.startOffset,
                        range.endOffset
                    )
                } else {
                    this.document.mark(
                        buttonName,
                        range.startOffset,
                        range.endOffset
                    )
                }
                this.elms.editor.cursorPos = range.endOffset
                this.elms.editor.setCursorPos(range.endOffset)
                console.log(styles, range)
            }

            this.elms.buttons[buttonName].classList.toggle('active')
        }

        for (let styleName in this.document.styles) {
            this.elms.buttons[styleName].addEventListener('click', e =>
                onButtonClick(styleName, e)
            )
        }
        window.document.addEventListener('click', () => this.updateButtons())
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
            `Document length: ${this.document.text.length}; Cursor position: ${this.elms.editor.cursorPos}`,
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
        this.elms.editor.setCursorPos(this.elms.editor.cursorPos)
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

            let range = this.elms.editor.getSelection()
            if (range.collapsed) {
                this.elms.editor.cursorPos += 1
                let cP = this.elms.editor.getCursorPos()
                this.document.insert(cP, e.key)
            } else {
                this.elms.editor.cursorPos = range.startOffset + e.key.length
                this.document.replace(range.startOffset, range.endOffset, e.key)
            }
        })

        this.elms.editor.addEventListener('keydown', e => {
            if (e.key.length === 1) return

            if (ignore.indexOf(e.key) >= 0) {
                setTimeout(() => {
                    this.elms.editor.cursorPos = this.elms.editor.getCursorPos()
                }, 1)
                return
            }

            e.preventDefault()
            let node = window.getSelection().getRangeAt(0).endContainer
            if (node.nodeName == '#text') node = node.parentElement

            let cP = this.elms.editor.getCursorPos()
            let range = this.elms.editor.getSelection()

            switch (e.key) {
                case 'Enter':
                    if (range.collapsed) {
                        this.elms.editor.cursorPos += 1
                        this.document.insert(cP, '\n')
                    } else {
                        this.elms.editor.cursorPos += 1
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
                        this.elms.editor.cursorPos -= 1
                        this.document.delete(cP - 1, 1)
                    } else {
                        this.elms.editor.cursorPos = range.startOffset
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
                        this.elms.editor.cursorPos = range.startOffset
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
                this.elms.editor.setCursorPos(0, range.startContainer)
            }
            this.elms.editor.cursorPos = this.elms.editor.getCursorPos()
        })
    }
}

customElements.define('baka-editor', BakaEditor)
