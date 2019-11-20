const EVENT_TYPES = {
  photo: {
    name: 'Фотосъемка',
    value: 'photo',
    icon: 'camera_alt',
    price: 1200,
  },
  video: {
    name: 'Видеосъемка',
    value: 'video',
    icon: 'videocam',
    price: 1500
  },
  event: {
    name: 'Событие',
    value: 'event',
    icon: 'fas fa-calendar-day',
    price: 1300
  }
}

const BOOKING_STATUSES = {
  NEW: {
    value: 0, label: 'Ожидается оплата'
  },
  CANCELED: {
    value: 1, label: 'Отменено'
  },
  PAID: {
    value: 2, label: 'Забронировано'
  },
  DONE: {
    value: 3, label: 'Завершено'
  },
  EXPIRED: {
    value: 4, label: 'Просрочено'
  },
}

const REFUNDS_STATUSES = {
  NEW: {
    value: 0, label: 'Новый'
  },
  DONE: {
    value: 1, label: 'Возврат осуществлен'
  },
  CANCELED: {
    value: 2, label: 'Возврат отменен'
  },
  ACCEPTED: {
    value: 3, label: 'Ожидает зачисления'
  }
}

export { EVENT_TYPES, BOOKING_STATUSES, REFUNDS_STATUSES }
