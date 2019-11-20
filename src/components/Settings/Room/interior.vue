<template lang="pug">
  .interior
    .row.q-pb-lg
      .col
        .text-h6 Предметы интерьера
    .row.q-pb-lg
      .col.q-pr-sm
        .row
          q-checkbox(v-model="var1" label="Бочка")
        .row
          q-checkbox(v-model="var1" label="Ванна")
      .col
        .row
          q-checkbox(v-model="var1" label="Книжный шкаф")
        .row
          q-checkbox(v-model="var1" label="Кресло")
    .row.q-pb-lg
      .col-3
        q-select(v-model="var2" label="Ещё 45" dense)
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
    var2: ''
  })
}
</script>
