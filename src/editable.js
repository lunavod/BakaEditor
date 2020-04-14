// @flow

import type IO from './document'

type CustomSelection = {
    startOffset: number,
    endOffset: number,

    startContainer: Node,
    endContainer: Node,

    toString: () => string,
    collapsed: boolean,
}

class Editable extends HTMLElement {
    connectedCallback(): void {
        this.setAttribute('contenteditable', 'true')
        this.addEventListener('click', () => this.focus())
    }

    initIO(io: IO): void {
        let lastSelection: CustomSelection

        this.innerHTML = io.toHtml()

        io.addEventListener('undo', (revertedItem) => {
            if (revertedItem.type === 'insert') {
                this.setCursorPos(revertedItem.start)
            }

            if (revertedItem.type === 'delete') {
                this.setCursorPos(revertedItem.start + revertedItem.n)
            }
        })
        io.addEventListener('redo', (revertedItem) => {
            if (revertedItem.type === 'insert') {
                this.setCursorPos(
                    revertedItem.start + revertedItem.value.length
                )
            }

            if (revertedItem.type === 'delete') {
                this.setCursorPos(revertedItem.start)
            }
        })

        const insertText = (text: string, range: CustomSelection): void => {
            console.log(range)
            if (range.collapsed) {
                this.cursorPos = range.startOffset + text.length
                io.insert(range.startOffset, text)
            } else {
                this.cursorPos = range.startOffset + text.length
                // this.setCursorPos(range.startOffset + text.length)
                io.replace(range.startOffset, range.endOffset, text)
            }
        }

        this.addEventListener('paste', (e: ClipboardEvent): void => {
            e.preventDefault()
            const clipboardData = e.clipboardData || window.clipboardData
            const pastedData = clipboardData.getData('Text').replace(/\r/gm, '')
            console.log(pastedData, pastedData.length)

            let range =
                lastSelection && !lastSelection.collapsed
                    ? lastSelection
                    : this.getSelection()
            insertText(pastedData, range)
            lastSelection = null
        })

        this.addEventListener('beforeinput', (e: any): void => {
            if (e.inputType !== 'insertText') return

            e.preventDefault()
            console.log('Last vs new:')
            console.log(lastSelection, this.getSelection())

            let range =
                lastSelection && !lastSelection.collapsed
                    ? lastSelection
                    : this.getSelection()

            insertText(e.data, range)
        })

        this.addEventListener('beforeinput', (e: any): void => {
            if (e.inputType !== 'insertParagraph') return

            e.preventDefault()

            let range = this.getSelection()

            console.log(range.startOffset)

            if (range.collapsed) {
                this.cursorPos = range.startOffset + 1
                this.setCursorPos(range.startOffset + 1)
                io.insert(range.startOffset, '\n')
                return
            }

            this.cursorPos = range.startOffset + 1
            io.replace(range.startOffset, range.endOffset, '\n')
        })

        this.addEventListener('beforeinput', (e: any): void => {
            if (e.inputType !== 'deleteContentBackward') return

            e.preventDefault()

            let range: CustomSelection = this.getSelection()
            if (range.startOffset < 1 && range.collapsed) return

            if (range.collapsed) {
                this.cursorPos = range.startOffset - 1
                io.delete(range.startOffset - 1, 1)
                return
            }
            this.cursorPos = range.startOffset

            io.delete(range.startOffset, range.endOffset - range.startOffset)
        })

        this.addEventListener('beforeinput', (e: any): void => {
            if (e.inputType !== 'deleteContentForward') return

            e.preventDefault()

            let range = this.getSelection()
            this.cursorPos = range.startOffset

            if (range.collapsed) {
                io.delete(range.startOffset, 1, 'forward')
                return
            }
            io.replace(range.startOffset, range.endOffset, '')
        })

        this.addEventListener('keydown', (e: any): void => {
            if (!e.ctrlKey || e.key !== 'Delete') return

            e.preventDefault()

            let text = io.text
            let range = this.getSelection()

            text = text.slice(range.startOffset, text.length)
            let ch = io.text[range.startOffset]

            let firstIndex
            let regexp = ch.match(/\s/) !== null ? /\S/gm : /\s/gm

            let matches = Array.from(text.matchAll(regexp))

            if (matches.length) firstIndex = matches[0].index
            else firstIndex = text.length

            io.delete(range.startOffset, firstIndex)
            this.setCursorPos(range.startOffset)
        })

        this.addEventListener('keydown', (e: any): void => {
            if (!e.ctrlKey || e.key !== 'Backspace') return

            e.preventDefault()

            let text = io.text
            let range = this.getSelection()

            text = text.slice(0, range.startOffset)
            let ch = io.text[range.startOffset - 1]

            let firstIndex
            let regexp = ch.match(/\s/) !== null ? /\S/gm : /\s/gm

            let matches = Array.from(text.matchAll(regexp))

            if (matches.length)
                firstIndex = matches[matches.length - 1].index + 1
            else firstIndex = 0

            this.setCursorPos(range.startOffset - text.length + firstIndex)
            io.delete(
                range.startOffset - text.length + firstIndex,
                text.length - firstIndex
            )
        })

        this.addEventListener('keyup', (e: any): void => {
            let navigationKeys = [
                'ArrowLeft',
                'ArrowRight',
                'ArrowUp',
                'ArrowDown',
                'Home',
                'End',
                'PageUp',
                'PageDown',
            ]
            if (navigationKeys.indexOf(e.key) < 0) return

            this.cursorPos = this.getCursorPos()
        })

        this.addEventListener('keydown', (e: any): void => {
            if (!e.ctrlKey || e.key !== 'z' || e.shiftKey) return

            io.undo()
        })

        this.addEventListener('keydown', (e: any): void => {
            if (!e.ctrlKey || e.key !== 'Z' || !e.shiftKey) return
            console.log('redo')
            io.redo()
        })

        this.addEventListener('keydown', (e: any): void => {
            if (!e.ctrlKey || e.key !== 'v') return
            lastSelection = this.getSelection()
        })

        this.addEventListener('mouseup', (): void => {
            var range = window.getSelection().getRangeAt(0)
            if (
                range.startContainer.parentElement.classList.contains('empty')
            ) {
                this.setCursorPos(0)
            }
            this.cursorPos = this.getCursorPos()
        })
    }

