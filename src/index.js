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
    stylesOverride = {}

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
        this.elms.editor.addCursorPosListener(offset => {
            console.log('Cursor position:', offset)
        })
        this.logger({ type: 'INIT' })
    }

    updateButtons() {
        let range = this.elms.editor.getSelection()
        let offset = range.startOffset
        const styles = range.collapsed
            ? Object.keys(this.document.getStylesAtOffset(offset))
            : this.document.getStylesAtRange(range.startOffset, range.endOffset)
        console.log('Styles before:', styles)
        for (let styleName in this.stylesOverride) {
            if (
                styles.indexOf(styleName) >= 0 &&
                !this.stylesOverride[styleName]
            ) {
                styles.splice(styles.indexOf(styleName), 1)
            }
            if (
                styles.indexOf(styleName) < 0 &&
                this.stylesOverride[styleName]
            ) {
                styles.push(styleName)
            }
        }
        console.log('Styles after:', styles)

        this.elms.wrapper
            .querySelectorAll('#buttons > a')
            .forEach(el => el.classList.remove('active'))
        styles.forEach(style => {
            this.elms.buttons[style].classList.add('active')
        })
    }

    initButtons() {
        this.elms.editor.addCursorPosListener(() => {
            this.stylesOverride = {}
            this.updateButtons()
        })
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
                return
            }

            const button = this.elms.buttons[buttonName]
            const isActive = button.classList.contains('active')

            this.stylesOverride[buttonName] = !isActive

            // this.elms.buttons[buttonName].classList.toggle('active')
        }

        for (let styleName in this.document.styles) {
            this.elms.buttons[styleName].addEventListener('click', e =>
                onButtonClick(styleName, e)
            )
        }
        window.document.addEventListener('click', e => {
            this.updateButtons()
        })
    }

    logger(historyEvent) {
        console.log(
            '\n%cFired event %s\n%c%s\n%s\n%c%s\n%s%o\n%s%o\n',
            ['font-weight: bold', 'margin-bottom: 6px'].join(';'),
            historyEvent.type.toUpperCase(),
            ['color: rgba(0,0,0,1)', 'padding-bottom: 6px'].join(';'),
            this.document.text.slice(0, this.elms.editor.cursorPos) +
                '][' +
                this.document.text.slice(
                    this.elms.editor.cursorPos,
                    this.document.text.length
                ),
            this.document.toHtml(),
            ['color: rgba(0,0,0,.9)', 'line-height: 1.4em'].join(';'),
            `Document length: ${this.document.text.length}; Cursor position: ${this.elms.editor.cursorPos}`,
            'Event details:',
            historyEvent,
            'Styles:',
            this.document.styles
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
        console.log('Init editor')
        if (this.document.text.length) {
            this.elms.placeholder.classList.add('invisible')
        } else {
            this.elms.placeholder.classList.remove('invisible')
        }

        this.elms.editor.innerHTML = this.document.toHtml()

        this.elms.editor.addEventListener('input', e => {
            if (e.inputType !== 'insertText') return

            e.preventDefault()

            let range = this.elms.editor.getSelection()
            range.startOffset -= e.data.length
            if (range.collapsed) {
                this.elms.editor.cursorPos = range.startOffset + 1
                this.document.insert(range.startOffset, e.data)
            } else {
                this.elms.editor.cursorPos = range.startOffset + e.data.length
                this.document.replace(
                    range.startOffset,
                    range.endOffset,
                    e.data
                )
            }

            let styles = this.document.getStylesAtOffset(range.startOffset)
            for (let styleName in this.stylesOverride) {
                if (this.stylesOverride[styleName] && !(styleName in styles))
                    this.document.mark(
                        styleName,
                        range.startOffset,
                        range.startOffset + e.data.length
                    )
                if (!this.stylesOverride[styleName] && styleName in styles)
                    this.document.unmark(
                        styleName,
                        range.startOffset,
                        range.startOffset + e.data.length
                    )
            }
            this.stylesOverride = {}
        })

        this.elms.editor.addEventListener('input', e => {
            if (e.inputType !== 'insertParagraph') return

            let range = this.elms.editor.getSelection()

            if (range.collapsed) {
                this.elms.editor.cursorPos = range.startOffset + 1
                this.document.insert(range.startOffset, '\n')
                return
            }

            this.elms.editor.cursorPos += 1
            this.document.replace(range.startOffset, range.endOffset, '\n')
        })

        this.elms.editor.addEventListener('beforeinput', e => {
            if (e.inputType !== 'deleteContentBackward') return

            e.preventDefault()

            console.log(e)

            let range = this.elms.editor.getSelection()
            if (range.startOffset < 1 && range.collapsed) return

            if (range.collapsed) {
                this.elms.editor.cursorPos = range.startOffset - 1
                this.document.delete(range.startOffset - 1, 1)
                return
            }
            this.elms.editor.cursorPos = range.startOffset

            this.document.delete(
                range.startOffset,
                range.endOffset - range.startOffset
            )
        })

        this.elms.editor.addEventListener('beforeinput', e => {
            if (e.inputType !== 'deleteContentForward') return

            e.preventDefault()

            let range = this.elms.editor.getSelection()
            this.elms.editor.cursorPos = range.startOffset

            if (range.collapsed) {
                this.document.delete(range.startOffset, 1, 'forward')
                return
            }
            this.document.replace(range.startOffset, range.endOffset, '')
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
