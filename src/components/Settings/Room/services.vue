<template lang="pug">
  .services
    h6.q-mb-md Удобства и услуги
    .col.q-pl-md
      .row.q-pb-md(v-for="(item, index) in services" :key="index")
        q-checkbox(
          v-model="isChecked[index]"
          :label="item.name"
          dense
        )
</template>

<script>
export default {
  props: {
    services: Array
  },
  data () {
    return {
      isChecked: []
    }
  }
}
</script>
