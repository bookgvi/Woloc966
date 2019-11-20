<template lang="pug">
  .images
    h6.q-mb-md Изображения
    .row.q-pb-sm
      .col
        q-btn.q-btn--no-uppercase(label="Выбрать файл" outline dense)
    .row.no-wrap.q-pb-lg(v-if="!isShow")
      draggable(v-model="images")
        .inline-block(v-for="index in 4" :key="index" title="Drag and drop")
          q-img.q-mr-sm.q-mb-sm.cursor-pointer(:src="images[index - 1].url" style="height: 140px; width: 140px")
            q-btn.absolute-top-right(icon="close" class="block" dense flat color="white" title="close")
    .row.no-wrap.q-pb-lg(v-if="isShow")
      draggable(v-model="images")
        .inline-block(v-for="(item, index) in images" :key="index" title="Drag and drop")
          q-img.q-mr-sm.q-mb-sm.cursor-pointer(:src="item.url" style="height: 140px; width: 140px")
            q-btn.absolute-top-right(icon="close" class="block" dense flat color="white" title="close")
    .row
      .col
        .cursor-pointer(v-if="!isShow" @click="isShow = !isShow" style="font-size: 18px")
          q-icon(name="keyboard_arrow_down")
          span.text-primary &nbsp; Показать все {{ images.length }} изображений
        .cursor-pointer(v-if="isShow" @click="isShow = !isShow" style="font-size: 18px")
          q-icon(name="keyboard_arrow_up")
          span.text-primary &nbsp; Скрыть все изображения
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'images',
  components: { draggable },
  data: () => ({
    isShow: false,
    images: [
      { url: 'http://placeimg.com/640/480/animals' },
      { url: 'http://placeimg.com/640/480/nature' },
      { url: 'http://placeimg.com/640/480/people' },
      { url: 'http://placeimg.com/640/480/animals' },
      { url: 'http://placeimg.com/640/480/architecture' },
      { url: 'http://placeimg.com/640/480/animals' },
      { url: 'http://placeimg.com/640/480/nature' },
      { url: 'http://placeimg.com/640/480/people' },
      { url: 'http://placeimg.com/640/480/animals' },
      { url: 'http://placeimg.com/640/480/architecture' },
      { url: 'http://placeimg.com/640/480/tech' }
    ]
  })
}
</script>

<style scoped>
  .closeBtn {
    position: relative;
  }
</style>
