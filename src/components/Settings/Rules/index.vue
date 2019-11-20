<template lang="pug">
  .rules
    .row.justify-center
      .col-6
        .row.q-py-lg
          .text-h5 Правила
        .row.q-pb-md
          .text-h6 Отмена бронирования без штрафа
        .row.q-pb-xs
          span Анулирование брони без штафа, ч
        .row.q-pb-md
          .col
            q-input(v-model="cancelation" outlined dense)
        .row.q-pb-md
          .text-h6 Доплата при задержке с освобождением помещения
        .row.q-pb-xl
          .col
            .row
              q-radio(v-model="extraPay" val="first" label="при любой задержке доплата производится за 1 час стоимости аренды")
            .row
              q-radio(v-model="extraPay" val="second" label="при задержке до 30 мин, доплата в размере 1/2 смоимости часа, более 30 мин. — полная стоимость часа.")
        .row.q-pb-md
          .text-h6 Видеонаблюдение на территории
        .row.q-pb-xl
          .col
            .row
              q-radio(v-model="video" val="first" label="Нет видеонаблюдения")
            .row
              q-radio(v-model="video" val="second" label="Только на общей территории")
            .row
              q-radio(v-model="video" val="third" label="На общей территории и в залах")
            .row
              q-radio(v-model="video" val="fourth" label="Только в залах")
        .row.q-pb-md
          .text-h6 Передвижение предметов в зале и изменение внешнего вида зала
        .row.q-pb-md
          .col
            .row
              q-radio(v-model="movement" val="first" label="Разрешено самостоятельно")
            .row
              q-radio(v-model="movement" val="second" label="По согласованию с администратором")
        .row.q-pb-xs
          span Штраф, ₽
        .row.q-pb-xl
            q-input(v-model="penalty" outlined dense)
        .row.q-pb-md
          .text-h6 Вход с домашними животными
        .row.q-pb-xl
          .col
            .row
              q-radio(v-model="pet" val="first" label="Разрешен")
            .row
              q-radio(v-model="pet" val="second" label="По согласованию с администратором")
            .row
              q-radio(v-model="pet" val="third" label="Запрещен")
            .row
              q-radio(v-model="pet" val="fourth" label="За дополнительную плату")
        .row.q-pb-md
          .text-h6 Вход с дикими животными
        .row.q-pb-xl
          .col
            .row
              q-radio(v-model="wildAnimal" val="first" label="Разрешен")
            .row
              q-radio(v-model="wildAnimal" val="second" label="По согласованию с администратором")
            .row
              q-radio(v-model="wildAnimal" val="third" label="Запрещен")
            .row
              q-radio(v-model="wildAnimal" val="fourth" label="За дополнительную плату")
        .row.q-pb-md
          .text-h6 Распитие алкогольной продукции
        .row.q-pb-xl
          .col
            .row
              q-radio(v-model="alcohol" val="first" label="Разрешен")
            .row
              q-radio(v-model="alcohol" val="second" label="По согласованию с администратором")
            .row
              q-radio(v-model="alcohol" val="third" label="Запрещен")
        .row.q-pb-md
          .text-h6 Наличие при себе документа удостоверяющего личность
        .row.q-pb-xl
          .col
            .row
              q-radio(v-model="identification" val="first" label="Не требуется")
            .row
              q-radio(v-model="identification" val="second" label="Требуется только ответственному лицу")
            .row
              q-radio(v-model="identification" val="third" label="Требуется всем участниками")
            .row
              q-radio(v-model="identification" val="fourth" label="Строго каждому участнику с оригиналом паспорта")
        .row.q-pb-md
          .text-h6 Наличие сменной обуви
        .indoorShoes.q-pb-xl
          .row
            .col
              .row
                q-radio(v-model="indoorShoes" val="first" label="Не требуется")
              .row
                q-radio(v-model="indoorShoes" val="second" label="Требуется")
          .row.q-pl-xl(v-if="indoorShoes === 'second'")
            .col-4
              q-radio(v-model="isProved" val="first" label="Предоставляется")
            .col-4
              q-radio(v-model="isProved" val="second" label="Не предоставляется")
          .row.q-pl-xl(v-if="isProved === 'first'")
            .col.q-pl-xl
              .row
                q-radio(v-model="isFree" val="first" label="Бесплатно")
              .row
                q-radio(v-model="isFree" val="second" label="Платно")
              .price.q-pl-md(v-if="isFree === 'second'")
                .row.q-pb-sm
                  span Цена, ₽
                .row
                  q-input(v-model="price" outlined dense)

        .row.q-pb-md
          .text-h6 Самостоятельная уборка зала
        .row.q-pb-xl
          .col
            .row
              q-radio(v-model="cleaning" val="first" label="Не требуется")
            .row
              q-radio(v-model="cleaning" val="second" label="Требуется произвести уборку ")
            .row.q-pb-sm
              q-radio(v-model="cleaning" val="third" label="Требуется заранее освободить помещение")
            .penalty(v-if="cleaning === 'third'")
              .row.q-pb-sm
                span Освободить заранее, мин
              .row.q-pb-sm
                q-input(v-model="leaveTime" outlined dense)
            .row
              q-checkbox(v-model="isPenalty" label="Установить штраф")
            .penalty(v-if="isPenalty")
              .row.q-pb-sm
                span Установить штраф
              .row.q-pb-sm
                q-input(v-model="extraPay2" outlined dense)
        .row.q-pb-md
          .text-h6 Ограничения на самостоятельные манипуляции с оснащением
        .row.q-pb-xl
          .col
            .row
              q-checkbox(v-model="devices.first" label="Смена насадок")
            .row
              q-checkbox(v-model="devices.second" label="Перемещение источников")
            .row
              q-checkbox(v-model="devices.third" label="Замена бумажного фона")
            .row
              q-checkbox(v-model="devices.fourth" label="Раскатка бумажного фона")
            .row
              q-checkbox(v-model="devices.fives" label="Штраф за нарушение")
        .row.q-pb-md
          .text-h6 Циклорама
        .row.q-pb-xl
          .col
            .row
              q-radio(v-model="cyclorama" val="first" label="Нет циклорамы")
            .row
              q-radio(v-model="cyclorama" val="second" label="Всегда свежеокрашенная")
            .row
              q-radio(v-model="cyclorama" val="third" label="Окрашивается по предварительному согласованию")
        .row.q-pb-md
          .text-h6 Прочие правила
        .row.q-pb-xs
          span Прочие детали
        .row.q-pb-sm
          .col
            textarea.q-pa-sm.text-grey-8(
              v-model="someText"
              rows=3
              style="width: 100%;"
            )
        .row.q-pb-md
          span Укажите в этом поле дополнительные правила. Они не олжны содержать ссылок на другие сайти и номера телефонов. Здесь так же можно указать размер штрмифов за нарушение правил.
        .row.q-pb-xl
          .col-6
            q-btn.bg-primary.text-white(label="Сохранить" outine dense no-caps style="width: 100%")
</template>

<script>
export default {
  name: 'rules',
  data: () => ({
    cancelation: 48,
    extraPay: 'first',
    video: 'first',
    movement: 'second',
    penalty: 1000,
    pet: 'fourth',
    wildAnimal: 'fourth',
    alcohol: 'third',
    identification: 'fourth',
    indoorShoes: 'second',
    isProved: 'first',
    isFree: 'second',
    price: 100,
    cleaning: 'third',
    leaveTime: 10,
    isPenalty: true,
    extraPay2: 500,
    devices: {
      first: true,
      second: true,
      third: false,
      fourth: true,
      fives: false
    },
    cyclorama: 'third',
    someText: ''
  })
}
</script>

<style scoped>

</style>
