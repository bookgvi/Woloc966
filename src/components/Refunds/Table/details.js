import find from 'lodash/find'
import columns from './columns'

export default [
  {
    fields: [
      find(columns, { name: 'customer' }),
      {
        name: 'birthday',
        label: 'День рождения',
      },
      {
        name: 'phone',
        label: 'Телефон',
      },
      {
        name: 'email',
        label: 'Эл. почта',
      },
      {
        name: 'discount',
        label: 'Скидка',
      },
    ]
  },
]
