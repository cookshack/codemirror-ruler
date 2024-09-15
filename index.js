import { ViewPlugin } from '@codemirror/view'

let show

function Ruler
(view) {
  let ruler, w, el, col

  function update
  () {
    let gutter

    gutter = view.contentDOM.getBoundingClientRect().x - view.dom.getBoundingClientRect().x
    el.style.left = ((col * view.defaultCharacterWidth) + gutter) + 'px'
  }

  col = 100

  w = globalThis.document.createElement('div')
  w.classList.add('cm-ruler-w')
  w.style.cssText = 'pointer-events: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;'

  el = globalThis.document.createElement('div')
  el.classList.add('cm-ruler-vert')
  el.style.cssText = 'position: absolute; top: 0; height: 100%; width: 1px; border-left: 1px solid red;'

  w.appendChild(el)
  view.dom.appendChild(w)
  update()

  ruler = { update }

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
      this.ruler.update()
  }
}

show = ViewPlugin.fromClass(Plugin)

export
function ruler
() {
  return show
}