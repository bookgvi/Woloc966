import { date } from 'quasar'

export default [
  {
    name: 'room',
    label: 'Зал',
    active: true,
    width: 180,
    align: 'left',
    headerStyle: 'text-align: left;',
  },
  {
    name: 'percent',
    label: 'процент',
    align: 'right',
    format: value => `${value}%`,
    active: true,
    headerStyle: 'text-align: right;',
  },
  {
    name: 'daysOfWeek',
    format: value => {
      if (!value) { return }
      const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
      return daysOfWeek[value - 1]
    },
    label: 'день',
    active: true,
    align: 'center',
    headerStyle: 'text-align: center;',
  },
  {
    name: 'hourFrom',
    label: 'время',
    format: (value, { hourFrom, hourTo }) => [hourFrom, hourTo].map(
      item => `${item}:00`
    ).join(' — '),
    active: true,
    align: 'center',
    headerStyle: 'text-align: center;',
  },
  {
    name: 'minHours',
    label: 'Мин. часы',
    active: true,
    align: 'center',
    headerStyle: 'text-align: center;'
  },
  {
    name: 'expiredAt',
    label: 'Активна до',
    format: value => date.formatDate(value, 'D MMMM'),
    active: true,
    align: 'right',
    headerStyle: 'text-align: right;'
  }
]
