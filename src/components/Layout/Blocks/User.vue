<template lang="pug">
  .q-px-md.justify-end
    q-list
      q-item.col-12
        q-item-section.col-9
          span {{'Username'}}
        q-item-section.col-3
          q-avatar
            img(src="https://cdn.quasar.dev/img/avatar.png")
</template>

<script>
export default {
  name: 'User'
}
</script>

<style scoped lang="stylus">
/*  .round
    border 0 solid
    border-radius 30px
  .user
    width 150px
    padding-right 20px
  .img
    width 30px
    height 30px
    object-fit cover
    color black
  .username
    margin auto
    margin-right 20px
    color #9b9b9b
    font-size 14px
    font-family Montserrat
    font-weight 500
    letter-spacing -0.3px
    line-height 18px
    text-align right
 */
</style>
