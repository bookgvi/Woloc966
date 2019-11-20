import crudMixin from '../crudMixin'

export default {
  name: 'rooms',
  mixins: [crudMixin],
  methods: {
    getAvailable (filter) {
      const studio = this.$app.studios.getFiltered(filter)
      return studio ? studio.rooms : []
    },
    getFiltered (filter) {
      return this.getAvailable(filter).filter(({ id }) => (filter.rooms || []).includes(id))
    },
  },
}
