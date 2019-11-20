<template lang="pug">
  .employer.q-pa-md
    .row.q-pb-md
      .col-11
        .text-h6 Сотрудник
      .col-1
        q-icon.cursor-pointer(name="close" style="font-size: 22px" @click="$emit('closeModal')")
    .row.q-pb-xs
      .col.q-pr-sm
        span Имя
      .col.q-pr-sm
        span Логин
    .row.q-pb-md
      .col.q-pr-sm
        q-input(v-model="employees.name" outlined dense)
      .col.q-pr-sm
        q-input(v-model="employees.login" outlined dense)
    .row.q-pb-xs
      .col.q-pr-sm
        span Телефон
      .col.q-pr-sm
        span Эл. почта
    .row.q-pb-md
      .col.q-pr-sm
        q-input(v-model="phone" outlined dense)
      .col.q-pr-sm
        q-input(v-model="employees.email" outlined dense)
    .row.q-pb-xs
      .col.q-pr-sm
        span Пароль &nbsp;
        span.text-red от 6 знаков, 1 цифра и 1 заглавная буква минимум
    .row.q-pb-md
      .col.q-pr-sm
        q-input(v-model="employees.pass" outlined dense)
    .row.q-pb-xs
      .col.q-pr-sm
        span Роль
    .row.q-pb-md
      q-checkbox.q-pr-lg(
        v-for="(item, index) in employees.role"
        :key="index"
        :label="item.name"
        v-model="item.isRole"
      )
    .row.q-pb-md
      .col.q-pr-sm
        q-btn(label="Удалить" no-caps outlined style="width: 100%;")
      .col
        q-btn.bg-primary.text-white(
          label="Сохранить"
          no-caps
          outlined
          style="width: 100%;"
        )
</template>

<script>
export default {
  name: 'employees',
  props: {
    employees: Object,
    phone: String
  }
}
</script>

<style scoped>

</style>
