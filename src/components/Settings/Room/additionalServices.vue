<template lang="pug">
  .additional
    .row.q-pb-lg
      .col
        .text-h6 Доп. услуги
    .row.q-pb-lg
      .col.q-pr-sm
        .row
          q-checkbox(v-model="var1" label="Дополнительный штатив")
        .row
          q-checkbox(v-model="var1" label="Тканевый фон")
      .col
        .row
          q-checkbox(v-model="var1" label="Помощь животным")
        .row
          q-checkbox(v-model="var1" label="Дополнительный синхрониз …")
    .row.q-pb-lg
      .col-3
        q-select(v-model="var2" label="Ещё 5" dense)
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
