<template lang="pug">
  .dayPrices
    q-table(
      :data="prices"
      :columns="columns"
    )
      template(#bottom)
      template(#body="props")
        q-tr
          q-td(v-for="({ __tdClass, name }, index) in columns" :key="index" :class="__tdClass")
            template(v-if="name !== 'time'")
              u.text-primary.cursor-pointer {{ props.row[name] }}
                q-popup-edit(v-model="props.row[name]")
                  q-input(v-model="props.row[name]" dense autofocus)
            template(v-else) {{ props.row[name] }}
</template>

<script>
export default {
  name: 'extraCharge',
  props: {
    price: String
  },
  data () {
    return {
      prices: [
        {
          time: '1:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
        {
          time: '2:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
        {
          time: '3:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
        {
          time: '4:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
        {
          time: '5:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
        {
          time: '6:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
      ],
      prices1: [
        {
          time: '1:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
        {
          time: '2:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
        {
          time: '3:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
        {
          time: '4:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
        {
          time: '5:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
        {
          time: '6:00',
          mon: '500',
          tue: '500',
          wed: '500',
          thu: '500',
          fri: '500',
          sat: '500',
          sun: '500',
        },
      ],
      prices2: [
        {
          time: '1:00',
          mon: '654',
          tue: '654',
          wed: '654',
          thu: '654',
          fri: '654',
          sat: '654',
          sun: '654',
        },
        {
          time: '2:00',
          mon: '654',
          tue: '654',
          wed: '654',
          thu: '654',
          fri: '654',
          sat: '654',
          sun: '654',
        },
        {
          time: '3:00',
          mon: '654',
          tue: '654',
          wed: '654',
          thu: '654',
          fri: '654',
          sat: '654',
          sun: '654',
        },
        {
          time: '4:00',
          mon: '654',
          tue: '654',
          wed: '654',
          thu: '654',
          fri: '654',
          sat: '654',
          sun: '654',
        },
        {
          time: '5:00',
          mon: '654',
          tue: '654',
          wed: '654',
          thu: '654',
          fri: '654',
          sat: '654',
          sun: '654',
        },
        {
          time: '6:00',
          mon: '654',
          tue: '654',
          wed: '654',
          thu: '654',
          fri: '654',
          sat: '654',
          sun: '654',
        },
      ],
      prices3: [
        {
          time: '1:00',
          mon: '1654',
          tue: '1654',
          wed: '1654',
          thu: '1654',
          fri: '1654',
          sat: '1654',
          sun: '1654',
        },
        {
          time: '2:00',
          mon: '1654',
          tue: '1654',
          wed: '1654',
          thu: '1654',
          fri: '1654',
          sat: '1654',
          sun: '1654',
        },
        {
          time: '3:00',
          mon: '1654',
          tue: '1654',
          wed: '1654',
          thu: '1654',
          fri: '1654',
          sat: '1654',
          sun: '1654',
        },
        {
          time: '4:00',
          mon: '1654',
          tue: '1654',
          wed: '1654',
          thu: '1654',
          fri: '1654',
          sat: '1654',
          sun: '1654',
        },
        {
          time: '5:00',
          mon: '1654',
          tue: '1654',
          wed: '1654',
          thu: '1654',
          fri: '1654',
          sat: '1654',
          sun: '1654',
        },
        {
          time: '6:00',
          mon: '1654',
          tue: '1654',
          wed: '1654',
          thu: '1654',
          fri: '1654',
          sat: '1654',
          sun: '1654',
        },
      ],
      columns: [
        {
          name: 'time',
          field: 'time',
          label: 'Время',
          style: 'width: 10px'
        },
        {
          name: 'mon',
          field: 'mon',
          label: 'ПН'
        },
        {
          name: 'tue',
          field: 'tue',
          label: 'ВТ'
        },
        {
          name: 'wed',
          field: 'wed',
          label: 'СР'
        },
        {
          name: 'thu',
          field: 'thu',
          label: 'ЧТ'
        },
        {
          name: 'fri',
          field: 'fri',
          label: 'ПТ'
        },
        {
          name: 'sat',
          field: 'sat',
          label: 'СБ'
        },
        {
          name: 'sun',
          field: 'sun',
          label: 'ВС'
        }
      ]
    }
  },
  watch: {
    price (newValue) {
      switch (this.price) {
        case 'prices1':
          this.prices = this.prices1
          break
        case 'prices2':
          this.prices = this.prices2
          break
        case 'prices3':
          this.prices = this.prices3
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
