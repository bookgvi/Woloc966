<template lang="pug">
  standart-card
    name-slot(name="Отзывы")
    q-card-section
      .row.col-12.justify-between
        .col-9
          span.text-body2 {{ studioRoomSlot }}
        q-btn-group(outline).col
          q-btn.q-px-sm.q-mx-none(
            @click="prev"
            outline
            size="sm"
            icon="chevron_left"
            color="secondary"
          )
          q-separator(vertical, inset)
          q-btn.q-px-sm.q-mx-none(
            @click="next"
            outline
            size="sm"
            icon="chevron_right"
            color="secondary"
          )
    q-card-section
      .row.col-12.justify-between
        .col-8
          span.text-body2 {{ review.author }} &nbsp
          template
            q-icon(
              v-for="(blank, index) in review.rating"
              name="fas fa-star"
              size="10px"
              style="color: #79ADB6"
              :key="index"
            )
            q-icon(
              v-for="(blank, index) in 5 - review.rating"
              name="fas fa-star"
              size="10px"
              style="color: #D9D9D9"
              :key="index + 5"
            )
        .col.text-right
          span.text-caption.text-grey {{ review.date }}
    q-card-section
      span.text-body2 {{ review.text }}
    q-card-actions.q-pt-none.q-pl-md
      q-btn.q-mr-xs.text-body2.text-black(
        outline
        size="sm"
        label="Просмотрено"
        no-caps
        @click="read"
        color="secondary"
      )
      q-btn.q-mr-xs.text-body2.text-black(
        outline
        size="sm"
        label="Ответить"
        no-caps
        @click="reply"
        color="secondary"
      )
</template>

<script>

import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'
export default {
  name: 'ReviewsCard',
  components: { StandartCard, NameSlot },
  data () {
    return {
      messages: [
        {
          author: 'Роман Марков',
          text: 'Постоянно меняющийся интерьер с интересными деталями, различными фонами и большим количеством света. Отзывчивые и позитивные владельцы готовые оказать необходимую помощь, начиная от бодрого настроя, отличного кофе, настроек света, заканчивая поиском реквизита.',
          rating: 4,
          date: this.$moment().subtract(1, 'days').format('DD MMMM YYYY'),
          studio: 'PTSTUDIO',
          room: 'Зал 2'
        },
        {
          author: 'Наталья',
          text: 'Хороший место, дружелюбные персонал, качественно. Что заказывала - то и получила, интерьеры, постройки и павильоны',
          rating: 5,
          date: this.$moment().subtract(2, 'days').format('DD MMMM YYYY'),
          studio: `Kap's Studio`,
          room: '18'
        },
        {
          author: ':(((',
          text: 'Добираться туда просто нереально долго и неудобно. Есть своя парковка, мизерная и неудобная, шлагбаум периодически не срабатывает на карту. Движение на подъезде хаотичное, так как дорога заставлена припаркованными машинами и приезжаете вы в итоге в тупик. Выезд ещё более убогий, всегда в пробку. Но не об этом сейчас. Смысл в том что въезд и выезд - нервы, время, приключения.',
          rating: 1,
          date: this.$moment().subtract(4, 'days').format('DD MMMM YYYY'),
          studio: 'Ye Studio',
          room: '33 zal'
        },
        {
          author: 'Антон Бове',
          text: 'Договорились. Соберем все заранее запланированные необходимые вещи',
          rating: 3,
          date: this.$moment().subtract(6, 'days').format('DD MMMM YYYY'),
          studio: 'Локация1',
          room: 'Зал 2'
        },
      ],
      index: 0
    }
  },
  computed: {
    studioRoomSlot () {
      return `${this.review.studio} • ${this.review.room}`
    },
    review () {
      return this.options[this.index]
    },
    options () {
      return this.messages
    }
  },
  methods: {
    prev () {
      this.index = (this.index === 0) ? this.options.length - 1 : this.index - 1
    },
    next () {
      this.index = (this.index === this.options.length - 1) ? 0 : this.index + 1
    },
    read () {
      //
    },
    reply () {
      //
    }
  }
}
</script>

<style scoped>

</style>
