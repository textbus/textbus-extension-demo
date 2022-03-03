import { ButtonTool } from '@textbus/editor'
import { Commander, ContentType, Selection, Slot } from '@textbus/core'
import { gridComponent } from './grid.component'

export function gridTool() {
  return new ButtonTool(injector => {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
      label: '插入 Grid 组件',
      onClick() {

        const slots = Array.from({length: 12}).fill(null).map(() => new Slot([ContentType.Text]))

        const component = gridComponent.createInstance(injector, {
          slots,
          state: {
            cols: 3
          }
        })
        commander.insert(component)
        console.log(selection)
      }
    }
  })
}
