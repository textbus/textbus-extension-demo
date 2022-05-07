import {
  ComponentData,
  ComponentInstance,
  ContentType,
  defineComponent, onEnter,
  Slot, SlotRender, useContext,
  useSlots,
  VElement,
  Selection, useSelf, Commander
} from '@textbus/core';
import { ComponentLoader, SlotParser } from '@textbus/browser';
import { Injector } from '@tanbo/di';
import './todolist.component.scss'
import { paragraphComponent } from '@textbus/editor';


export interface TodolistState {
  complete: boolean
}

export const todolistComponent = defineComponent({
  type: ContentType.BlockComponent,
  name: 'TodolistComponent',
  setup(initData?: ComponentData<void, TodolistState>) {
    const slots = useSlots<TodolistState>(initData?.slots || [new Slot([
      ContentType.InlineComponent,
      ContentType.Text
    ], {
      complete: false
    })])

    const self = useSelf()

    slots.onChildSlotChange.subscribe(() => {
      self.changeMarker.forceMarkDirtied()
    })

    const injector = useContext()
    const selection = injector.get(Selection)
    const commander = injector.get(Commander)

    onEnter(ev => {
      const slot = ev.target
      const index = ev.data.index
      ev.preventDefault()
      if (slot.isEmpty && index === 0 && slots.length > 1 && slot === slots.last) {
        const p = paragraphComponent.createInstance(injector)
        commander.insertAfter(p, self)
        slots.remove(slot)
        const firstSlot = p.slots.get(0)!
        selection.setPosition(firstSlot, 0)
      } else {
        const nextSlot = slot.cut(index)
        slots.insertAfter(nextSlot, slot)
        selection.setPosition(nextSlot, 0)
      }
    })

    return {
      render(isOutputMode: boolean, slotRender: SlotRender) {
        return (
          <div class="todolist" componnet-name="TodolistComponent">
            {
              slots.toArray().map(slot => {
                return (
                  <div class="todolist-item">
                    <div class="todolist-ctrl">
                      <div class={slot.state.complete ? 'active' : ''} onClick={() => {
                        slot.updateState(draft => {
                          draft.complete = !slot.state.complete
                        })
                      }}>
                      </div>
                    </div>
                    {
                      slotRender(slot, () => {
                        return <div class="todolist-content" style={{
                          color: (slot.state as TodolistState).complete ? '#ccc' : ''
                        }}/>
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        )
      }
    }
  }
})

export const todolistComponentLoader: ComponentLoader = {
  component: todolistComponent,
  match(element: HTMLElement): boolean {
    return element.tagName.toLowerCase() === 'div' && element.getAttribute('component-name') === 'TodolistComponent'
  },
  read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {
    const component = todolistComponent.createInstance(context, {
      slots: Array.from(element.children).map(child => {
        const slot = new Slot([
          ContentType.Text,
          ContentType.InlineComponent
        ], {
          complete: false
        })
        slotParser(slot, child.children[1] as HTMLElement)
        return slot
      })
    })
    return component
  }
}
