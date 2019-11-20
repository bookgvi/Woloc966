<template lang="pug">
  .backgrounds
    .row.q-pb-lg
      .col
        .text-h6 Фоны
    .row.q-pb-lg
      .col.q-pr-sm
        .row
          q-checkbox(v-model="var1" label="Аквазона")
        .row
          q-checkbox(v-model="var1" label="Деревянные панели")
      .col
        .row
          q-checkbox(v-model="var1" label="Лепнина")
        .row
          q-checkbox(v-model="var1" label="Фактурные стены")
    .row.q-pb-lg
      .col-3
        q-select(v-model="var2" label="Ещё 18" dense)
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
