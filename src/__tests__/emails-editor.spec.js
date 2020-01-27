import EmailsEditor from '../index'
import Controller from '../controllers'
import { Editor } from '../views'
import { selectors, actions, keyCodes } from '../constants'

describe('EmailsEditor', () => {
  let emails = []
  let events = []
  let emailsEditor = null

  const container = document.createElement('div')

  beforeEach(() => {
    emails = ['aa@aa.com', 'bb@bb.com', 'bbbaaa']
    container.addEventListener = jest.fn((event, cb) => {
      events[event] = cb
    })

    emailsEditor = EmailsEditor({ container })
  })

  describe('Check public methods', () => {
    it('get/set methods ', () => {
      emailsEditor.setEmails(emails)

      expect(emailsEditor.getEmails()).toEqual(emails)
    })

    it('pub/sub methods', () => {
      const subscriber = jest.fn(emails => emails.length)
      emailsEditor.subscribe(subscriber)
      emailsEditor.setEmails(emails)

      expect(subscriber.mock.calls.length).toBe(1)
      expect(subscriber.mock.results[0].value).toBe(emails.length)

      emailsEditor.unsubscribe(subscriber)
      emailsEditor.setEmails(emails)

      expect(subscriber.mock.calls.length).toBe(1)
    })
  })

  describe('Check events', () => {
    let rootController = null

    beforeEach(() => {
      const html = Editor({ emails: emails })

      rootController = new Controller(container)
      rootController.render(html)
    })

    it('Create email block by losing focus', () => {
      const email = 'email@email.com'

      events.blur({
        target: {
          value: email,
          dataset: {
            selector: selectors.INPUT,
          },
        },
      })

      expect(emailsEditor.getEmails()).toEqual([email])
    })

    it('Create email block by press comma', () => {
      const email = 'email@email.com'

      events.keydown({
        keyCode: keyCodes.COMMA,
        target: {
          value: email,
        },
      })

      expect(emailsEditor.getEmails()).toEqual([email])
    })

    it('Create email block by press Enter/Return', () => {
      const email = 'email@email.com'

      events.keydown({
        keyCode: keyCodes.ENTER,
        target: {
          value: email,
        },
      })

      expect(emailsEditor.getEmails()).toEqual([email])
    })

    it('Delete last email block', () => {
      const email = 'email@email.com'

      emailsEditor.setEmails(email)

      events.keydown({
        keyCode: keyCodes.BACKSPACE,
        target: {
          value: '',
        },
      })

      expect(emailsEditor.getEmails()).toEqual([])
    })

    it('Delete email block by index', () => {
      emailsEditor.setEmails(emails)

      events.click({
        target: {
          dataset: {
            bind: 1,
            action: actions.ACTION_REMOVE_EMAIL_BLOCK,
          },
        },
      })

      emails.splice(1, 1)

      expect(emailsEditor.getEmails().length).toEqual(2)
      expect(emailsEditor.getEmails()).toEqual(emails)
    })

    it('Create email block by ctrl+v', done => {
      const str = 'email1, email2,email3,,,'

      global.navigator.clipboard = {
        readText: jest.fn().mockResolvedValue(str),
      }

      events.keydown({
        keyCode: keyCodes.V,
        ctrlKey: true,
        target: {
          value: '',
        },
      })

      setTimeout(() => {
        expect(emailsEditor.getEmails().length).toEqual(3)
        done()
      }, 0)
    })
  })
})
