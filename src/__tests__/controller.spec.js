import Controller from '../controllers'
import { Editor } from '../views'
import { selectors } from '../constants'

const emails = ['aa@aa.com', 'bb@bb.com', 'bbbaaa']
const html = Editor({ emails })
const container = document.createElement('div')

describe('UI controller', () => {
  it('Render method', () => {
    const rootController = new Controller(container)

    rootController.render(html)

    expect(container.hasChildNodes()).toBe(true)
  })

  describe('Check query methods', () => {
    let rootController = null

    beforeEach(() => {
      rootController = new Controller(container)

      rootController.render(html)
    })

    it('Get element by [data-selector]', () => {
      const editor = rootController.getChildBySelector(selectors.EDITOR)

      expect(editor instanceof HTMLDivElement).toBe(true)
    })

    it('Get list of elements by [data-selector]', () => {
      const allEmailBlocks = rootController.getArrayChildrenBySelector(selectors.EMAIL_BLOCK)

      expect(allEmailBlocks.length).toBe(3)
    })
  })
})
