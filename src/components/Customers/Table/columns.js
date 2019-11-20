export default [
  {
    name: 'customer',
    required: true,
    label: 'Имя',
    field: ({ firstName, lastName } = {}) => `${firstName} ${lastName}`,
    width: 270,
    active: true,
  },
  {
    name: 'rating',
    align: 'center',
    label: 'Рейтинг',
    sortable: true,
    width: 60,
  },
  {
    name: 'chat',
    label: 'Чат',
    sortable: true,
  }
  // ---- TODO ---- решение будет принято впоследствии!!!
  // {
  //   name: 'controls',
  //   width: 40
  // }
]
