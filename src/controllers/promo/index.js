import crudMixin from '../crudMixin'

export default {
  created () {
    this.getAll()
  },
  name: 'promo',
  mixins: [crudMixin]
}
