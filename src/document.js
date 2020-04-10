// @flow

type InsertEvent = {
    type: 'insert',
    start: number,
    value: string,
}

type DeleteEvent = {
    type: 'delete',
    start: number,
    n: number,
    value: string,
    dir: 'back' | 'forward',
}

type ReplaceEvent = {
    type: 'replace',
    start: number,
    end: number,
    from: string,
    to: string,
}

type SetTextEvent = {
    type: 'set text',
    text: string,
}

interface IO {
    text: string;

    history: Array<InsertEvent | DeleteEvent | SetTextEvent | ReplaceEvent>;
    addEventListener: (
        event: string,
        item: InsertEvent | DeleteEvent | SetTextEvent | ReplaceEvent
    ) => {};

    undo(): void;
    redo(): void;

    delete(start: number, n: number, direction?: string): void;
    insert(start: number, text: string): void;
    replace(start: number, end: number, text: string): void;

    toHtml(): string;

    text: string;
}

export default class Document {
    //    text = 'aabb\nbbaa\n'
    text = ''
    history: Array<InsertEvent | DeleteEvent | SetTextEvent | ReplaceEvent> = []
    historyOffset: number = -1

    undo() {
        if (this.historyOffset === this.history.length - 1) return
        this.historyOffset += 1
        let item = this.history[this.history.length - this.historyOffset - 1]
        console.log(this.history, this.historyOffset, item)
        switch (item.type) {
            case 'insert':
                this.delete(item.start, item.value.length, 'back', false)
                break
            case 'delete':
                this.insert(item.start, item.value, false)
                break
            case 'replace':
                this.replace(
                    item.start,
                    item.start + item.from.length,
                    item.from,
                    false
                )
                break
        }
        this.fireUpdate(item, 'undo')
    }

    redo() {
        if (this.historyOffset === 0) return
        this.historyOffset -= 1
        let item = this.history[this.history.length - this.historyOffset - 1]
        console.log(this.history, this.historyOffset, item)
        switch (item.type) {
            case 'insert':
                this.insert(item.start, item.value, false)
                break
            case 'delete':
                this.delete(item.start, item.n, item.dir, false)
                break
            case 'replace':
                this.replace(item.start, item.end, item.value)
                break
        }
        this.fireUpdate(item, 'redo')
    }

    beforeDelete(start: number, n: number) {}
    beforeInsert(start: number, text: string) {}

    getStylesAtOffset(offset: number) {
        let styles = {}
        for (let styleName in this.styles) {
            for (let i = 0; i < this.styles[styleName].ranges.length; i++) {
                let range = this.styles[styleName].ranges[i]
                if (!(range[0] < offset && range[1] >= offset)) continue
                styles[styleName] = range
            }
        }
        return styles
    }

    getStylesAtRange(start: number, end: number) {
        let styles = []
        for (let styleName in this.styles) {
            for (let i = 0; i < this.styles[styleName].ranges.length; i++) {
                let range = this.styles[styleName].ranges[i]
                if (
                    !(
                        (
                            (range[0] >= start && range[0] < end) || // Начало в выделении
                            (range[1] > start && range[1] <= end) || // Конец в выделении
                            (range[0] <= start && range[1] >= end)
                        ) // Выделение между началом и концом
                    )
                )
                    continue
                styles.push(styleName)
            }
        }
        return styles
    }

    setText(text) {
        const historyItem: SetTextEvent = { type: 'set text', text }
        this.history = [historyItem]
        this.text = text
        this.fireUpdate(historyItem)
    }

    insert(start: number, value: string, save: boolean = true): void {
        const historyItem: InsertEvent = { type: 'insert', value, start }
        if (save) {
            this.history.push(historyItem)
            this.historyOffset = -1
        }

        this.beforeInsert(start, value)

        let arr = Array.from(this.text)
        arr.splice(start, 0, value)
        this.text = arr.join('')

        this.fireUpdate(historyItem)
    }

    replace(
        start: number,
        end: number,
        value: string,
        save: boolean = true
    ): void {
        const historyItem: ReplaceEvent = {
            type: 'replace',
            start,
            end,
            from: this.text.slice(start, end),
            to: value,
        }
        if (save) {
            this.history.push(historyItem)
            this.historyOffset = -1
        }
        this.delete(start, end - start, 'back', false)
        if (value) this.insert(start, value, false)
        this.fireUpdate(historyItem)
    }

    delete(
        start: number,
        n: number,
        dir: 'back' | 'forward' = 'back',
        save: boolean = true
    ) {
        const historyItem: DeleteEvent = {
            type: 'delete',
            n,
            start,
            dir,
            value: this.text.slice(start, start + n),
        }
        if (save) {
            this.history.push(historyItem)
            this.historyOffset = -1
        }

        this.beforeDelete(start, n)

        let arr = Array.from(this.text)
        arr.splice(start, n)
        this.text = arr.join('')

        this.fireUpdate(historyItem)
    }

    listeners: { [string]: Array<(event: mixed) => void> } = {}

    addEventListener(event: string, callback: (event: mixed) => void): void {
        if (this.listeners[event]) {
            this.listeners[event].push(callback)
        } else {
            this.listeners[event] = [callback]
        }
    }

    fireUpdate(event: mixed, type: string = 'update'): void {
        const callbacks = this.listeners[type]
        if (!callbacks) return
        callbacks.forEach((callback) => callback(event))
    }

    toHtml(): string {
        if (!this.text.length) return '<div class="empty">&#8203;</div>'
        let allRanges: Array<{ style: string, range: [number, number] }> = []
        let lines = [[]]
        let nodes = []
        let result = ''

        for (let styleName in this.styles) {
            for (let range of this.styles[styleName].ranges) {
                allRanges.push({ style: styleName, range })
            }
        }

        const getStylesAtOffset = (offset: number): string[] => {
            return allRanges
                .filter((rangeData) => {
                    let range = rangeData.range
                    return range[0] <= offset && range[1] > offset
                })
                .map((rangeData) => rangeData.style)
        }

        const stylesEqual = (a: string[], b: string[]) => {
            if (a.length !== b.length) return false
            return !a.filter((el) => b.indexOf(el) < 0).length
        }

        let currentNode: {
            styles: string[],
            text: string,
            start: number,
            end: number,
        } = {
            styles: getStylesAtOffset(0),
            text: this.text[0],
            start: 0,
            end: 1,
        }
        let currentLine = 0
        for (let i = 1; i < this.text.length; i++) {
            let ch = this.text[i]
            let styles = getStylesAtOffset(i)

            if (
                stylesEqual(currentNode.styles, styles) &&
                (ch !== '\n' || currentNode.styles.indexOf('code') >= 0)
            ) {
                currentNode.end = i
                currentNode.text += ch === '\n' ? '<br/>' : ch
                continue
            }

            lines[currentLine].push(currentNode)
            nodes.push(currentNode)
            if (ch === '\n') {
                currentLine++
                lines.push([])
                // continue
            }
            currentNode = {
                styles,
                text: ch,
                start: i,
                end: i + 1,
            }
        }
        lines[currentLine].push(currentNode)
        nodes.push(currentNode)

        for (let node of nodes) {
            let start = node.styles
                .map((styleName) => this.styles[styleName].openTag)
                .join('')
            let end = node.styles
                .map((styleName) => this.styles[styleName].closeTag)
                .join('')
            result += start + node.text + end
            // if (node.text !== '\n') lineLength += node.text.length
        }

        if (result.endsWith('\n')) result += '&#8203;'

        return result
    }
}
