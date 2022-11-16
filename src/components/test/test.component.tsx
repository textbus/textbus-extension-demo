import {
  ComponentInitData,
  ComponentInstance,
  ContentType,
  defineComponent,
  useSelf,
  useState,
  VElement
} from '@textbus/core';
import { ComponentLoader } from '@textbus/platform-browser';
import { Injector } from '@tanbo/di'

export interface TestComponentState {
  borderColor: string
}

export const testComponent = defineComponent({
  type: ContentType.BlockComponent,
  name: 'TestComponent',
  setup(initData: ComponentInitData<TestComponentState>) {

    let state = {
      borderColor: initData.state!.borderColor
    }

    const self = useSelf()

    const stateController = useState(state)

    stateController.onChange.subscribe(newState => {
      state = newState
    })

    let isRed = true

    let size = 0

    const timer = setInterval(() => {
      console.log(size)
      if (size === 5) {
        clearInterval(timer)
      }
      size++
      self.changeMarker.forceMarkDirtied()
    }, 1000)

    return {
      render(): VElement {
        return (
          <div data-color={state.borderColor} style={{
            border: `2px solid ${state.borderColor}`
          }} component-name="TestComponent">
            <div>
              <button type="button" onClick={() => {
                stateController.update(draft => {
                  draft.borderColor = isRed ? '#00f' : '#f00'
                  isRed = !isRed
                })
                console.log(self.toJSON())
              }}>切换颜色
              </button>
            </div>
            <div>这是 TestComponent 组件， size = {size}</div>
          </div>
        )
      }
    }
  }
})

export const testComponentLoader: ComponentLoader = {
  match(element: HTMLElement): boolean {
    return element.tagName === 'DIV' && element.getAttribute('component-name') === 'TestComponent'
  },
  read(element: HTMLElement, context: Injector): ComponentInstance {
    return testComponent.createInstance(context, {
      state: {
        borderColor: element.dataset.color!
      }
    })
  }
}
