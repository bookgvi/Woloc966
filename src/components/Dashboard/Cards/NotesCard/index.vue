<template lang="pug">
  standart-card
    .q-pa-none
    name-slot(name="Заметки")
    template(v-if="!isNoteEditMode")
      q-card-section.q-pb-none
        q-card.text-body2.q-mb-md(
          v-for="(item, index) in options"
          :style="{ 'background-color':  '#' + item.color }"
          :key="index"
        )
          q-card-section
            .row.col-12.justify-between
              .col-8
                span.text-bold {{ item.title }}
              .col.text-right
                span.text-caption(
                  style="cursor: pointer"
                  @click="noteEditMode(item, index)"
                  @mouseover="mouseOver"
                  @mouseleave="mouseLeave"
                ) {{ formatDate(item.date) }}
          q-card-section
            span {{ item.text }}
      q-card-actions.q-pt-none.q-pl-md.q-pb-md
        q-btn.text-body2.text-black(
          outline
          size="sm"
          label="Добавить заметку"
          no-caps
          @click="add"
          color="secondary"
        )
    template(v-else)
      .q-pt-md.q-pa-none
        q-card-section.q-pa-none.q-mx-md(
          :style="{ 'background-color': '#' + itemBuffer.color }"
          style="min-width: 370px"
        )
          q-input.text-body2(
            v-model="itemBuffer.title"
            placeholder="Заголовок"
            outlined
            dense
          )
          q-input.text-body2(
            v-model="itemBuffer.text"
            placeholder="Заметка"
            type="textarea"
            outlined
            dense
          )
        q-card-actions.q-px-md.q-pb-md
          .row.col-12
            .col-8.row.justify-between.items-center.q-pr-sm
              q-btn.text-body2.text-black(
                outline
                size="sm"
                label="Отменить"
                no-caps
                style="width: 70px"
                @click="isNoteEditMode = false"
              )
              q-btn.text-body2.text-black(
                outline
                size="sm"
                label="Сохранить"
                no-caps
                style="width: 70px"
                @click="save"
              )
              q-btn.text-body2.text-black(
                outline
                v-if="itemBuffer.id && itemBuffer.id > 0"
                size="sm"
                style="width: 70px"
                label="Удалить"
                no-caps
                @click="dialog=!dialog"
              )
                q-dialog(
                  persistent
                  v-model="dialog"
                )
                  q-card
                    q-card-section.col-12.flex.justify-center.items-center
                      span Вы уверены, что хотите удалить заметку?
                    q-card-actions.col-12.flex.justify-center.items-center
                      q-btn(
                        color="black"
                        label="Отмена"
                        flat
                        v-close-popup
                      )
                      q-btn(
                        @click="deleteNote"
                        color="negative"
                        label="Удалить"
                        v-close-popup
                      )
            .col.row.justify-between.items-center.q-pl-sm
              q-btn(
                size="sm"
                flat
                v-for="(color, index) in colors"
                style="width: 25px"
                @click="itemBuffer.color = color"
                :style="{ 'background-color':  '#' + color }"
                :key="index"
              )
</template>

<script>

import StandartCard from '../CommonModules/StandartCard'
import NameSlot from '../CommonModules/NameSlot'
const colors = ['B6E1FD', 'F9FAB2', 'FF9EC8', 'BAFFBF']

export default {
  name: 'NotesCard',
  components: { NameSlot, StandartCard },
  data () {
    return {
      dialog: false,
      isNoteEditMode: false,
      colors: [],
      targetTextBuffer: '',
      itemBuffer: {},
    }
  },
  async created () {
    this.colors = [...colors]
    this.loadData()
  },
  computed: {
    options () {
      return this.$app.organizationNotes.list
    }
  },
  methods: {
    mouseOver (e) {
      this.targetTextBuffer = e.target.innerText
      e.target.innerText = 'Редактировать'
    },
    async loadData () {
      await this.$app.organizationNotes.getAll()
    },
    mouseLeave (e) {
      e.target.innerText = this.targetTextBuffer
      this.targetTextBuffer = ''
    },
    noteEditMode (item) {
      this.itemBuffer = Object.assign({}, item)
      this.isNoteEditMode = true
    },
    async save () {
      if (!this.itemBuffer) return
      const params = {
        title: this.itemBuffer.title,
        text: this.itemBuffer.text,
        color: this.itemBuffer.color
      }
      if (this.itemBuffer.id > 0) {
        const id = this.itemBuffer.id
        await this.$app.organizationNotes.updateOne(id, params)
      } else {
        await this.$app.organizationNotes.addNew(params)
      }
      this.isNoteEditMode = false
      this.itemBuffer = Object.assign({})
      await this.loadData()
    },
    async deleteNote () {
      if (!this.itemBuffer || this.itemBuffer.id === 0) return
      await this.$app.organizationNotes.deleteOne(this.itemBuffer.id)
      this.isNoteEditMode = false
      this.itemBuffer = Object.assign({})
      await this.loadData()
    },
    add () {
      this.itemBuffer = Object.assign({
        id: 0,
        title: '',
        text: '',
        color: this.colors[0]
      })
      this.isNoteEditMode = true
    },
    formatDate (date) {
      return this.$moment(date).format('DD MMMM')
    }
  },
}
</script>

<style scoped>

</style>
