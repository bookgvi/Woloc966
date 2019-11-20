<template lang="pug">
  .wrapper--header
    .row.q-pt-lg.col-12.justify-around.q-col-gutter-md
      .column.col-4
        profit-card
        finances-card
        // эти блоки давайте пока тоже уберем, только сохраните их куда-нибудь
        // locations-card
        // rooms-cards-creator
        documents-card
        // notifications-card
      .column.col-4
        parts-card
        bookings-card
        // requests-card
        // refunds-card
        promocodes-card
      .column.col-4
        calendar-card
        notes-card
        // workload-card
        // chat-card
        // reviews-card
        // widget-card
</template>

<script>
import ProfitCard from './Cards/ProfitCard'
import PartsCard from './Cards/PartsCard/index'
import CalendarCard from './Cards/CalendarCard/index'
import FinancesCard from './Cards/FinancesCard'
import BookingsCard from './Cards/BookingsCard/index'
import WorkloadCard from './Cards/WorkloadCard/index'
import LocationsCard from './Cards/LocationsCard/index'
import RequestsCard from './Cards/RequestsCard/index'
import ChatCard from './Cards/ChatCard/index'
import RoomsCardsCreator from './Cards/RoomsCardsCreator/index'
import RefundsCard from './Cards/RefundsCard/index'
import PromocodesCard from './Cards/PromocodesCard/index'
import ReviewsCard from './Cards/ReviewsCard/index'
import DocumentsCard from './Cards/DocumentsCard/index'
import NotificationsCard from './Cards/NotificationsCard/index'
import NotesCard from './Cards/NotesCard/index'
import WidgetCard from './Cards/WidgetCard/index'

export default {
  name: 'Dashboard',
  async mounted () {
    await this.getStudios()
  },
  methods: {
    async getStudios () {
      if (this.$app.studios) {
        if (this.$app.studios.list.length > 0) return
        await this.$app.studios.getAll()
      }
    }
  },
  components: { WidgetCard, NotesCard, NotificationsCard, DocumentsCard, ReviewsCard, PromocodesCard, RefundsCard, RoomsCardsCreator, ChatCard, RequestsCard, LocationsCard, WorkloadCard, BookingsCard, FinancesCard, CalendarCard, PartsCard, ProfitCard }
}
</script>

<style scoped>

</style>
