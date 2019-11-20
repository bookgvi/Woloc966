<template lang="pug">
  .roomData
    .row.q-pb-lg
      .col
        .text-h6 Данные зала
    .row.q-pb-lg
      .col
        span Локация
        q-input.q-pt-sm(v-model="singleStudio.name" :options="allStudiosName" outlined dense disable)
    .row.q-pb-lg
      .col
        span Название зала
        q-input.q-pt-sm(v-model="currentRoom" outlined dense)
    .row.q-pb-md
      span Цвет зала в календаре
    .row.items-center.q-pb-md
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: cyan;" @click="color='cyan'")
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: yellow;" @click="color='yellow'")
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: red;" @click="color='red'")
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: green;" @click="color='green'")
      .inline-block.q-mr-xl(style="width: 30px; height: 30px; cursor: pointer; background: blue;" @click="color='blue'")
      .row.q-pa-sm(style="border: 1px solid silver")
        .inline-block.q-mr-md(:style="{ width: '30px', height: '30px', background: color}")
        q-icon.cursor-pointer(name="colorize" style="font-size: 2rem;")
         q-popup-proxy(:offset="[10, 10]")
          .block
            q-color(
              v-model="color"
              no-footer
              style="width: 300px;"
            )
    .row.q-pb-md
      .col-4.q-pr-sm
        span Статус
        q-select(v-model="currentStatus" :options="status" outlined dense)
      .col-4.q-pr-sm
        span Тип зала
        q-select(v-model="currentRoomType" :options="roomType" outlined dense)
      .col-4.q-pr-sm
        span Мин. кол-во часов
        q-input(v-model="minHours" outlined dense)
    .row.q-pb-md
      span Опубликован и доступен для бронирования
    .row.q-pb-sm
      span Предоплата
    .row.q-pb-lg
      .col-7.q-pr-sm
        q-select(v-model="currentPrepay" :options="prepay" outlined dense)
      .col.q-pa-none
        q-btn.bg-primary.text-white(label="Привязать google календарь" no-caps)
</template>

<script>
export default {
  name: 'roomData',
  props: {
    singleStudio: Object,
    allStudiosName: Array,
    currentRoom: String
  },
  data: () => ({
    color: '#c94d4d',
    currentStatus: 'Открыт',
    status: ['Открыт', 'Закрыт'],
    currentRoomType: 'Рабочий',
    roomType: ['Рабочий', 'Нерабочий'],
    minHours: 7,
    currentPrepay: 'На выбор клиента',
    prepay: ['На выбор клиента', 'Без предоплаты']
  })
}
</script>
