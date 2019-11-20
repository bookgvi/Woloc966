<template lang="pug">
  .q-py-none
    .col-12.row.justify-left.items-center
      q-list(style="width: 100%")
        q-item.text-body2.q-px-none(
          v-for="(member, index) in members"
          :key="index"
        )
          .col-12
            q-input.text-body2(
              dense
              color="#B5B5B5"
              v-model="members[index]"
            )
              template(v-slot:append)
                q-btn(
                  flat
                  @click="removeMember(index)"
                  color="#B5B5B5"
                  icon="remove"
                )
    .col-12.row.justify-around.items-center
      .col-12.q-py-md
        span.text-body2 Добавить нового участника
        q-input.text-body2(
          dense
          color="#B5B5B5"
          v-model="newMember"
        )
          template(v-slot:append)
            q-btn(
              flat
              @click="addNewMember"
              color="#B5B5B5"
              icon="add"
            ) {{ membersComp }}
</template>

<script>
export default {
  name: 'CalendarMembers',
  data () {
    return {
      members: this.startMembers,
      newMember: ''
    }
  },
  computed: {
    membersComp () {
      return this.membersChange()
    }
  },
  methods: {
    removeMember (index) {
      this.members.splice(index, 1)
    },
    addNewMember () {
      this.members.push(this.newMember)
      this.newMember = ''
    },
    membersChange () {
      this.$emit('membersChange', this.members)
    }
  },
  props: {
    startMembers: Array
  },
  watch: {
    startMembers (v) {
      this.members = v
    }
  }
}
</script>

<style scoped>

</style>
