import { date } from 'quasar'

export default [
  {
    name: 'title',
    label: 'Название',
    width: 150
  },
  {
    name: 'room',
    label: 'Зал',
    width: 120
  },
  {
    name: 'amount',
    label: 'цена, ₽.',
    width: 120
  },
  {
    name: 'maxLimit',
    label: 'лимит',
    width: 120
  },
  {
    name: 'createdAt',
    label: 'Дата создания',
    format: value => date.formatDate(value, 'D MMMM YYYY h:mm'),
    width: 60
  },
  {
    name: 'extrasControls',
    width: 40,
    align: 'right'
  }
]
