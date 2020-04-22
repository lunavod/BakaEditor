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

    updated = false
    range: CustomSelection = {}
    lastSelection: CustomSelection = {}

    initIO(io: IO): void {
        this.innerHTML = io.toHtml()

        io.addEventListener('update', (data) => {
            console.log(data)
            this.innerHTML = io.toHtml()
            this.lastSelection = this.getSelection()
            if (this.innerText) this.updated = true
        })

        io.addEventListener('undo', (revertedItem) => {
            console.log('Undo', revertedItem)
            if (revertedItem.type === 'insert') {
                this.setCursorPos(revertedItem.start)
            }

            if (revertedItem.type === 'delete') {
                this.setCursorPos(revertedItem.start + revertedItem.n)
            }
        })

        io.addEventListener('redo', (revertedItem) => {
            console.log('Redo', revertedItem)
            if (revertedItem.type === 'insert') {
                this.setCursorPos(
                    revertedItem.start + revertedItem.value.length
                )
            }

            if (revertedItem.type === 'delete') {
                this.setCursorPos(revertedItem.start)
            }
        })

        const saveSelection = () => {
            this.lastSelection = this.getSelection()
        }

        this.addEventListener('keyup', saveSelection)
        this.addEventListener('keydown', saveSelection)
        this.addEventListener('click', saveSelection)

        this.addEventListener('keydown', (e: KeyboardEvent) => {
            // e.keyCode 90 = 'z'
            if (!e.ctrlKey || e.shiftKey || e.keyCode !== 90) return
            e.preventDefault()
            io.undo()
            this.updated = true
        })

        this.addEventListener('keydown', (e: KeyboardEvent) => {
            // e.keyCode 90 = 'z'
            if (!e.ctrlKey || !e.shiftKey || e.keyCode !== 90) return
            e.preventDefault()
            io.redo()
            this.updated = true
        })

        this.addEventListener('keydown', (e: KeyboardEvent) => {
            // e.keyCode 89 = 'y'
            if (!e.ctrlKey || e.shiftKey || e.keyCode !== 89) return
            e.preventDefault()
            io.redo()
            this.updated = true
        })

        const callback = (m) => {
            console.log(m)
            const before = io.text
            const after = this.innerText

            const range = this.getSelection()

            if (this.updated) {
                console.log('IGNORED')
                this.setCursorPos(this.cursorPos)
                this.updated = false
                return
            }

            console.log('USED')

            if (this.lastSelection.collapsed) {
                if (before.length < after.length) {
                    const start = this.lastSelection.startOffset
                    const end = start + (after.length - before.length)
                    let change = this.innerText.slice(start, end)
                    if (change === '\n\n') change = '\n'
                    io.insert(start, change)
                    this.cursorPos = start + change.length
                } else {
                    let start = range.startOffset
                    let end = this.lastSelection.startOffset
                    if (end - start < 0) {
                        end = this.lastSelection.startOffset
                        start = this.lastSelection.startOffset - 1
                    }
                    io.delete(start, end - start)
                    this.cursorPos = start
                }
            } else {
                console.log(this.lastSelection)
                const start = this.lastSelection.startOffset
                const end = this.lastSelection.endOffset
                const value = this.innerText.slice(start, range.startOffset)
                io.replace(start, end, value)
                this.cursorPos = range.startOffset
            }

            this.setCursorPos(this.cursorPos)

            saveSelection()
        }

        const observer = new MutationObserver(callback)
        observer.observe(this, {
            childList: true,
            subtree: true,
            characterData: true,
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
        while (
            container.nodeName !== '#text' &&
            container.firstChild !== null
        ) {
            container = container.firstChild
        }
        const nodes = this.getFlatNodes()

        let offset = 0
        for (let node of nodes) {
            if (node === container) {
                break
            }
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

        let range
        try {
            range = window.getSelection().getRangeAt(0)
        } catch (err) {
            return
        }
        // console.log(offset - n, offset, n)
        range.setEnd(node, offset - n)
        range.setStart(node, offset - n)
        this.cursorPos = offset
    }

    getCursorPos(): number {
        let caretOffset = 0
        let range
        try {
            range = window.getSelection().getRangeAt(0)
        } catch (err) {
            return 0
        }
        let selected = range.toString().length
        let preCaretRange = range.cloneRange()

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

        result.toString = () => range.toString()

        result.collapsed = range.collapsed

        result.startContainer = range.startContainer
        result.startOffset = range.startOffset + firstOffset

        result.endContainer = range.endContainer
        result.endOffset = range.endOffset + secondOffset

        if (
            range.startContainer === this &&
            range.endContainer === this &&
            range.startOffset === 0 &&
            range.endOffset === 1
        ) {
            result.startOffset = 0
            result.endOffset = this.innerText.length
        }

        return result
    }
}

customElements.define('baka-editable', Editable)
