import find from 'lodash/find'
import columns from './columns'
import { EVENT_TYPES } from 'src/common/constants'

export default [
  {
    fields: [
      {
        name: 'room',
        label: 'Зал',
        field: ({ room = {} }) => room.name,
      },
      find(columns, { name: 'date' }),
      find(columns, { name: 'time' }),
      {
        ...find(columns, { name: 'eventType' }),
        format: (value) => value && EVENT_TYPES[value].name
      },
      {
        ...find(columns, { name: 'guestsCount' }),
        label: 'Количество гостей'
      }
    ]
  },
  {
    name: 'Данные клиента',
    fields: [
      {
        ...find(columns, { name: 'customer' }),
        name: 'customerName',
        label: 'Имя'
      },
      {
        name: 'customerPhone',
        label: 'Телефон',
        field: ({ customer = {} }) => customer.phone
      },
      {
        name: 'customerEmail',
        label: 'Эл. почта',
        field: ({ customer = {} }) => customer.email
      },
    ]
  },
]
