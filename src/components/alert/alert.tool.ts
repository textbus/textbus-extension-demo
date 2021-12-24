import { ButtonTool } from '@textbus/editor'
import { Commander, ContentType, Slot, TBSelection } from '@textbus/core'
import { alertComponent } from './alert.component'

export const alertTool = new ButtonTool(injector => {
  const commander = injector.get(Commander)
  const selection = injector.get(TBSelection)
  return {
    label: '插入 Alert 组件',
    onClick() {
      const slot = new Slot([
        ContentType.Text
      ])
      const component = alertComponent.createInstance(injector, slot)
      commander.insert(component)
      selection.setLocation(slot, 0)
    }
  }
})
