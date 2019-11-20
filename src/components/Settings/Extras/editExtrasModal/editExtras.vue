<template lang="pug">
  .editExtras
    .row.justify-center
      .col
        .text-h6 Дополнительная услуга
      q-space
      .col-1
        q-btn(icon="close" flat @click="$emit('hide')")
    .row
      span Название
    .row.q-pb-md
      .col
        q-input(v-model="dataset.title" outlined dense)
    .row
      .col.q-pr-md
        span Локация
      .col
        span Все залы
    .row.q-pb-md
      .col.q-pr-md
        q-input(v-model="singleStudio.name" outlined dense)
      .col
        q-select(v-model="rooms[0].name" :options="rooms.map(item => item.name)" outlined dense)
    .row
      span Описание
    .row.q-pb-md
      .col
        q-input(v-model="dataset.description" type="textarea" rows="3" outlined dense)
    .row
      span Цена, ₽
    .row.q-pb-md
      q-input(v-model="dataset.amount" outlined dense)
    .row.q-pb-md
      q-checkbox(v-model="isLimit" label="Включить ограничение по колличеству доп. услуг")
    .row.q-pb-md
      .text-h6 Изображения
    .row.q-pb-xs
      q-btn(outline dense label="Выбрать файл")
    .row.no-wrap.q-pb-md
      q-img(:src="dataset.image | imgUrl" style="height: 150px; max-width: 150px")
        q-btn.absolute-top-right(icon="close" class="block" dense flat color="white")
    .row.q-pb-md.justify-center
      .col-6.q-pa-sm
        q-btn.fit.bg-white.text-black(label="Удалить" no-caps)
      .col-6.q-pa-sm
        q-btn.fit.bg-primary.text-white(label="Сохранить" no-caps flat)
</template>

<script>
export default {
  props: {
    singleStudio: Object,
    rooms: Array,
    dataset: Object
  },
  name: 'editExtras',
  data: () => ({
    isLimit: false
  }),
  filters: {
    imgUrl () {
      return 'http://placeimg.com/640/480/animals'
    }
  }
}
</script>

<style scoped>

</style>
