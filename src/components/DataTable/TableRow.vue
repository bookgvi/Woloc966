<template lang="pug">
  q-tr(ref="qtr" :class="{ disabled }")
    q-td(
      :key="name"
      v-for="{ name, value, active } of cols"
      v-bind="getColProps(name)"
      @click.native="active && rowDialog(row)"
    )
      template(v-if="name === 'customer'")
        div(style="width: 100%; white-space: normal;") {{ value }}
      template(v-else-if="name === 'room'")
        q-chip(
          v-if="value"
          dense
          :style="getRoomStyle(value)"
          :title="value.name"
        ) {{ value.name || value.title}}
      template(v-else-if="name === 'bookingId'")
        div(:title="row.status.title") {{ value }}
      template(v-else-if="name === 'bookingStatus'")
        span(v-bind="bookingsStyle(value.title)")
      template(v-else-if="name === 'refundStatus'")
        span(v-bind="refundsStyle(value.title)")
        span(v-if="value.title !== 'Новый'") {{ value.title }}
      template(v-else-if="name === 'eventType'")
        q-icon(:name='value.icon')
      template(v-else-if="name === 'extras'")
        div(v-if="value" :title="extrasM(value)") {{ value.items.length }}
        div(v-else) &mdash;
      template(v-else-if="['customerComment', 'promo'].includes(name)")
        transition(
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        )
          span(v-if="!controlsAreVisible(row)" :title="value") {{value}}
      template(v-else-if="name === 'rating'")
        i(v-for="(item, i) in 5" class="fa-star" :class="i < value ? 'fas' : 'far' ")
      template(v-else-if="name === 'controls'")
        .buttons.absolute
          transition(
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutRight"
          )
            .inline-block(v-if="controlsAreVisible(row)")
              slot(:row="row")
          q-btn(
            flat
            round
            icon="more_vert"
            @click="$emit('toggleControls', row.id)"
            :color="controlsAreVisible(row) ? 'primary' : undefined"
            :disable="disabled"
          )
      template(v-else-if="name === 'refundsControls'")
        slot(v-if="row.status.title === 'Новый'")
      template(v-else-if="name === 'link'")
        slot
      template(v-else-if="name === 'purpose'")
        q-chip(style="height: 80%;")
          div.q-my-sm(style="width: 100%;  white-space: normal;") {{ value }}
      template(v-else-if="name === 'purposeComment'")
        div.q-py-sm(style="width: 100%; white-space: normal;") {{ value }}
      template(v-else-if="name === 'extrasControls'")
        slot
      template(v-else-if="name === 'expiredAt'")
        span(v-if="value") {{ value }}
        span(v-else) нет
      template(v-else-if="name === 'chat'")
        div.q-py-sm(style="width: 90%; white-space: normal;") {{ value }}

      template(v-else) {{ value }}
</template>

<script>
export default {
  name: 'TableRow',
  inheritAttrs: false,
  props: {
    row: Object,
    cols: Array,
    colsMap: Object,
    controlsRowId: Number,
    toggleControls: Function,
    dialogRowId: Number,
    disabled: Boolean,
  },
  data: () => ({
  }),
  methods: {
    controlsAreVisible (row) {
      return this.controlsRowId === row.id
    },
    getColProps (name) {
      const { active, classes, __tdClass, style } = this.colsMap[name]
      const classNames = [`${name}-col`]
      if (active) classNames.push('active')
      if (classes) classNames.push(classes)
      if (__tdClass) classNames.push(__tdClass)

      return {
        class: classNames,
        style
      }
    },
    getRoomStyle ({ color }) {
      return {
        height: '80%',
        color: this.hexTOrgb(color, 1),
        backgroundColor: this.hexTOrgb(color, 30)
      }
    },
    hexTOrgb (color, opacity) {
      if (color[0] === '#') {
        color = color.slice(1, color.length)
      }
      const r = parseInt(color.slice(0, 2), 16)
      const g = parseInt(color.slice(2, 4), 16)
      const b = parseInt(color.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity > 1 ? opacity / 100 : opacity})`
    },
    rowDialog (row) {
      // if (this.row.status && ['Отменено', 'Просрочено'].includes(this.row.status.title)) { return }
      this.$emit('toggleDialogRow', row)
    },
    extrasM (extras) {
      let titles = extras.items.map(item => `${item.title}, ${this.money(item.amount, true)} \n`)
      return titles.join('')
    },
    money (val, sign = false) {
      const value = Number(val).toLocaleString('ru-RU', { minimumFractionDigits: 0 })
      return value + (sign ? ' ₽' : '')
    },
    bookingsStyle (status) {
      this.$nextTick(_ => {
        if (['Отменено', 'Просрочено'].includes(status)) {
          this.$refs.qtr.$el.classList.add('text-grey-7')
        }
      })
    },
    refundsStyle (status) {
      this.$nextTick(_ => {
        if (!['Новый'].includes(status)) {
          this.$refs.qtr.$el.classList.add('disabled')
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  tr.disabled
    opacity .2
  .q-table tbody tr
    .active
      cursor: pointer
    .room-col .q-chip
      width 100px
      border-radius 3px
      .q-chip__content
        width 100%
        white-space normal
        overflow hidden
    .eventType-col
      font-size 1.6em
    .customerComment-col
      max-width 100px
      overflow hidden
      text-overflow ellipsis
    .rating-col
      color $primary
      letter-spacing 5px
    .controls-col
      position relative
      .buttons
        padding-top 4px
        height 100%
        top 0
        right 0
        font-size 1.8em
</style>
