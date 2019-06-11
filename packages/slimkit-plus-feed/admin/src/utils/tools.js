/**
 * 创建一个用于取消的错误对象.
 *
 * @param message
 * @return {Error}
 */
export const createCancel = (message = '') => {
  const cancel = new Error(message)
  cancel.__CANCEL__ = true
  cancel.name = 'Cancel'
  return cancel
}

export const isCanceled = value => !!(value && value.__CANCEL__)
