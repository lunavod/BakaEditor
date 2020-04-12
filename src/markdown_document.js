// @flow

import Document from './document'

export default class MarkdownDocument extends Document {
    // text = '```Hello, world!\nIts me, Dio!\n```'
    // text = '*Привет*, **мир**!\n\n***Сегодня*** __я__ ~~делаю~~ `маркдаун`!'

    // text = 'as\ndf'
    // text = '> Привет!\n> Мир!\nТест'
    // text = `*hello ~~world~~*`

    set styles(value: any) {}
    get styles() {
        let ranges: {
            [string]: [number, number][],
        } = {
            bold: [],
            italic: [],
            underline: [],
            strike: [],
            monospace: [],
            header_first: [],
            header_second: [],
            code: [],
            quote: [],
            service: [],
        }

        const process = (styleNames, regexp, n) => {
            this.text.replace(regexp, (fullMatch, match, index) => {
                let start = index + n
                let end = index + fullMatch.length - n
                for (let styleName of styleNames) {
                    ranges[styleName].push([start, end])
                }
                ranges.service.push([start - n, start])
                ranges.service.push([end, end + n])
                return match
            })
        }

        const processOneLine = (styleNames, regexp, n) => {
            this.text.replace(regexp, (fullMatch, match, index) => {
                let start = index
                let end = index + fullMatch.length
                for (let styleName of styleNames) {
                    ranges[styleName].push([start, end])
                }
                ranges.service.push([start, start + n])
                return match
            })
        }

        const processGroup = (styleNames, regexp, n) => {
            this.text.replace(regexp, (fullMatch, match, index) => {
                let start = index
                let end = index + fullMatch.length
                for (let styleName of styleNames) {
                    let prevIndex = ranges[styleName].findIndex(
                        (el) => el[1] + 1 === start
                    )
                    if (prevIndex < 0) {
                        ranges[styleName].push([start, end])
                        ranges.service.push([start, start + n])
                        continue
                    }
                    ranges[styleName].splice(prevIndex, 1, [
                        ranges[styleName][prevIndex][0],
                        end,
                    ])
                }
                ranges.service.push([start, start + n])
            })
        }

        process(
            ['bold'],
            /(?<!\*|\\\*)\*{2}[^*\n]([\s\S]+?)[^*]\*{2}(?!\*|\\)/gm,
            2
        )
        process(['italic'], /((?<!\*|\\)\*[^*\n][\s\S]+?[^*|\\]\*(?!\*))/gm, 1)
        process(
            ['bold', 'italic'],
            /(?<!\*|\\)\*{3}[^*\n]([\s\S]+?)[^*|\\]\*{3}(?!\*)/gm,
            3
        )

        process(['underline'], /__(.+?)__/gm, 2)
        process(['strike'], /~~(.+?)~~/gm, 2)

        process(['code'], /```([^`]+?)```/gm, 3)
        process(['quote'], /(?<!`|\\)``([^`]+?)``/gm, 2)
        process(['monospace'], /(?<!`|\\)`([^`\n\r]+?)`/gm, 1)

        processOneLine(['header_first'], /(?<!#)# ([^\r\n]+)/gm, 2)
        processOneLine(['header_second'], /## ([^\r\n]+)/gm, 3)

        // processGroup(['quote'], /> ([^\n\r]+)/gm, 2)

        return {
            bold: {
                openTag: '<b>',
                closeTag: '</b>',
                ranges: ranges.bold,
            },
            italic: {
                openTag: '<i>',
                closeTag: '</i>',
                ranges: ranges.italic,
            },
            underline: {
                openTag: '<u>',
                closeTag: '</u>',
                ranges: ranges.underline,
            },
            strike: {
                openTag: '<s>',
                closeTag: '</s>',
                ranges: ranges.strike,
            },
            monospace: {
                openTag: '<span class="monospace">',
                closeTag: '</span>',
                ranges: ranges.monospace,
            },
            code: {
                openTag: '<span class="code">',
                closeTag: '</span>',
                ranges: ranges.code,
            },
            header_first: {
                openTag: '<h1>',
                closeTag: '</h1>',
                ranges: ranges.header_first,
            },
            header_second: {
                openTag: '<h2>',
                closeTag: '</h2>',
                ranges: ranges.header_second,
            },
            quote: {
                openTag: '<blockquote>',
                closeTag: '</blockquote>',
                ranges: ranges.quote,
            },
            service: {
                openTag: '<span class="service">',
                closeTag: '</span>',
                ranges: ranges.service,
            },
        }
    }

    getStylesAtOffset(offset: number) {
        let styles: {
            [string]: [number, number],
        } = {}
        for (let styleName in this.styles) {
            for (let i = 0; i < this.styles[styleName].ranges.length; i++) {
                let range = this.styles[styleName].ranges[i]
                if (!(range[0] <= offset && range[1] >= offset)) continue
                styles[styleName] = range
            }
        }
        return styles
    }

    getStylesAtRange(start: number, end: number) {
        let styles: string[] = []
        for (let styleName in this.styles) {
            for (let i = 0; i < this.styles[styleName].ranges.length; i++) {
                let range: [number, number] = this.styles[styleName].ranges[i]
                if (
                    !(
                        (
                            (range[0] >= start && range[0] <= end) || // Начало в выделении
                            (range[1] >= start && range[1] <= end) || // Конец в выделении
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

    getFinalHtml() {
        let html = this.toHtml()
        html = html.replace(/\n/gm, '').replace(/\r/gm, '')
        return html.replace(/<span class="service">(.+?)<\/span>/gm, '')
    }
}
