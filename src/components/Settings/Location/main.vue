<template lang="pug">
  .location
    .menu.menu--menu2
      filters-list(name="settings")
        template(#prepend="props")
          studio-filter(v-bind="props")
        template(#append)
          q-btn.q-btn--no-uppercase(label="Добавить локацию" dense color="primary" @click="$emit('newStudio')")
    .content
      .row.justify-center.q-pb-md
        .col-6
          dataBlock(:singleStudio="singleStudio")
          specifications(:singleStudio="singleStudio")
          images
          addressBlock(:singleStudio="singleStudio")
          services(:services="services")
          equipment(:vendors="vendors")
          rooms(:rooms="rooms")
          .row.col-12.justify-center.q-pt-md
            .col-6.q-pr-sm
              q-btn.fit.bg-primary.text-white(
                label="Сохранить"
                no-caps
                @click="$emit('updateStudio', services, vendors)"
                :disable='isSave'
              )
            .col-6.q-pl-sm
              q-btn.fit(
                label="Сохранить и создать зал"
                no-caps
                :disable='!isSave'
                @click="$emit('createNewStudio')"
              )
</template>

<script>
import dataBlock from './data'
import specifications from './specifications'
import images from './images'
import addressBlock from './address'
import services from './services'
import equipment from './equipment'
import rooms from './rooms'
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'

export default {
  components: {
    dataBlock,
    specifications,
    images,
    addressBlock,
    services,
    equipment,
    rooms,
    StudioFilter,
    FiltersList
  },
  props: {
    singleStudio: Object,
    services: Array,
    vendors: Array,
    rooms: Array,
    studioID: Number,
    isSave: Boolean
  },
  data () {
    return {}
  }
}
</script>
