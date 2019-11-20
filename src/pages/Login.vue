<template lang="pug">
  q-page.bg-blue-grey-2.flex.justify-center.items-center.row
    form.col-xs-12.col-sm-8.col-md-6.col-lg-4.col-xl-2(@submit.prevent="doLogin")
      q-card.bg-white
        q-card-section.font-size-large {{ "Логин" }}
        q-card-section
          q-input(
            v-model.trim="form.login"
            label="Логин"
            float-label
            :error="$v.form.login.$error"
          )
            template(slot="before")
              q-icon(name="account_box")
          q-input(
            v-model="form.password"
            :type="isPwd ? 'password' : 'text'"
            label="Пароль"
            float-label
            autocomplete="off"
            :error="$v.form.password.$error"
          )
            template(slot="before")
              q-icon(name="lock")
            template(slot="append")
              q-icon.text-lg(
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              )
        q-card-actions
          q-btn.self-center.bg-primary.text-white.full-width(
            :disabled="$v.$error || $app.login.loading.user"
            type="submit"
            :loading="$app.login.loading.user"
            label="Логин"
          )
            q-spinner(slot="loading" size="20px")
            span(slot="loading") {{"Логин"}}

</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { LocalStorage } from 'quasar'

export default {
  data () {
    return {
      form: {
        login: '',
        password: ''
      },
      isPwd: true
    }
  },
  computed: {
    token () {
      return this.$app.login.token
    },
  },
  validations: {
    form: {
      login: { required },
      password: { required }
    }
  },
  methods: {
    doLogin () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.$app.login.login(this.form)
      }
    }
  },
  mounted () {
    const user = LocalStorage.getItem('user-data')
    if (user) {
      this.form.login = user.login
    }
  }
}
</script>

<style lang="stylus">
  .q-card-actions
    margin 0
    padding 15px
    justify-content space-between

  form .q-field
    margin-bottom: 8px
</style>
