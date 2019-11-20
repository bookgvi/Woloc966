<template lang="pug">
  .specifications
    .row.q-pb-lg
      .col
        .text-h6 Характеристики
    .row.q-pb-lg
      .col
        span Описание зала
          textarea.q-pa-sm.text-grey-8(
            v-model="description"
            type="textarea"
            rows=5
            style="width: 100%;"
          )
    .row.q-pb-lg
      .col.q-pr-sm
        span Высота потолков, м
        q-input(v-model="singleStudio.height" outlined dense)
      .col
        span(style="line-height: 0;") Площадь, м
          sup 2
        q-input(v-model="singleStudio.yardage" outlined dense)
    .row.q-pb-lg
      .col.q-pr-sm
        .row
          q-checkbox(v-model="var1" label="Дневной свет")
        .row
          q-checkbox(v-model="var1" label="Подвесная система")
        .row
          q-checkbox(v-model="var2" label="Проходная система")
      .col
        .row
          q-checkbox(v-model="var1" label="Трехфазная нагрузка")
        .row
          q-checkbox(v-model="var2" label="Затемнение окон")
        .row
          q-checkbox(v-model="var1" label="Условия для семинаров")
</template>

<script>
export default {
  name: 'specifications',
  props: {
    singleStudio: Object,
    allStudiosName: Array,
    currentRoom: String
  },
  data: () => ({
    description: '',
    var1: true,
    var2: false
  })
}
</script>
