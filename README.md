# @cookshack/codemirror-ruler

Ruler extension for [CodeMirror 6](https://codemirror.net/).

Draws a vertical line at a certain column.

## Options

| Name | Default |                                              |
|------|---------|----------------------------------------------|
| col  |     100 | The column at which the line will be drawn.  |

Use `.cm-ruler-w` to style the line.

## Example

```javascript
window.view = new EditorView({
  extensions: [ ruler({ col: 80 }), ...
```

```css
.cm-ruler-w > div.cm-ruler-vert {
  border-left-width: 2px;
  border-left-color: var(--clr-fill);
}
```

## Build from source

```
$ npm i # only needed first time
$ npm run prepare
```
