<template lang="pug">
  .rooms
    h6.q-mb-md Залы
    .col
      draggable(:list="rooms")
        q-list(v-for="item in rooms" :key="item.id")
          q-item
            q-item-section Зал {{ item.name }}
            q-icon(name="drag_handle")
          q-separator
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: { draggable },
  props: {
    rooms: Array
  }
}
</script>

<style scoped>
  .q-list:hover {
    border-top: 1px solid silver;
    border-bottom: 1px solid silver;
    background-color: rgba(0, 0, 0, 0.08);
  }
  .q-icon {
    font-size: 1.5em;
    cursor: pointer;
  }
</style>
