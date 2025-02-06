export const OVERRIDDEN_SERVER_NODES = new Map()

const registerNodeType = LiteGraph.registerNodeType
LiteGraph.registerNodeType = async (nodeId, baseClass) => registerNodeType.call(LiteGraph, nodeId, OVERRIDDEN_SERVER_NODES.get(baseClass) || baseClass)

export class DividerWidget { // Credit to rgthree
  options = { serialize: false }
  value = null
  name = "divider"

  widgetOptions = {
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 15,
    marginRight: 15,
    color: LiteGraph.WIDGET_OUTLINE_COLOR,
    thickness: 1
  }

  constructor(widgetOptions) {
    Object.assign(this.widgetOptions, widgetOptions || {})
  }

  draw(ctx, node, width, posY, h) {
    if (this.widgetOptions.thickness) {
      ctx.strokeStyle = this.widgetOptions.color
      const x = this.widgetOptions.marginLeft
      const y = posY + this.widgetOptions.marginTop
      const w = width - this.widgetOptions.marginLeft - this.widgetOptions.marginRight
      ctx.stroke(new Path2D(`M ${x} ${y} h ${w}`))
    }
  }

  computeSize(width) {
    return [
      width,
      this.widgetOptions.marginTop + this.widgetOptions.marginBottom + this.widgetOptions.thickness
    ]
  }
}
