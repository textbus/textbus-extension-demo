import {
  ComponentInitData,
  ComponentInstance,
  ComponentExtends,
  ContentType,
  defineComponent,
  onContextMenu,
  onDestroy,
  Slot,
  SlotRender,
  useSlots, useState,
  VElement
} from '@textbus/core'
import { ComponentLoader, SlotParser } from '@textbus/platform-browser'
import { Injector } from '@tanbo/di'

export interface GridState {
  cols: number
}

export const gridComponent = defineComponent<ComponentExtends, GridState>({
  name: 'GridComponent',
  type: ContentType.BlockComponent,
  setup(data: ComponentInitData<GridState>): ComponentExtends {
    let state = data.state!
    const stateController = useState(state)
    const subscription = stateController.onChange.subscribe(newState => {
      state = newState
    })

    onDestroy(() => {
      subscription.unsubscribe()
    })

    const slots = useSlots(data.slots!)

    onContextMenu(() => {
      return [{
        label: '添加一行',
        onClick() {
          addRow()
        }
      }]
    })

    function addRow() {
      const cells: Slot[] = []
      for (let i = 0; i < data.state!.cols; i++) {
        cells.push(new Slot([
          ContentType.Text
        ]))
      }
      slots.push(...cells)
    }

    function changeColumnCount(count: number) {
      stateController.update(draft => {
        draft.cols = count
      })
    }

    function toGrid() {
      const cells = slots.toArray()
      const grid: Slot[][] = []

      for (let i = 0; i < cells.length; i += state.cols) {
        grid.push(cells.slice(i, i + state.cols))
      }
      return grid
    }

    return {
      render(isOutputMode: boolean, slotRender: SlotRender): VElement {
        const grid = toGrid()
        if (isOutputMode) {
          return (
            <div class="grid" data-cols={state.cols}>
              {
                grid.map(row => {
                  return (
                    <div class="grid-group">
                      {
                        row.map(slot => {
                          return slotRender(slot, children => {
                            return <div class="grid-cell">{children}</div>
                          })
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
          )
        }
        return (
          <div class="grid" data-cols={state.cols}>
            <div>
              <p>fdsafdsafdsa</p>
              <button type="button" onClick={addRow}>添加一行</button>
              <button type="button" onClick={() => {
                changeColumnCount(5)
              }}>变成 5 列</button>
            </div>
            {
              grid.map(row => {
                return (
                  <div class="grid-group">
                    {
                      row.map(slot => {
                        return slotRender(slot, () => {
                          return <div class="grid-cell"/>
                        })
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

export const gridComponentLoader: ComponentLoader = {
  resources: {
    styles: [
      `.grid {
    }

    .grid-group {
        display: flex;
    }

    .grid-cell {
        border: 1px solid #ccc;
        flex: 1;
    }`
    ]
  },
  match(element: HTMLElement): boolean {
    return element.tagName.toLowerCase() === 'div' && element.className === 'grid'
  },
  read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {
    const cols = Number(element.dataset.cols)

    const cells = Array.from(element.children).map(row => {
      return Array.from(row.children).map(col => {
        const slot = new Slot([
          ContentType.Text
        ])
        return slotParser(slot, col as HTMLElement)
      })
    })

    return gridComponent.createInstance(context, {
      slots: cells.flat(),
      state: {
        cols
      }
    })
  }
}
