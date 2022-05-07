import { ButtonTool } from '@textbus/editor'
import { Commander, ContentType, Selection, Slot } from '@textbus/core'
import { todolistComponent, TodolistState } from './todolist.component';

export function todolistTool() {
  return new ButtonTool(injector => {
    const commander = injector.get(Commander)
    const selection = injector.get(Selection)
    return {
      label: '插入 Todolist 组件',
      onClick() {
        const slot = new Slot<TodolistState>([
          ContentType.Text,
          ContentType.InlineComponent
        ], {
          complete: false
        })
        const component = todolistComponent.createInstance(injector, {
          slots: [slot]
        })
        commander.insert(component)
        selection.setPosition(slot, 0)
      }
    }
  })
}
