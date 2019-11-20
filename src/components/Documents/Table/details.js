import find from 'lodash/find'
import columns from './columns'

export default [
  {
    fields: [
      find(columns, {}),
      {}
    ]
  }
]
