import {
  ComponentInstance,
  ComponentMethods,
  ContentType,
  defineComponent,
  Slot,
  SlotLiteral,
  SlotRender,
  Translator,
  useSlots,
  VElement
} from '@textbus/core'
import { ComponentLoader, SlotParser } from '@textbus/browser'
import { Injector } from '@tanbo/di'

export const alertComponent = defineComponent<ComponentMethods, SlotLiteral, Slot>({
  type: ContentType.BlockComponent,
  name: 'AlertComponent',
  transform(translator: Translator, state: SlotLiteral): Slot {
    return translator.createSlot(state)
  },
  setup(initState?: Slot): ComponentMethods {
    const slots = useSlots([
      initState || new Slot([
        ContentType.Text
      ])
    ], () => {
      return new Slot([
        ContentType.Text
      ])
    })

    return {
      render(isOutputMode: boolean, slotRender: SlotRender): VElement {
        return (
          <div class="alert">
            <div>这是 Alert 组件，这里的内容是不可以编辑的</div>
            {
              slotRender(slots.get(0)!, () => {
                return <div/>
              })
            }
          </div>
        )
      },
      toJSON(): any {
        return slots.get(0)!.toJSON()
      }
    }
  }
})

export const alertComponentLoader: ComponentLoader = {
  component: alertComponent,
  resources: {
    styles: [
      `.alert { border-radius: 3px; border: 1px solid #ccc; background: #eee; padding: 5px 15px}`
    ]
  },
  match(element: HTMLElement): boolean {
    return element.tagName.toLowerCase() === 'div' && element.className === 'alert'
  },
  read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {
    const slot = new Slot([
      ContentType.Text
    ])
    slotParser(slot, element.children[1]! as HTMLElement)
    return alertComponent.createInstance(context, slot)
  }
}
