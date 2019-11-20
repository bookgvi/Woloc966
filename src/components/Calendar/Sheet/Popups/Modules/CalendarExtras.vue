<template lang="pug">
  .row.justify-left.items-center
    .q-pa-none.text-body2(
      v-if="$app.extras.extrasForRoom.length > 0"
      style="width: 330px"
    )
      .row.justify-between.items-center.q-pb-md
        .col-9.q-pa-none
          span.q-pb-xs.text-body2.text-bold Услуга
        .col.q-pa-none.text-right
          span.q-pb-xs.text-body2.text-bold Кол-во
      .q-pa-none(
        v-for="(item, index) in options"
        :key="index"
        @mouseover="activeIndex = index"
        )
        .row.justify-between.items-center.q-pb-sm(v-if="index === activeIndex")
          .col-9.q-pa-none
            span.row.q-pb-sm.text-body2 {{ item.title }}
            span.row.text-caption.text-bold {{ item.amount }} р.
          .col.justify-right.q-pa-none
            q-input.q-pb-md(
              :rules="[val => (val >= 0) || 'Введите число, не меньшее нуля']"
              dense
              min="0"
              placeholder="0"
              clear-icon="close"
              style="width: 70px"
              @input="onInput(index, $event)"
              @keydown="keyHandler(item.count, index, $event)"
              v-model.number="item.count"
              type="number"
            )
              template(v-slot:append)
                q-icon(name="close" @click="item.count = 0" class="cursor-pointer")
        .row.justify-between.items-center.q-pb-sm(v-else)
          .col-11.q-pa-none
            span.row.text-body2 {{ item.title.slice(0, 20) }} ...
          .col.q-pa-none
            span.row.text-caption {{ item.count }}
    span.text-body2(v-else) В этом зале нет доп. услуг
</template>

<script>

export default {
  name: 'CalendarExtras',
  data () {
    return {
      activeIndex: -1,
    }
  },
  computed: {
    options () {
      if (!this.$app.extras.extrasForRoom) return []
      return this.$app.extras.extrasForRoom
    }
  },
  methods: {
    onInput (index, val) {
      if (!val || val === '') {
        if (!this.$app.extras.extrasForRoom || !this.$app.extras.extrasForRoom[index]) return
        this.$app.extras.extrasForRoom[index].count = 0
      }
    },
    keyHandler (val, index, evt) {
      if (val < 1 && evt.key === 'ArrowDown') {
        evt.preventDefault()
      }
      if (evt.key === '-' || evt.key === 'e') {
        evt.preventDefault()
      }
    }
  },
  props: {
    roomId: {
      type: Number
    }
  },
  watch: {
    roomId: {
      async handler (v) {
        if (v === 0) {
          this.$app.extras.extrasForRoom = []
          return
        }
        await this.$app.extras.getForCalendar({ room: v })
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
