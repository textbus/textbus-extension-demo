import {
  ComponentInstance,
  ComponentMethods,
  ContentType,
  defineComponent, onContextMenu,
  Slot,
  SlotLiteral,
  SlotRender,
  Translator,
  useContext,
  useSlots,
  VElement
} from '@textbus/core'
import { ComponentLoader, SlotParser } from '@textbus/browser'
import { Injector } from '@tanbo/di'

export interface GridState {
  rows: number
  cols: number
  cells: SlotLiteral[][]
}

export interface GridData {
  rows: number
  cols: number
  cells: Slot[][]
}

export const gridComponent = defineComponent<ComponentMethods, GridState, GridData>({
  name: 'GridComponent',
  type: ContentType.BlockComponent,
  transform(translator: Translator, state: GridState): GridData {
    return {
      ...state,
      cells: state.cells.map(row => {
        return row.map(slotLiteral => {
          return translator.createSlot(slotLiteral)
        })
      })
    }
  },
  setup(initData: GridData): ComponentMethods {

    const context = useContext()

    const translator = context.get(Translator)

    const slots = useSlots(initData.cells.flat(), state => {
      return translator.createSlot(state)
    })

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
      for (let i = 0; i < initData.cols; i++) {
        cells.push(new Slot([
          ContentType.Text
        ]))
      }
      initData.cells.push(cells)
      slots.push(...cells)
    }

    return {
      render(isOutputMode: boolean, slotRender: SlotRender): VElement {
        if (isOutputMode) {
          return (
            <div class="grid" data-group={initData.rows} data-cols={initData.cols}>
              {
                initData.cells.map(row => {
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
        return (
          <div class="grid" data-group={initData.rows} data-cols={initData.cols}>
            <div>
              <button type="button" onClick={addRow}>添加一行</button>
            </div>
            {
              initData.cells.map(row => {
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
      },
      toJSON(): GridState {
        return {
          ...initData,
          cells: initData.cells.map(row => {
            return row.map(slot => {
              return slot.toJSON()
            })
          })
        }
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
  component: gridComponent,
  match(element: HTMLElement): boolean {
    return element.tagName.toLowerCase() === 'div' && element.className === 'grid'
  },
  read(element: HTMLElement, context: Injector, slotParser: SlotParser): ComponentInstance {
    const rowSize = Number(element.dataset.group)
    const colSize = Number(element.dataset.cols)

    const cells = Array.from(element.children).map(row => {
      return Array.from(row.children).map(col => {
        const slot = new Slot([
          ContentType.Text
        ])
        return slotParser(slot, col as HTMLElement)
      })
    })

    return gridComponent.createInstance(context, {
      rows: rowSize,
      cols: colSize,
      cells
    })
  }
}
