<template lang="pug">
  .extraCharge
    q-table(
      :data="charge"
      :columns="columns"
    )
      template(#bottom)
      template(#body="props")
        q-tr
          q-td(v-for="({ __tdClass, name }, index) in columns" :key="index" :class="__tdClass")
            template(v-if="name !== 'charge'")
              u.text-primary.cursor-pointer {{ props.row[name] }}
                q-popup-edit(v-model="props.row[name]")
                  q-input(v-model="props.row[name]" dense autofocus)
            template(v-else) {{ props.row[name] }}
</template>

<script>
export default {
  name: 'extraCahrge',
  data: () => ({
    charge: [
      {
        charge: 'на час',
        mon: '500',
        tue: '500',
        wed: '500',
        thu: '500',
        fri: '500',
        sat: '500',
        sun: '500',
      }
    ],
    columns: [
      {
        name: 'charge',
        field: 'charge',
        label: 'Наценка',
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
  })
}
</script>

<style scoped>

</style>
