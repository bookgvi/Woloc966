<template lang="pug">
  .address-class
    h6.q-mb-md Адрес &nbsp
      span.text-red *
    .row.q-pb-lg
      .col-8.q-pr-sm
        q-select(
          v-model="singleStudio.address"
          :options="fullAddressArr"
          @input.native="getFullAddress($event)"
          @keyup.native.enter="showOnMap"
          @filter="emptyFilter"
          use-input
          fill-input
          display-value
          outlined
          dense
        )
          template(v-slot:no-option)
            q-item
              q-item-section.text-grey No results
      .col-4.q-pl-sm
        q-btn.block(label="Показать на карте" @click="showOnMap")
    .row.q-pb-lg
      yandexMap(
        v-if="singleStudio.lon ? true : false"
        :settings="options.yaMap"
        map-type="map"
        scroll-zoom=false
        zoom=17
        :coords="[singleStudio.lat, singleStudio.lon]"
        :controls="yControls"
        style="width: 100%; height: 480px"
        @click="setAddress"
      )
        ymap-marker(
          v-if="isMarker"
          marker-id="1"
          :coords="markerCoords"
          :balloon="{ header: 'First' }"
        )
    .row.q-pb-lg
      .col
        span Ближайшая станция метро
          q-input.q-pt-sm(
            v-model="singleStudio.metro"
            outlined
            dense
          )
    .row.q-pb-lg
      .col
        span Инструкция пешком
        textarea.q-pa-sm.text-grey-8(
          v-model="singleStudio.foot"
          outlined
          rows="4"
          style="width: 100%;"
        )
    .row.q-pb-lg
      .col
        span Инструкция на машине
        textarea.q-pa-sm.text-grey-8(
          v-model="singleStudio.car"
          outlined
          rows="4"
          style="width: 100%;"
        )
</template>

<script>
import axios from 'axios'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  props: {
    singleStudio: Object
  },
  components: { yandexMap, ymapMarker },
  data () {
    return {
      isMarker: false,
      fullAddressArr: [],
      yControls: [],
      options: {
        token: 'daa0567fa0fb73ae73ae7e1e389dfefe52ef35b9',
        yaMap: {
          yAPI: 'f7da3df2-99ce-456f-b9e5-bc1934a8579a'
        }
      },
      instWalk: 'Выйдя из метро идите вдоль торговых рядов вдоль и железной дороги. Перейдя железнодорожные пути пройдите через шлагбаум на территорию бывшего завода Станколит ...',
      instAuto: ''
    }
  },
  computed: {
    markerCoords () {
      this.showOnMap()
      return [this.singleStudio.lat, this.singleStudio.lon]
    }
  },
  methods: {
    async getFullAddress (e) {
      this.singleStudio.address = e.target.value
      await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        count: 5,
        query: e.target.value,
      }, {
        headers: {
          Authorization: `Token ${this.options.token}`
        }
      }).then(resp => {
        this.fullAddressArr = resp.data.suggestions.map(item => {
          return `${item.value}`
        })
      })
        .catch(err => { console.error('Catched...', err) })
    },
    async showOnMap () {
      this.isMarker = false
      await axios.get(`https://geocode-maps.yandex.ru/1.x/`, {
        params: {
          apikey: this.options.yaMap.yAPI,
          format: 'json',
          geocode: this.singleStudio.address
        }
      }).then(resp => {
        this.singleStudio.lon = +resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0]
        this.singleStudio.lat = +resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1]
      })
        .catch(err => { console.error('Catched...', err) })
      this.isMarker = true
    },
    async setAddress (e) {
      this.isMarker = false
      this.singleStudio.lon = e.get('coords')[1]
      this.singleStudio.lat = e.get('coords')[0]
      await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address', {
        lat: this.singleStudio.lat,
        lon: this.singleStudio.lon
      }, {
        headers: {
          Authorization: `Token ${this.options.token}`
        }
      }).then(resp => { this.singleStudio.address = resp.data.suggestions[0].value })
        .catch(err => { console.error('Catched...', err) })
      this.isMarker = true
    },
    emptyFilter (val, update) {
      update(() => {})
    }
  }
}
</script>
