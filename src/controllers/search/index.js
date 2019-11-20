import api from '../../api'

export default {
  name: 'search',
  methods: {
    async search (pageURL, searchStr) {
      const res = await api.search.getResult(pageURL, searchStr)
      return res || []
    },
  }
}
