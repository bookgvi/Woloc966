<template lang="pug">
  .settings(:key="pageReload")
    q-tab-panels(v-model="currentTab")
      q-tab-panel.q-pa-none(name="Локация")
        location(
          :key="studioID"
          :singleStudio="singleStudio"
          :rooms="rooms"
          :isSave="isSave"
          :services="services"
          :vendors="vendors"
          @updateStudio="updateStudio"
          @newStudio="newStudio"
          @createNewStudio="createNewStudio"
        )
        q-dialog(v-model="isRequiredModal")
          q-card
            .alarmo.q-pa-lg
              .row.q-pb-sm
                .col
                  q-icon.text-red(name="warning" style="font-size: 4rem;")
                  .text-h6.text-red Заполните обязательные поля
              .row.justify-center
                .col-4
                  q-btn.bg-primary.text-white(label="Закрыть" @click="isRequiredModal = false")
</template>

<script>
import location from './main'
import studios from '../../../api/studios'
export default {
  name: 'setting',
  components: {
    location
  },
  data () {
    return {
      pageReload: 0,
      id: this.$app.filters.getValues('settings').studio,
      isRequiredModal: false,
      currentTab: 'Локация',
      tabs: ['Локация'],
      allStudiosName: [],
      singleStudio: {},
      currentStudio: '',
      isSave: false,
      rooms: [],
      services: [],
      vendors: []
    }
  },
  computed: {
    studioID () {
      this.singleStudioM()
      return this.$app.filters.getValues('settings').studio
    }
  },
  methods: {
    async singleStudioM () {
      const { items } = await studios.getAll().then(resp => resp.data)
      let { studio } = this.$app.filters.getValues('settings')
      if (!studio) return
      const rooms = items[0].rooms
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      this.allStudiosName = items.map(item => item.name)
      this.services = this.singleStudio.services
      this.vendors = this.singleStudio.vendors
    },
    async updateStudio (services, vendors) {
      let { studio } = this.$app.filters.getValues('settings')
      if (!studio) {
        studio = this.currentStudio
      }
      if (
        !this.singleStudio.name ||
        !this.singleStudio.phone ||
        !this.singleStudio ||
        !this.singleStudio.limit ||
        !this.singleStudio.height ||
        !this.singleStudio.yardage ||
        !this.singleStudio.address
      ) {
        this.isRequiredModal = true
        return
      }
      await studios.updateStudio(studio, this.singleStudio)
    },
    async newStudio () {
      this.isSave = true
      this.singleStudio = { lat: 55.786419, lon: 37.725433 }
      this.rooms = []
      this.services = []
      this.vendors = []
    },
    async createNewStudio () {
      if (
        !this.singleStudio.name ||
        !this.singleStudio.phone ||
        !this.singleStudio ||
        !this.singleStudio.limit ||
        !this.singleStudio.height ||
        !this.singleStudio.yardage ||
        !this.singleStudio.address
      ) {
        this.isRequiredModal = true
        return
      }
      const result = await studios.createStudio(this.singleStudio)
      if (result) {
        this.isSave = false
      }
      this.pageReload++
    }
  },
  async mounted () {
    this.singleStudioM()
  }
}
</script>
