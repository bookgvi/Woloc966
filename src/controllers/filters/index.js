import studios from '../../api/studios'

const defaultValues = {
  customers: {
    search: null
  },
  bookings: {
    studio: null,
    rooms: null,
    statuses: [0, 1, 2, 3, 4],
    technical: false,
    search: null
  },
  finances: {
    search: null
  },
  refunds: {
    studio: null,
    rooms: null,
    statuses: [0, 1, 2, 3],
    search: null
  },
  documents: {
    search: null
  },
  settings: {
    studio: null
  },
  calendar: {
    studio: 0,
    rooms: [],
    events: ['photo', 'video', 'event'],
    price: { min: 0, max: 10000 }
  }
}

export default {
  name: 'filters',
  data () {
    return {
      values: defaultValues
    }
  },
  created () {
    this.readFromSession()
  },
  methods: {
    readFromSession () {
      const { filters } = sessionStorage

      if (filters) this.values = JSON.parse(filters)
    },
    saveToSession () {
      sessionStorage.filters = JSON.stringify(this.values)
    },
    getValues (page) {
      return this.values[page] || {}
    },
    setValue (page, name, value) {
      const { values } = this

      this.values = {
        ...values,
        [page]: {
          ...(values[page] || []),
          [name]: value
        }
      }
      this.saveToSession()
    },
    filterCustomer (id) {
      this.readFromSession()
      this.values.bookings = { customer: id }
      this.saveToSession()
    },
    async filterDefault (page) {
      this.reset(page)
      return this.values[page]
    },
    async reset (page) {
      const { values } = this
      const { items } = await studios.getAll().then(resp => resp.data)
      let [{ rooms }] = items.filter(item => item.id === items[0].id)
      rooms = rooms.map(item => item.id)
      this.values = {
        ...values,
        [page]: defaultValues[page]
      }
      if (values[page].hasOwnProperty('studio')) {
        this.setValue(page, 'studio', items[0].id)
        this.setValue(page, 'rooms', rooms)
      }
      this.saveToSession()
    }
  }
}
