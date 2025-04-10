import { app } from "../../scripts/app.js"
import { DividerWidget } from "./common.js"
import { OVERRIDDEN_SERVER_NODES } from './common.js'

const upgradeNodeType = (nodeType) => class extends nodeType {
  constructor() {
    super(...arguments)
    this.units = []
    this.nameUniqueCounter = 0
    this.addWidget('button', 'Add', null, () => this.addTextUnit())
    this.addWidget('button', 'Remove', null, () => this.removeTextUnit(this.units.pop()?.id))
  }
  configure(info) {
    super.configure(info)
    const { widgets_values } = info
    const units_values = widgets_values.slice(3)
    units_values.filter((each, index) => {
      if (typeof each !== 'string') return
      this.addTextUnit(each, units_values[index-1] ?? true)
    })
  }
  addTextUnit(text='', append=true) {
    const id = Symbol()
    const unit = { id, enabled: true, text }
    const [width, height] = this.size
    Object.assign(this.addCustomWidget(new DividerWidget({ marginTop: 2, marginBottom: 2, thickness: 2 })), { unitId: id })
    Object.assign(this.addWidget('toggle', `append_${this.nameUniqueCounter}`, append, () => unit.enabled = !unit.enabled), { unitId: id })
    Object.assign(app.widgets.STRING(this, `text_${this.nameUniqueCounter++}`, [ 'STRING', { default: unit.text, isOptional: false, multiline: true } ], app).widget, { unitId: id, isDOMWidget: true })
    this.units.push(unit)
    this.setSize([width, height])
    return id
  }
  removeTextUnit(id) {
    this.units = this.units.filter(each => each.unitId !== id)
    this.widgets = this.widgets.filter(each => {
      if (each.unitId === id) {
        if (each.isDOMWidget) each.element.remove()
      } else return true
    })
    this.setSize(this.size)
  }
}

app.registerExtension({
  name: "string-master.StringToggleMultiline",
  async beforeRegisterNodeDef(nodeType, nodeData) {
    if (nodeData.name === "String Toggle (Multiline)")
      OVERRIDDEN_SERVER_NODES.set(nodeType, upgradeNodeType(nodeType))
  }
})
