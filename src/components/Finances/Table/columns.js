import { date } from 'quasar'

export default [
  {
    name: 'purpose',
    field: ({ purpose } = {}) => purpose.name,
    label: 'Описание',
    align: 'right',
    width: 100
  },
  {
    name: 'purposeComment',
    field: 'comment',
    align: 'left',
    width: 250
  },
  {
    name: 'booking_id',
    label: 'ID брони',
    headerStyle: 'text-align: center;',
    align: 'center',
    field: ({ booking = {} }) => {
      if (!booking) { return '—' }
      return booking.id
    },
  },
  {
    name: 'createdAtDay',
    label: 'дата',
    field: 'createdAt',
    format: value => date.formatDate(value, 'D MMM'),
  },
  {
    name: 'createdAtTime',
    label: 'время',
    field: 'createdAt',
    format: value => date.formatDate(value, 'H:mm'),
  },
  {
    name: 'amount',
    label: 'Сумма, ₽',
    field: ({ amount, purpose } = {}) => {
      if (purpose.id === 8 || purpose.id === 11) {
        amount = '—'
      } else {
        amount = `${amount} ₽`
      }
      return amount
    },
    headerStyle: 'text-align: right;',
    align: 'right'
  },
  {
    name: 'commission',
    label: 'Комиссия, ₽',
    field: ({ commission, amount, purpose } = {}) => {
      if (!commission) {
        commission = '—'
      }
      return `${commission} ₽`
    },
    align: 'right',
    width: 9
  },
  {
    name: 'balance',
    label: 'остаток, ₽',
    field: ({ balance } = {}) => `${balance} ₽`,
    align: 'right',
    width: 25
  }
]
