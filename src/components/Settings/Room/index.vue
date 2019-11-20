<template lang="pug">
  .room
    div(v-show="false") {{ studioID }}
    .menu.menu--menu2
      filters-list(name="settings")
        template(#prepend="props")
          studio-filter(v-bind="props")
        template(#append)
          q-btn.q-btn--no-uppercase(label="Добавить зал" dense color="primary")
    .content--content2
      .row.q-py-md
        .col-3
          .row(v-for="(room, index) in rooms" :key="index")
            q-btn(
              @click="currentRoom=room.name"
              no-caps
              flat
            ) Зал {{ room.name }}
        .col-6
          roomData(:singleStudio="singleStudio" :allStudiosName="allStudiosName" :currentRoom="currentRoom")
          specifications(:singleStudio="singleStudio")
          payment
          images
          interior
          backgrounds
          additionalServices
          services(:singleStudio="singleStudio")
          .row
            .col-6
              q-btn.fit.bg-primary.text-white(label="Сохранить" no-caps)
</template>

<script>
import roomData from './roomData'
import specifications from './specifications'
import payment from './payment'
import images from './images'
import interior from './interior'
import backgrounds from './backgrounds'
import additionalServices from './additionalServices'
import services from './services'
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
import studios from '../../../api/studios'
export default {
  data () {
    return {
      id: this.$app.filters.getValues('settings').studio,
      allStudiosName: [],
      singleStudio: {},
      currentStudio: '',
      currentRoom: '',
      isSave: false,
      rooms: [],
      services: [],
      vendors: []
    }
  },
  components: {
    StudioFilter,
    FiltersList,
    roomData,
    specifications,
    payment,
    images,
    interior,
    backgrounds,
    additionalServices,
    services
  },
  computed: {
    studioID () {
      this.singleStudioM()
      return this.$app.filters.getValues('settings').studio
    }
  },
  methods: {
    async singleStudioM () {
      let { studio } = this.$app.filters.getValues('settings')
      const { items } = await studios.getAll().then(resp => resp.data)
      if (!studio) {
        studio = items[0].id
      }
      this.currentStudio = 'settings'
      this.isSave = false
      const [{ rooms }] = items.filter(item => item.id === studio)
      this.rooms = rooms
      this.currentRoom = rooms[0].name
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      this.services = this.singleStudio.services
      this.vendors = this.singleStudio.vendors
    },
    async updateStudio (services, vendors) {
      this.singleStudio.services = services.map(item => {
        return { id: item.id }
      })
      this.singleStudio.vendors = vendors.map(item => {
        return { id: item.id }
      })
      const { studio } = this.$app.filters.getValues('settings')
      await studios.updateStudio(studio, this.singleStudio)
    },
    async newStudio () {
      console.log('Adding new studio')
      this.currentStudio = ''
      this.isSave = true
      this.singleStudio = { lat: 55.786419, lon: 37.725433 }
      this.rooms = []
      this.services = []
      this.vendors = []
    },
    async createNewStudio () {
      await studios.createStudio(this.singleStudio)
      this.isSave = false
    }
  },
  async mounted () {
    this.singleStudioM()
  }
}
</script>
