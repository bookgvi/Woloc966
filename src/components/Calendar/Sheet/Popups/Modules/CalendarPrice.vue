<template lang="pug">
  .q-py-none
    .col-12.row.justify-around.items-center.text-body2(
      v-for="(position, index) in positions"
      :key="index"
    )
      .col-9.row.justify-left.items-center
        .text.text_small {{ position.name }}
      .col-3.row.justify-left.items-center
        .text.text_gray {{ position.price }}
      .row.col-12.q-py-sm
        q-separator(
          inset
        )
    .col-12.row.justify-left.items-center
      .col-9.row.justify-left.items-center
        .text.text_small {{ "Итого" }}
      .col-3.row.justify-left.items-center
        .text.text_gray {{ price }}
      .row.col-12.q-py-sm
        q-separator(
          inset
        )
    .col-12.row.justify-left.items-center
      .text.q-py-sm Скидка/надбавка, р.
      .row
        .col-3
          q-btn.q-mt-sm(
            @click="changeSign"
            color="#FFFFFF"
            text-color="black"
            label="+/-"
          )
        .col-9
          q-input(
            square
            filled
            v-model.number="discount"
            placeholder="0"
            @keydown="keyHandler($event)"
            type="number"
          ) {{ priceComp }}
    .col-12.row.justify-left.items-center
      .row.col-12.q-py-sm
        q-separator(
          inset
        )
      .col-9.row.justify-left.items-center
        .text.text_small {{ "Цена со скидкой" }}
      .col-3.row.justify-left.items-center
        .text.text_gray {{ priceWithDiscount }}
      .row.col-12.q-pt-sm
        q-separator(
          inset
        )
</template>

<script>
export default {
  name: 'CalendarPrice',
  data () {
    return {
      discount: 0,
      event: {
        name: '',
        price: 0
      },
    }
  },
  computed: {
    priceComp () {
      return this.priceChange()
    },
    price () {
      let sum = 0
      this.positions.forEach((position) => {
        sum += +position.price
      })
      return sum || 0
    },
    priceWithDiscount () {
      return +this.price + +this.discount
    },
    positions () {
      let arr = []
      arr.push(this.fee)
      arr.push(...this.extras)
      return arr
    }
  },
  methods: {
    keyHandler (evt) {
      if (evt.key === '-' || evt.key === '+' || evt.key === 'e') {
        evt.preventDefault()
      }
      if (Number.isNaN(evt.key)) {
        evt.preventDefault()
      }
    },
    priceChange () {
      this.$emit('priceChange', this.price)
    },
    changeSign () {
      this.discount = -this.discount
    },
  },
  props: ['extras', 'fee']
}
</script>

<style scoped>

</style>
