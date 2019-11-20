import { date } from 'quasar'

export default [
  {
    name: 'id',
    label: 'id',
    field: 'id',
    required: true,
    width: 50,
    active: false
  },
  {
    name: 'name',
    label: 'Название',
    field: 'name',
    width: 550,
    align: 'left',
    classes: 'text-primary'
  },
  {
    name: 'updatedAt',
    label: 'дата',
    width: 50,
    field: 'updatedAt',
    format: value => date.formatDate(value, 'D MMM')
  },
  {
    name: 'time',
    label: 'время',
    field: 'updatedAt',
    format: value => date.formatDate(value, 'H:mm')
  },
  {
    name: 'link',
    align: 'right',
    field: 'link'
  }
]
