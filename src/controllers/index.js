class Controller {
  container = null

  constructor(container) {
    this.container = container
  }

  getArrayChildrenBySelector = selector => {
    const nodeList = this.container.querySelectorAll(`[data-selector="${selector}"`)

    return [...nodeList]
  }

  getChildBySelector = selector => {
    const node = this.container.querySelector(`[data-selector="${selector}"`)

    return node
  }

  addEvent = (type, handle) => {
    this.container.addEventListener(type, handle, true)
  }

  removeEvent = (type, handle) => {
    this.container.removeEventListener(type, handle)
  }

  render = html => {
    this.container.innerHTML = html
  }
}

export default Controller
