class Document {
    text = 'aabb\nbbaa'
    history = []

    styles = {
        bold: {
            openTag: '<b>',
            closeTag: '</b>',
            active: false,
            ranges: [[2, 7]]
        },
        italic: {
            openTag: '<i>',
            closeTag: '</i>',
            ranges: [[6, 8]]
        },
        strike: {
            openTag: '<s>',
            closeTag: '</s>',
            ranges: [[1, 4]]
        }
    }

    getStylesAtOffset(offset) {
        let styles = {}
        for (let styleName of Object.keys(this.styles)) {
            for (let i = 0; i < this.styles[styleName].ranges.length; i++) {
                let range = this.styles[styleName].ranges[i]
                if (!(range[0] < offset && range[1] >= offset)) continue
                styles[styleName] = range
            }
        }
        return styles
    }

    mark(styleName, start, end) {
        let i
        let activeRange

        for (i = 0; i < this.styles[styleName].ranges.length; i++) {
            let range = this.styles[styleName].ranges[i]
            if (!(range[0] <= start && range[1] >= start)) continue
            activeRange = range
            break
        }

        if (!activeRange) {
            this.styles[styleName].ranges.push([start, end])
        } else if (activeRange[1] < end) {
            this.styles[styleName].ranges[i][1] = end
        }

        this.fireUpdate({ type: 'mark' })
    }

    insert(start, value) {
        const historyItem = { type: 'insert', value, start }
        this.history.push(historyItem)

        for (let styleName in this.styles) {
            let ranges = this.styles[styleName].ranges
            for (let i = 0; i < ranges.length; i++) {
                let range = ranges[i]
                if (range[0] >= start)
                    this.styles[styleName].ranges[i][0] += value.length
                if (range[1] >= start)
                    this.styles[styleName].ranges[i][1] += value.length
            }
        }

        let arr = Array.from(this.text)
        arr.splice(start, 0, value)
        this.text = arr.join('')

        this.fireUpdate(historyItem)
    }

    replace(start, end, value) {
        this.delete(start, end - start)
        if (value) this.insert(start, value)
    }

    delete(start, n, dir = 'back') {
        const historyItem = { type: 'delete', n, start, dir }
        this.history.push(historyItem)

        for (let styleName in this.styles) {
            let ranges = this.styles[styleName].ranges
            let remove = []
            for (let i = 0; i < ranges.length; i++) {
                let range = ranges[i]

                if (range[0] > start + n) {
                    console.log('1')
                    // Если после конца выделения - сдвинуть назад
                    this.styles[styleName].ranges[i][0] -= n
                    this.styles[styleName].ranges[i][1] -= n
                }

                if (range[0] >= start && range[1] <= start + n) {
                    console.log('2')
                    // Если полностью внутри выделения - удалить
                    remove.push(i)
                    continue
                }

                if (range[0] > start && range[1] > start + n) {
                    console.log('3')
                    // Если начало внутри выделения, а конец снаружи
                    this.styles[styleName].ranges[i][0] = start
                    this.styles[styleName].ranges[i][1] = range[1] - n
                }

                if (
                    range[0] < start &&
                    range[1] > start &&
                    range[1] < start + n
                ) {
                    console.log('4')
                    // Если начало до выделения, а конец внутри
                    this.styles[styleName].ranges[i][1] = start
                }

                if (range[0] < start && range[1] >= start + n) {
                    console.log('5')
                    // Если выделение полностью внутри
                    this.styles[styleName].ranges[i][1] = range[1] - n
                }

                if (
                    this.text[this.styles[styleName].ranges[i][1] - 1] === '\n'
                ) {
                    console.log('6')
                    this.styles[styleName].ranges[i][1] -= 1
                }
            }
            for (let i of remove) {
                this.styles[styleName].ranges.splice(i, 1)
            }
        }

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
        let allRanges = []
        let nodes = []
        let result = ''

        for (let styleName in this.styles) {
            for (let range of this.styles[styleName].ranges) {
                allRanges.push({ style: styleName, range })
            }
        }

        const getStylesAtOffset = offset => {
            return allRanges
                .filter(rangeData => {
                    let range = rangeData.range
                    return range[0] <= offset && range[1] > offset
                })
                .map(rangeData => rangeData.style)
        }

        const stylesEqual = (a, b) => {
            if (a.length !== b.length) return false
            return !a.filter(el => b.indexOf(el) < 0).length
        }

        let currentNode = {
            styles: getStylesAtOffset(0),
            text: this.text[0],
            start: 0,
            end: 1
        }
        for (let i = 1; i < this.text.length; i++) {
            let ch = this.text[i]
            let styles = getStylesAtOffset(i)

            if (stylesEqual(currentNode.styles, styles)) {
                currentNode.end = i
                currentNode.text += ch
                continue
            }

            nodes.push(currentNode)
            currentNode = {
                styles,
                text: ch,
                start: i,
                end: i + 1
            }
        }
        nodes.push(currentNode)

        for (let node of nodes) {
            let start = node.styles
                .map(styleName => this.styles[styleName].openTag)
                .join('')
            let end = node.styles
                .map(styleName => this.styles[styleName].closeTag)
                .join('')

            result += start + node.text + end
        }

        result = result.replace(/\n/gm, '<br/>')

        return result
    }
}
