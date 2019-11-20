<template lang="pug">
  .q-py-md
    .col-12.row.justify-left.items-center(v-if="!isTechnical")
      q-input.col-12.text-body2(
        v-model="customerComment"
        readonly
        placeholder="Комментарий пользователя"
        type="textarea"
      )
    .col-12.row.justify-left.items-center(v-if="!isTechnical")
      span.q-py-md.row.text-body2 Админ
    .col-12.row.justify-left.items-center
      q-input.col-12.text-body2(
        v-model="managerComment"
        filled
        placeholder="Комментарий мененджера"
        type="textarea"
      ) {{ customerCommentComp }} {{ managerCommentComp }}
</template>

<script>
export default {
  name: 'CalendarComment',
  data () {
    return {
      customerComment: '',
      managerComment: ''
    }
  },
  computed: {
    customerCommentComp () {
      return this.customerCommentChange()
    },
    managerCommentComp () {
      return this.managerCommentChange()
    }
  },
  methods: {
    customerCommentChange () {
      this.$emit('customerCommentChange', this.customerComment)
    },
    managerCommentChange () {
      this.$emit('managerCommentChange', this.managerComment)
    }
  },
  props: {
    startCustomerComment: String,
    startManagerComment: String,
    isTechnical: Boolean
  },
  watch: {
    startCustomerComment (v) {
      this.customerComment = v
    },
    startManagerComment (v) {
      this.managerComment = v
    }
  }
}
</script>

<style scoped>

</style>
