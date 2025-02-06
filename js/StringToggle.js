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
    const [width,] = this.size
    Object.assign(this.addCustomWidget(new DividerWidget({ marginTop: 2, marginBottom: 2, thickness: 2 })), { id })
    Object.assign(this.addWidget('toggle', `append_${this.nameUniqueCounter}`, append, () => unit.enabled = !unit.enabled), { id })
    Object.assign(this.addWidget('text', `text_${this.nameUniqueCounter++}`, text), { id })
    this.units.push(unit)
    this.setSize([width, this.computeSize()[1]])
    return id
  }
  removeTextUnit(id) {
    this.units = this.units.filter(each => each.id !== id)
    this.widgets = this.widgets.filter(each => each.id !== id)
    this.setSize(this.size)
  }
}

app.registerExtension({
  name: "string-master.StringToggle",
  async beforeRegisterNodeDef(nodeType, nodeData) {
    if (nodeData.name === "String Toggle")
      OVERRIDDEN_SERVER_NODES.set(nodeType, upgradeNodeType(nodeType))
  }
})
