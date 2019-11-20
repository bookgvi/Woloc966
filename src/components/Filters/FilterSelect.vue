<template lang="pug">
  q-btn.q-py-none.q-px-sm(
    outline
    no-caps
    dense
    :label="title"
    :disabled="disabled"
  )
    q-popup-proxy(ref="QPopupProxy")
      slot
      q-field.row.col-12.text-body2.q-ml-sm.q-px-md.q-pt-lg(
        v-if="isRange"
        borderless
        style="width: 80%;"
        )
        q-range(
          v-model="currentValue"
          label-always
          markers
          :right-label-value="rightLabel"
          :min="0"
          :max="10000"
          :step="500"
          color="green"
        )
      q-option-group.text-body2.q-px-md.q-pt-md(
        v-else
        color="black"
        :type="type"
        :options="listOptions"
        v-model="currentValue"
      )
      .text-body2.q-px-md
        q-checkbox(
          v-if="selectAllLabel"
          :label="selectAllLabel"
          :value="selectAllState"
          @input="toggleSelectAll"
        )
      q-btn-group.q-pa-md(outline)
        q-btn.q-mr-md(
          label="Отменить"
          no-caps
          :style="{ border: '#f0f0f0 solid 1px' }"
          @click="onReset"
        )
        q-btn(
          label="Применить"
          color="primary"
          no-caps
          @click="onApply"
        )
</template>

<script>
export default {
  name: 'filter-select',
  data: () => ({
    currentValue: [],
  }),
  created () {
    this.currentValue = this.value
  },
  watch: {
    value (value) {
      this.currentValue = value
    }
  },
  props: {
    title: String,
    selectAllLabel: String,
    isRange: Boolean,
    models: Array,
    options: Array,
    type: {
      type: String,
      default: 'checkbox'
    },
    value: {
      validator (prop) {
        return prop === null || prop instanceof Array || typeof prop === 'number' || prop instanceof Object
      },
    },
  },
  computed: {
    rightLabel () {
      return (this.currentValue.max < 10000) ? this.currentValue.max : 'максимум'
    },
    listOptions () {
      if (this.isRange === true) return {}
      return this.options || this.models.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    },
    disabled () {
      if (this.isRange === true) return false
      return !this.listOptions.length
    },
    selectAllState () {
      const { length } = this.currentValue

      if (!length) return false
      if (length === this.listOptions.length) return true

      return null
    }
  },
  methods: {
    hidePopup () {
      this.$refs.QPopupProxy.hide()
    },
    onApply () {
      this.$emit('change', this.currentValue)
      this.hidePopup()
    },
    onReset () {
      this.currentValue = this.value
      this.hidePopup()
    },
    toggleSelectAll (selected) {
      this.currentValue = selected
        ? this.listOptions.map(({ value }) => value)
        : []
    }
  }
}
</script>