    __cursorPos = 0
    __cursorPosListeners = []
    get cursorPos() {
        return this.__cursorPos
    }
    set cursorPos(val: number): void {
        this.__cursorPos = val
        this.__cursorPosListeners.forEach((cb) => setTimeout(() => cb(val), 1))
    }

    getFlatNodes() {
        let nodes: Array<any> = Array.from(this.childNodes)
        while (nodes.filter((node) => node.childNodes.length).length) {
            nodes = nodes
                .map((el: Node) =>
                    el.nodeName === '#text' || el.nodeName === 'BR'
                        ? [el]
                        : Array.from(el.childNodes)
                )
                .flat(Infinity)
        }
        return nodes
    }

    getContainerOffset(container: HTMLElement): number {
        const nodes = this.getFlatNodes()

        let offset = 0
        for (let node of nodes) {
            if (node === container) break
            offset += node.length || 1
        }

        return offset
    }

    getContainerAtOffset(offset: number): { line: Node, n: number } {
        const nodes = this.getFlatNodes()

        let lastNode: Node | void = undefined
        let x = 0
        for (let node of nodes) {
            if (node.nodeName === 'BR') {
                x += 1
                continue
            }
            if (node.nodeName !== '#text') {
                if (!node.firstChild) continue
                node = node.firstChild
            }
            lastNode = node
            if (x + (node.length || 1) >= offset) break
            x += node.length || 1
        }
        return { line: lastNode || nodes[0], n: x }
    }

    setCursorPos(offset: number): void {
        if (document.activeElement !== this) return
        let containerData = this.getContainerAtOffset(offset)
        let node = containerData.line
        let n = containerData.n

        if (!node) return

        if (node.firstChild) node = node.firstChild

        try {
            var range = window.getSelection().getRangeAt(0)
        } catch (err) {
            return
        }
        console.log(offset - n, offset, n)
        range.setEnd(node, offset - n)
        range.setStart(node, offset - n)
        this.cursorPos = offset
    }

    getCursorPos(): number {
        var caretOffset = 0
        try {
            var range = window.getSelection().getRangeAt(0)
        } catch (err) {
            return 0
        }
        var selected = range.toString().length
        var preCaretRange = range.cloneRange()

        preCaretRange.selectNodeContents(this)
        preCaretRange.setEnd(range.endContainer, range.endOffset)
        caretOffset = preCaretRange.toString().length - selected

        const brCount = Array.from(preCaretRange.cloneContents().childNodes)
            .map((el: HTMLElement) =>
                el.nodeName === '#text'
                    ? []
                    : Array.from(el.querySelectorAll('*'))
            )
            .flat(Infinity)
            .filter((el: any) => el.nodeName === 'BR').length
        caretOffset += brCount

        return caretOffset
    }

    getSelection(): CustomSelection {
        let range
        try {
            range = window.getSelection().getRangeAt(0)
            // console.log('Original range:', range)
            // return range
        } catch (err) {
            return {
                startOffset: 0,
                endOffset: 0,
                startContainer: this,
                endContainer: this,
                collapsed: true,
                toString: () => '',
            }
        }
        let result: CustomSelection = {}
        let firstOffset = this.getContainerOffset(range.startContainer)
        let secondOffset = this.getContainerOffset(range.endContainer)

        // console.log('Offsets:', firstOffset, secondOffset)

        result.toString = () => range.toString()

        result.collapsed = range.collapsed

        result.startContainer = range.startContainer
        result.startOffset = range.startOffset + firstOffset

        result.endContainer = range.endContainer
        result.endOffset = range.endOffset + secondOffset

        return result
    }
}

customElements.define('baka-editable', Editable)
