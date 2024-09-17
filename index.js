import { ViewPlugin, EditorView } from '@codemirror/view'

let theme

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

export
function make
(view, opts) {
  let plugin, exts, ruler, w, el

  class Plugin {
    constructor
    () {
    }

    update
    (update) {
      if (ruler && update.viewportChanged)
        ruler.update()
    }

    destroy
    () {
      ruler.free()
    }
  }

  function update
  () {
    let gutter, pad, line, col

    col = opts.col ?? 100
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
    ruler = null
  }

  function set
  (name, val) {
    if (name == 'col') {
      opts.col = val
      update()
    }
  }

  w = globalThis.document.createElement('div')
  w.classList.add('cm-ruler-w')

  el = globalThis.document.createElement('div')
  el.classList.add('cm-ruler-vert')

  w.appendChild(el)
  view.dom.appendChild(w)

  plugin = ViewPlugin.fromClass(Plugin)
  exts = [ theme,
           plugin ]

  ruler = { get exts() {
    return exts
  },
            //
            free,
            set,
            update
  }

  ruler.update()
  return ruler
}
