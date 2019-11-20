import { date } from 'quasar'

export default [
  {
    name: 'id',
    label: 'Бронь',
    field: ({ booking = {} }) => booking.id,
    width: 70,
    classes: 'text-primary',
    align: 'right',
  },
  {
    name: 'customer',
    label: 'Клиент',
    field: ({ booking = {} }) => {
      const { customer } = booking
      if (!customer) {
        return
      }
      return `${customer.firstName} ${customer.lastName}`
    },
    width: 150,
  },
  {
    name: 'room',
    label: 'Зал',
    field: ({ booking: { room = {} } }) => room,
    width: 120
  },
  {
    name: 'reservedFrom',
    label: 'Дата',
    field: ({ booking = {} }) => `${booking.reservedFrom}`,
    format: value => date.formatDate(value, 'D MMM'),
    width: 60
  },
  {
    name: 'reservedTime',
    label: 'Время',
    field: ({ booking = {} }) => `${booking.reservedFrom}`,
    format: (value, { booking }) => [booking.reservedFrom, booking.reservedTo].map(
      part => date.formatDate(part, 'H:mm')
    ).join(' — '),
    width: 120,
  },
  {
    name: 'returnedAt',
    label: 'Просрочено',
    classes: 'text-red',
    format: value => date.formatDate(value, 'D MMM'),
    width: 120
  },
  {
    name: 'amount',
    label: 'Сумма, Р.',
    align: 'right',
    headerStyle: 'text-align: right;',
    width: 120
  },
  {
    name: 'refundStatus',
    field: 'status',
    label: 'Статус возврата',
    width: 250
  },
  {
    name: 'refundsControls',
    width: 40
  }
]
