import crudMixin from '../crudMixin'

export default {
  created () {
    this.getAll()
  },
  name: 'events',
  mixins: [crudMixin]
}
