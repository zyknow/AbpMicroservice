import { Notify, QNotifyCreateOptions } from 'quasar'

// TODO: edit BaseResult

class WindowNotify {
  /**
   * notify基础设置
   * @param msg
   * @returns
   */
  private baseNotify = (msg: string): QNotifyCreateOptions => {
    return {
      message: msg,
      position: 'top',
      group: false,
      timeout: 2500,
      color: 'white',
      classes: 'notify-caption-text' // 用于自定义样式
    }
  }

  info(msg: string, opt?: QNotifyCreateOptions) {
    const options: QNotifyCreateOptions = {
      icon: 'info',
      textColor: 'blue-10'
    }
    return Notify.create({ ...this.baseNotify(msg), ...options, ...opt })
  }

  error(msg: string, opt?: QNotifyCreateOptions) {
    const options: QNotifyCreateOptions = {
      icon: 'cancel',
      textColor: 'red-9'
    }
    return Notify.create({ ...this.baseNotify(msg), ...options, ...opt })
  }

  warn(msg: string, opt?: QNotifyCreateOptions) {
    const options: QNotifyCreateOptions = {
      icon: 'warning',
      textColor: 'orange-9'
    }
    return Notify.create({ ...this.baseNotify(msg), ...options, ...opt })
  }

  success(msg: string, opt?: QNotifyCreateOptions) {
    const options: QNotifyCreateOptions = {
      icon: 'check_circle',
      textColor: 'positive'
    }
    return Notify.create({ ...this.baseNotify(msg), ...options, ...opt })
  }
}

/**
 * 该接口会把提示信息转换成 I18n
 */
export const notify = new WindowNotify()
