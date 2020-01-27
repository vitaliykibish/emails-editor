import './styles.css'

import { selectors, actions, keyCodes, styles } from './constants'
import { splitStringByComma } from './utils'
import { Editor, EmailBlock } from './views'

import Controller from './controllers'

const EmailsEditor = ({ container, placeholder }) => {
  // todo: check performance with mulity editors

  if (!(container instanceof HTMLDivElement)) {
    throw new Error({ message: 'EmailsEditor requiries container id' })
  }

  let subscribers = []
  const emailsList = []
  const rootController = new Controller(container)

  const getEmails = () => {
    return [...emailsList]
  }

  const setEmails = emails => {
    if (!emails || (emails && !emails.length)) {
      return
    }

    if (typeof emails === 'string') {
      if (!emailsList.includes(emails)) {
        emailsList.push(emails)
      }
    }

    if (Array.isArray(emails)) {
      emails.forEach(email => {
        if (!emailsList.includes(email)) {
          emailsList.push(email)
        }
      })
    }

    updateEmailBlocks(emailsList)
    updatePlaceholder()
    publish()

    resetInput()
    scrollDown()
  }

  const subscribe = callback => {
    if (!subscribers.includes(callback)) {
      subscribers.push(callback)
    }
  }

  const publish = () => {
    const emails = getEmails()

    subscribers.forEach(callback => {
      if (typeof callback === 'function') {
        callback(emails)
      }
    })
  }

  const unsubscribe = callback => {
    subscribers = subscribers.filter(cb => cb !== callback)
  }

  const removeEmailByIndex = index => {
    emailsList.splice(index, 1)

    updateEmailBlocks(emailsList)
    updatePlaceholder()
    publish()
  }

  // Render UI
  //
  //

  const renderEditor = () => {
    const html = Editor({
      placeholder,
      emails: emailsList,
    })

    rootController.render(html)
  }

  const updatePlaceholder = () => {
    const inputNode = rootController.getChildBySelector(selectors.INPUT)

    inputNode.placeholder = !emailsList.length ? placeholder : ''
  }

  const resetInput = () => {
    const inputNode = rootController.getChildBySelector(selectors.INPUT)

    inputNode.value = ''
    inputNode.focus()
  }

  const scrollDown = () => {
    const editorNode = rootController.getChildBySelector(selectors.EDITOR)

    if (editorNode.scrollBy) {
      editorNode.scrollBy(0, editorNode.scrollHeight)
    }
  }

  const updateEmailBlocks = emails => {
    const editorNode = rootController.getChildBySelector(selectors.EDITOR)
    const inputNode = rootController.getChildBySelector(selectors.INPUT)
    const allEmailBlocks = rootController.getArrayChildrenBySelector(
      selectors.EMAIL_BLOCK_CONTAINER,
    )

    // remove old email blocks
    allEmailBlocks.forEach(child => {
      editorNode.removeChild(child)
    })

    // create new list of email blocks
    emails.forEach((email, index) => {
      const element = document.createElement('div')

      element.dataset.selector = selectors.EMAIL_BLOCK_CONTAINER
      element.classList.add(styles.EMAIL_BLOCK_CONTAINER)
      element.innerHTML = EmailBlock({ email, index })

      editorNode.insertBefore(element, inputNode)
    })
  }

  // Event listeners
  //
  //
  const listenEvents = () => {
    rootController.addEvent('click', ({ target }) => {
      const dataset = target.dataset

      if (dataset.action === actions.ACTION_REMOVE_EMAIL_BLOCK) {
        return removeEmailByIndex(dataset.bind)
      }

      resetInput()
      scrollDown()
    })

    rootController.addEvent('input', ({ target }) => {
      target.value = target.value.replace(',', '')
    })

    rootController.addEvent('blur', ({ target }) => {
      const value = target.value.trim()
      const dataset = target.dataset

      if (dataset.selector === selectors.INPUT) {
        setEmails(value)
      }
    })

    rootController.addEvent('keydown', e => {
      const value = e.target.value.trim()

      if (e.keyCode === keyCodes.COMMA) {
        setEmails(value)
      }

      if (e.keyCode === keyCodes.BACKSPACE && !value) {
        removeEmailByIndex(-1)
      }

      if (e.keyCode === keyCodes.ENTER) {
        setEmails(value)
      }

      if (e.keyCode === keyCodes.V && (e.ctrlKey || e.metaKey)) {
        navigator.clipboard
          .readText()
          .then(splitStringByComma)
          .then(setEmails)
      }
    })
  }

  renderEditor()
  listenEvents()

  return {
    getEmails,
    setEmails,
    subscribe,
    unsubscribe,
  }
}

global.EmailsEditor = EmailsEditor
export default EmailsEditor
