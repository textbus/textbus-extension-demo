import {
  Commander,
  ContentType,
  defineComponent,
  onBreak,
  Selection,
  Slot,
  SlotRender,
  useContext, useDynamicShortcut,
  useSlots
} from '@textbus/core';

export const todolist2Component = defineComponent({
  type: ContentType.BlockComponent,
  name: 'Todolist2Component',
  setup() {
    const selection = useContext(Selection)
    const commander = useContext(Commander)
    const slots = useSlots([
      new Slot([
        ContentType.Text
      ], {
        complete: false
      })
    ])
    onBreak(event => {
      event.preventDefault()
      const newSlot = new Slot([
        ContentType.Text
      ], {
        complete: false
      })
      slots.insertAfter(newSlot, event.target)
      selection.setPosition(newSlot, 0)
    })
    useDynamicShortcut({
      keymap: {
        key: ['Tab']
      },
      action(): boolean | void {
        // selection.startSlot!.insert('    ')
        // selection.setPosition(selection.startSlot!, selection.startOffset! + 4)
        console.log('============')
        commander.insert('    ')
        // setInterval(() => {
        //   commander.delete()
        // }, 1000)
      }
    })
    return {
      render(slotRender: SlotRender) {
        return (
          <div style={{
            background: '#ccc',
            padding: '3px',
            borderRadius: '3px'
          }}>{
            slots.toArray().map(slot => {
              return (
                <div style={{
                  display: 'flex'
                }}>
                  <button style={{
                    background: slot.state?.complete ? 'blue' : '#ccc'
                  }} type="button" onClick={() => {
                    slot.updateState(draft => {
                      draft.complete = !draft.complete
                    })
                  }}>button
                  </button>
                  {
                    slotRender(slot, children => {
                      return <div style={{ paddingLeft: '10px', flex: 1 }}>{children}</div>
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
