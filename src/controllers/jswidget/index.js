import crudMixin from '../crudMixin'

export default {
  created () {
    this.getAll()
  },
  name: 'jswidget',
  mixins: [crudMixin]
}
