<template lang="pug">
  standart-card
    name-slot(name="Промокоды")
    nav-bar.q-pb-md(
      @studioChange="studio = $event"
      :buttons="{ location: true }"
    )
    q-card-section.q-pa-none.q-pb-md
      q-markup-table(
        style="min-width: 400px"
        wrap-cells
        separator="none"
        dense
        flat
      )
        thead.text-left
          tr
            th(style="width: 60%")
              span.text-bold.text-black.text-body2 Название • Скидка
            th.text-right
              span.text-bold.text-black.text-body2 Активен до
        tbody
          tr(
            v-for="(item, index) in options"
            :key="index"
          )
            td {{ nameSlot(index) }} &nbsp
              span.text-body2.bg-cyan-3.q-pa-xs(
                v-if="item.isPublic === 0"
              ) ugoloc
            td.text-right
              span.text-black.text-body2(
                v-if="item.isPublic === 1"
              ) {{ dateSlot(index) }}
              span.text-cyan-3.text-body2(
                v-else
                class="cursor-pointer"
                @click="selectPromocode(item)"
              ) Активировать
      promo-dialog(
        :isPromoDialog="promoDialog"
        :promocode="selectedPromocode"
        :studio="studio"
        @dialogStateChange="isPromoDialog = $event"
      )
</template>

<script>

import NavBar from '../CommonModules/NavBar'
import NameSlot from '../CommonModules/NameSlot'
import PromoDialog from './Modules/Dialog'
import StandartCard from '../CommonModules/StandartCard'
export default {
  name: 'PromocodesCard',
  components: { StandartCard, PromoDialog, NameSlot, NavBar },
  data () {
    return {
      studio: (this.$app.studios.list.length > 0) ? this.$app.studios.list[0].id : 0,
      isPromoDialog: false,
      selectedPromocode: {}
    }
  },
  computed: {
    promoDialog () {
      return this.isPromoDialog
    },
    options () {
      return this.$app.promocodes.list
    }
  },
  methods: {
    firstStudio () {
      if (!this.$app.studios.firstStudio || !this.$app.studios.firstStudio.id) return 0
      return this.$app.studios.firstStudio.id
    },
    selectPromocode (item) {
      this.isPromoDialog = true
      this.selectedPromocode = Object.assign({}, item)
    },
    async loadData () {
      const studio = (this.studio === 0) ? this.firstStudio : this.studio
      if (studio === 0) return []
      const filter = {
        studio: this.studio,
      }
      await this.$app.promocodes.getAll({
        ...filter
      })
    },
    nameSlot (index) {
      const item = this.options[index]
      const type = (item.type === 'percent') ? '%' : ' руб.'
      return `${item.alias} • ${item.discount}${type}`
    },
    dateSlot (index) {
      const item = this.options[index]
      return `${this.$moment(item.date).format('DD MMMM, hh:mm')}`
    },
  },
  watch: {
    studio: {
      async handler (v) {
        if (v !== 0) {
          this.loadData()
        }
      },
      immediate: true
    },
  }
}
</script>

<style scoped>

</style>
