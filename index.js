import { ViewPlugin, EditorView } from '@codemirror/view'
import { Facet } from "@codemirror/state"

let plugin
export let optCol, theme

theme = EditorView.baseTheme({ '.cm-ruler-w': { pointerEvents: 'none',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                height: '100%',
                                                width: '100%',
                                                overflow: 'hidden' },
                               '.cm-ruler-vert': { position: 'absolute',
                                                   top: 0,
                                                   height: '100%',
                                                   width: '1px',
                                                   borderLeft: '1px solid' } })

optCol = Facet.define({ combine: values => values.length ? Math.min(...values) : 100 })

function Ruler
(view) {
  let ruler, w, el, col

  function update
  () {
    let gutter, pad, line

    gutter = view.contentDOM.getBoundingClientRect().x - view.dom.getBoundingClientRect().x
    pad = 0
    line = view.contentDOM.querySelector('.cm-line')
    if (line)
      pad = parseFloat(globalThis.window.getComputedStyle(line).getPropertyValue('padding-left'))

    el.style.left = ((col * view.defaultCharacterWidth) + gutter + pad) + 'px'
  }

  function free
  () {
    w.remove()
  }

  col = view.state.facet(optCol)

  w = globalThis.document.createElement('div')
  w.classList.add('cm-ruler-w')

  el = globalThis.document.createElement('div')
  el.classList.add('cm-ruler-vert')

  w.appendChild(el)
  view.dom.appendChild(w)
  update()

  ruler = { update,
            free }

  return ruler
}

class Plugin {
  constructor
  (view) {
    this.ruler = Ruler(view)
  }

  update
  (update) {
    if (update.viewportChanged)
      this.ruler?.update()
  }

  destroy
  () {
    this.ruler?.free()
  }
}

plugin = ViewPlugin.fromClass(Plugin)

export
function ruler
(opts) {
  opts = opts || {}
  return [ theme,
           opts.col == null ? [] : optCol.of(opts.col),
           plugin ]
}
