<template lang="pug">
  .jswidget.q-pt-lg
    .row.q-pb-md.justify-center
      .col-6
        .row.q-pb-md
          .text-h5 JS Widget
        .row.q-pb-xs
          .col.q-pr-sm
            span Локация
          .col
            span Залы
        .row.q-pb-md
          .col.q-pr-sm
            q-select(v-model="currentStudio" :options="data.studios" outlined dense)
          .col
            q-select(v-model="currentRoom" :options="roomsNames" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span Фон
          .col
            span Источник бронирования
        .row.q-pb-md
          .col.q-pr-sm
            q-select(v-model="currentBackground" :options="data.background" outlined dense)
          .col
            q-select(v-model="currentSource" :options="data.bookingSource" @input="changeSource" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span Ширина
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="data.width" outlined dense)
          .col.q-pr-sm
            q-select(v-model="currentUnit" :options="data.widthUnit" outlined dense)
          .col
            q-btn.bg-primary.text-white(
              label="Сгенерировать код"
              :disable="currentSource === ''"
              @click="generate"
              style="width: 100%;"
              no-caps
            )
        .row.q-pb-xs.justify-around
          .col.q-pr-sm
            span Код для вставки
          .col.q-pr-sm
            .text-primary.cursor-pointer(@click="copyWidget" style="text-align: right;") Скопировать
        .row.q-pb-md
          .col
            textarea.jswidgetArea.q-pa-sm.text-grey-8(v-if="isWidget" rows=3 style="width: 100%;")
            textarea.jswidgetArea.q-pa-sm.text-grey-8(v-if="!isWidget" v-model="newWidgetCode" rows=30 style="width: 100%;")

</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      currentStudio: '',
      currentRoom: '',
      roomsNames: [],
      currentRoomId: 1,
      currentBackground: '',
      currentSource: '',
      currentUnit: '',
      isWidget: true,
      newWidgetCode: '',
      widgetCode: `<!-- BEGIN UGOLOC CODE {literal} -->
  <div id='ugoloc'></div>
  <script type='text/javascript'>
    var widgetUrl = 'http://ugoloc.greencow.pro';
    (function () {
      var room_id = 41;
      var timestamp = Math.round(Date.now()/10000);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', widgetUrl + '/embed/booking.json?id=' + room_id);
      xhr.onload = function() {
        if (xhr.status === 200) {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = widgetUrl + '/assets/embed/ugoloc.embed.js?t=' + timestamp;
          var styles = document.createElement('link');
          styles.type = 'text/css';
          styles.rel = 'stylesheet';
          styles.href = widgetUrl + '/assets/embed/ugoloc.css?t=' + timestamp;
          var ugoloc = document.getElementById('ugoloc');
          var json = JSON.parse(xhr.responseText);
          document.body.appendChild(styles);
          ugoloc.innerHTML = json.html;
          ugoloc.appendChild(script);
        }
      };
      xhr.send();
    })();
    script>
<!-- {/literal} END UGOLOC CODE -->`,
      data: {}
    }
  },
  async created () {
    this.data = await this.$app.jswidget.getAll()
    this.currentStudio = this.data.studios[0]
    this.currentRoom = this.data.rooms[0].name
    this.roomsNames = this.data.rooms.map(item => item.name)
    this.currentBackground = this.data.background[0]
    this.currentUnit = this.data.widthUnit[0]
  },
  methods: {
    generate () {
      this.currentSource = ''
      this.isWidget = false
      const [{ id }] = this.data.rooms.filter(item => item.name === this.currentRoom)
      let arr = this.widgetCode.split('41')
      let temp = arr.pop()
      arr.push(id)
      arr.push(temp)
      this.newWidgetCode = arr.join('')
      arr = this.newWidgetCode.split('script>')
      temp = arr.pop()
      arr.push('</')
      arr.push('script>')
      arr.push(temp)
      this.newWidgetCode = arr.join('')
    },
    copyWidget () {
      const widgetNode = document.querySelector('.jswidgetArea textarea')
      widgetNode.focus()
      widgetNode.select()
      try {
        document.execCommand('copy')
      } catch (err) {
        console.error(`Can't copy`)
      }
    },
    changeSource () {
      this.isWidget = true
    }
  }
}
</script>

<style scoped>

</style>
