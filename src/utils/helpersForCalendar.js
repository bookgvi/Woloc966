import roomsColors from 'src/common/rooms/colors'
import { EVENT_TYPES } from 'src/common/constants'

const usedColors = {}

export function formatPrice (price) {
  const fixed = +Number(price).toFixed()
  return fixed.toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
}

export function getDate (timestamp) {
  return timestamp.format('YYYY-MM-DD')
}

export function getTime (timestamp, mask = 'HH:mm') {
  return timestamp.format(mask)
}

export function getColor ({ room: { id } }) {
  if (!(id in usedColors)) {
    const i = Object.keys(usedColors).length
    usedColors[id] = roomsColors[i < roomsColors.length ? i : 0]
  }
  return usedColors[id].color
}

export function setIcon (action) {
  const icon = EVENT_TYPES[action].icon
  return icon
}
