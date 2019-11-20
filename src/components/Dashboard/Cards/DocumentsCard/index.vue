<template lang="pug">
  standart-card
    name-slot(name="Документы")
    q-card-section.q-pa-none.q-pb-md
      q-markup-table(
        wrap-cells
        separator="none"
        style="min-width: 400px"
        dense
        flat
      )
        thead.text-left
        tbody
          tr(
            v-for="(item, index) in options"
            :key="index"
          )
            td {{ item.name }}
            td.text-right
              a.text-grey(
                :href="item.link"
                class="cursor-pointer"
              ) Скачать

</template>

<script>

import NavBar from '../CommonModules/NavBar'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

export default {
  name: 'DocumentsCard',
  components: { StandartCard, NameSlot, NavBar },
  async created () {
    await this.$app.documents.getAll()
  },
  data () {
    return {
    }
  },
  computed: {
    options () {
      return this.$app.documents.list.slice(0, 3)
    }
  },
  methods: {
  },
}
</script>

<style scoped>

</style>
