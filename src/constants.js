export const selectors = {
  EDITOR: 'EDITOR',
  EMAIL_BLOCK: 'EMAIL_BLOCK',
  EMAIL_BLOCK_CONTAINER: 'EMAIL_BLOCK_CONTAINER',
  EMAIL: 'EMAIL',
  ICON_REMOVE: 'ICON_REMOVE',
  INPUT: 'INPUT',
}

export const actions = {
  ACTION_REMOVE_EMAIL_BLOCK: 'ACTION_REMOVE_EMAIL_BLOCK',
}

export const styles = {
  [selectors.EDITOR]: 'emails-editor__editor',
  [selectors.EMAIL_BLOCK_CONTAINER]: 'emails-editor__email-block-container',
  [selectors.EMAIL_BLOCK]: 'emails-editor__email-block',
  [selectors.EMAIL]: 'emails-editor__email',
  [selectors.ICON_REMOVE]: 'emails-editor__icon-remove',
  [selectors.INPUT]: 'emails-editor__input',
}

export const keyCodes = {
  V: 86,
  ENTER: 13,
  COMMA: 188,
  BACKSPACE: 8,
}
