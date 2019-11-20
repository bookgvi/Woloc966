<template lang="pug">
  standart-card
    name-slot(name="JS Widget")
    q-card-section
      span.text-body2 Вы можете создать виджет вашей  локации или зала и вставить его на любой сайт.
</template>

<script>

import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'
export default {
  name: 'WidgetCard',
  components: { StandartCard, NameSlot }
}
</script>

<style scoped>

</style>
