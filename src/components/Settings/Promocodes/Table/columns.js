import { date } from 'quasar'

export default [
  {
    name: 'alias',
    label: 'промокод',
    active: true,
    isPromocode: true
  },
  {
    name: 'discount',
    label: 'скидка',
    align: 'right',
    width: 100,
    active: true,
    isPromocode: true
  },
  {
    name: 'room',
    label: 'Зал',
    active: true,
    isPromocode: true
  },
  {
    name: 'minPrice',
    label: 'Мин. заказ, ₽.',
    align: 'right',
    width: 100,
    active: true,
    isPromocode: true
  },
  {
    name: 'isPublic',
    label: 'статус',
    active: true,
    isPromocode: true
  },
  {
    name: 'createdAt',
    label: 'Дата создания',
    format: value => date.formatDate(value, 'D MMMM YYYY в h:mm'),
    active: true,
    isPromocode: true
  },
  {
    name: 'expiredAt',
    label: 'Активен до',
    format: value => date.formatDate(value, 'D MMMM'),
    active: true,
    isPromocode: true
  },
]
