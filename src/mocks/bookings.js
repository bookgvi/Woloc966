const data = []
const mocks = [
  {
    id: 55799,
    customer: {
      firstName: 'Андрей',
      lastName: 'Ревин'
    },
    room: {
      name: 'Зал №13 капотня хуётня',
      color: 'orange',
    },
    eventType: 'photo',
    prepayment: 4800,
    amount: 4800,
    isPaid: true,
    guestsCount: 6,
    servicesCount: 2,
    reservedFrom: '2019-10-15 13:30',
    reservedTo: '2019-10-15 18:00',
    promo: 'Промо-промо',
    comment: 'Подготовить что-то, подготовить что-то, подготовить что-то, подготовить что-то, подготовить что-то'
  },
  {
    id: 55778,
    customer: {
      firstName: 'Джим',
      lastName: 'Кэмп'
    },
    room: {
      name: 'Зал №11 капотня',
      color: 'red',
    },
    eventType: 'event',
    prepayment: 2400,
    amount: 4800,
    isPaid: false,
    guestsCount: 3,
    reservedFrom: '2019-10-14 12:15',
    reservedTo: '2019-10-14 19:00',
    comment: 'Удалено',
    disabled: true,
  },
  {
    id: 55779,
    customer: {
      firstName: 'Андрей',
      lastName: 'Куранов'
    },
    room: {
      name: 'Зал №11 капотня',
      color: 'cyan',
    },
    eventType: 'video',
    prepayment: 2400,
    amount: 4800,
    isPaid: false,
    guestsCount: 3,
    reservedFrom: '2019-10-14 12:15',
    reservedTo: '2019-10-14 19:00'
  },
]

for (let i = 0; i < 10; i += 1) {
  data.push(...mocks.map((mock, j) => ({ ...mock, id: i * 10 + j })))
}

export default data
