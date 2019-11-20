<template lang="pug">
  .col-12.row.justify-around.items-center
    .col-12
      q-select.text-body2.text-weight-bold(
        outlined
        fill-input
        :disabled="!isCreate"
        :readonly="!isCreate"
        hide-selected
        @filter="filterFn"
        use-input
        input-debounce="1000"
        hide-dropdown-icon
        options-dense
        placeholder="Пользователь"
        clearable
        :options="$app.customers.searched.slice(0, 10)"
        :option-value="opt => opt === null ? '' : opt.fullName"
        :option-label="opt => opt === null ? '' : opt.fullName"
        v-model="customer"
        )
    .col-12
      q-input.text-body2.text-weight-bold(
        outlined
        readonly
        mask="#(###)###-##-##"
        placeholder="Телефон"
        v-model="phone"
      )
    .col-12
      q-input.text-body2.text-weight-bold(
        outlined
        readonly
        stack-label
        placeholder="Эл. почта"
        v-model="email"
      ) {{ customerComp }}
</template>

<script>

export default {
  name: 'CalendarCustomer',
  data () {
    return {
      customer: {
        firstName: '',
        fullName: '',
        phone: '',
        email: ''
      }
    }
  },
  computed: {
    customerComp () {
      return this.customerChange()
    },
    phone: {
      get () {
        return (this.customer) ? this.customer.phone : ''
      },
      set (v) {
        this.customer.phone = v
      }
    },
    email: {
      get () {
        return (this.customer) ? this.customer.email : ''
      },
      set (v) {
        this.customer.email = v
      }
    }
  },
  methods: {
    customerChange () {
      this.$emit('customerChange', this.customer)
    },
    async filterFn (val, update, abort) {
      if (!val || val.length < 1) {
        abort()
        return
      }
      await this.$app.customers.getForCalendar(val.toLowerCase())
      update()
    }
  },
  props: {
    startCustomer: {
      type: Object,
      default: _ => {
        return {
          firstName: '',
          fullName: '',
          phone: '',
          email: ''
        }
      }
    },
    isCreate: {
      type: Boolean
    }
  },
  watch: {
    startCustomer: {
      handler (v) {
        this.customer = (v) ? Object.assign(v)
          : {
            firstName: '',
            fullName: '',
            phone: '',
            email: ''
          }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
