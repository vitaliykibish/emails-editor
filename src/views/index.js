import { styles, actions, selectors } from '../constants'
import { validate } from '../utils'

export const Editor = ({ emails, placeholder }) => {
  const emailsHTML = emails.map((email, index) => EmailBlock({ email, index }))

  return `
    <div 
      class="${styles.EDITOR}" 
      data-selector="${selectors.EDITOR}"
    >
      ${emailsHTML}
      <input
        size="1"
        type="text"
        class="${styles.INPUT}"
        data-selector="${selectors.INPUT}"
        placeholder="${placeholder || ''}"
      />
    </div>
  `
}

export const EmailBlock = ({ email, index }) => {
  const { value, valid } = validate(email)
  const invalidClassName = !valid ? styles.EMAIL_BLOCK + '--invalid' : ''

  return `
    <div 
      class="${styles.EMAIL_BLOCK} ${invalidClassName}"
      data-selector="${selectors.EMAIL_BLOCK}"
    >
      <span class="${styles.EMAIL}">
        ${value}
      </span>
      <i 
        class="${styles.ICON_REMOVE}" 
        data-bind="${index}" 
        data-action="${actions.ACTION_REMOVE_EMAIL_BLOCK}"
      ></i>
    </div>
  `
}
