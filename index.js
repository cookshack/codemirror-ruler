import { ViewPlugin } from '@codemirror/view'

let show

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

  col = 100

  w = globalThis.document.createElement('div')
  w.classList.add('cm-ruler-w')
  w.style.cssText = 'pointer-events: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;'

  el = globalThis.document.createElement('div')
  el.classList.add('cm-ruler-vert')
  el.style.cssText = 'position: absolute; top: 0; height: 100%; width: 1px; border-left: 1px solid;'

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

show = ViewPlugin.fromClass(Plugin)

export
function ruler
() {
  return show
}
