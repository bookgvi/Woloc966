<template lang="pug">
  standart-card
    name-slot(name="Чат")
    q-card-section.q-pa-none
      q-list(style="max-width: 370px")
        q-item(
          v-for="(item, index) in options"
          :key="index"
        )
          q-item-section
            q-item-label
              span.text-bold.text-body2 {{ item.author }}
              span &nbsp
              span.text-body2.bg-cyan-3.q-pa-xs(
                v-if="item.isAdmin"
              ) Админ
            q-item-label(
              lines="1"
            )
              span.text-body2 {{ item.text }}
          q-item-section(
            side
            v-if="item.isUnread"
          )
            q-icon(
              size="7px"
              color="red"
              name="fas fa-circle"
            )
</template>

<script>

import { messages } from './messages'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

export default {
  name: 'ChatCard',
  components: { StandartCard, NameSlot },
  data () {
    return {
      messages: messages
    }
  },
  computed: {
    options () {
      return this.messages.map(item => {
        return {
          author: item.author,
          isAdmin: item.isAdmin,
          isUnread: item.isUnread,
          text: item.text
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
