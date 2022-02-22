import { ButtonTool } from '@textbus/editor'
import { Commander, ContentType, Slot, Selection } from '@textbus/core'
import { gridComponent } from './grid.component'

export function gridTool() {
  return new ButtonTool(injector => {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
      label: '插入 Grid 组件',
      onClick() {

        const cells: Slot[][] = []
        const rows = 3
        const cols = 4

        for (let i = 0; i < rows; i++) {
          const row: Slot[] = []
          for (let j = 0; j < cols; j++) {
            row.push(new Slot([
              ContentType.Text
            ]))
          }
          cells.push(row)
        }

        const component = gridComponent.createInstance(injector, {
          rows,
          cols,
          cells
        })
        commander.insert(component)
        console.log(selection)
      }
    }
  })
}
