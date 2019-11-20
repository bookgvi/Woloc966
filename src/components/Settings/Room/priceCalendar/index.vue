<template lang="pug">
  .q-pa-lg
    .row.q-pb-lg
      .col-11
        .text-h6 Календарь цен
      q-space
      .col-1
        q-btn(icon="close" flat @click="$emit('hide')")
    .row.q-pb-lg
      .col-6.q-pr-sm.column.justify-end
        div
          q-btn(icon="photo_camera" @click="price = 'prices1'")
          q-btn(icon="videocam"  @click="price = 'prices2'")
          q-btn.q-mr-md(icon="local_play"  @click="price = 'prices3'")
      .col-6
        span Вместимость зала, человек
        q-input(v-model="men" outlined dense)
    .row.q-pb-lg.items-end
      .col.q-pr-sm
        span Гости без доплаты
        q-input(v-model="var1" outlined dense)
      .col.q-pr-sm
        span Доплата за след, р/час
        q-input(v-model="var2" outlined dense)
      .col.q-pr-sm
        span Скидка "За день"
        q-input(v-model="var3" outlined dense)
          template(#append)
            span(style="font-size: 1rem") %
      .col
        span Скидка "День в день"
        q-input(v-model="var4" outlined dense)
          template(#append)
            span(style="font-size: 1rem") %
    .row.q-pb-sm
      q-checkbox(label="Наценка на единственный час" v-model="markup")
    .row.q-pb-lg
      .col
        extraCahrge(v-if="markup")
        dayPrices(:price="price")
</template>

<script>
import extraCahrge from './extraCahrge'
import dayPrices from './dayPrices'
export default {
  name: 'priceCalendar',
  components: { extraCahrge, dayPrices },
  data: () => ({
    price: 'prices1',
    men: 30,
    var1: 8,
    var2: 50,
    var3: 5,
    var4: 15,
    markup: true
  })
}
</script>

<style scoped>

</style>
