<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(timeline, index) in timelineData"
        :key="index"
        placement="top"
        size="large"
        color="rgba(0, 173, 239, 1.00)"
        :class="{'timeline-left': index % 2 === 1}"
        :timestamp="timeline.timestamp">
        <el-card>
          <div class="timeline-content" v-for="(cont, index) in timeline.content" :key="index">{{cont}}</div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-button
      type="primary"
      @click="characterFilter = true"
      class="user-filter"
      icon="el-icon-user-solid"
      circle></el-button>
    <el-drawer
      title="选择人物"
      direction="rtl"
      size="50%"
      :withHeader="false"
      :visible.sync="characterFilter">
      <div class="character-title">选择人物</div>
      <div class="character-wrap">
        <div class="character-item"
          :class="{'character-selected': characterSelected === character.label}"
          v-for="(character, index) in characters"
          @click="changeCharacter(character)"
          :key="character.label">
          <div class="character-label">
            {{character.label}}
          </div>
          <el-divider v-if="index !== characters.length - 1"></el-divider>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default Vue.extend({
  data() {
    return {
      allTimelineData: [],
      timelineData: [],
      characterFilter: false,
      characters: [],
      characterSelected: '',
    }
  },
  methods: {
    changeCharacter(character) {
      if (this.characterSelected !== character.label) {
        this.characterSelected = character.label
        let timelineData = []
        this.allTimelineData.forEach(timeline => {
          let cont = timeline.content.filter(c => character.contents.some(charac => c.includes(charac)))
          if (cont.length) {
            timelineData.push({timestamp: timeline.timestamp, content: cont})
          }
        })
        this.timelineData = timelineData
      } else {
        this.characterSelected = ''
        this.timelineData = this.allTimelineData
      }
      this.characterFilter = false
    },
  },
  created() {
    axios.get(`${process.env.BASE_URL}data/timeline.json`).then(res => {
      this.timelineData = res.data
      this.allTimelineData = res.data
    })
    axios.get(`${process.env.BASE_URL}data/character.json`).then(res => {
      this.characters = res.data
    })
  },
})
</script>
<style lang="scss" scoped>
.timeline-content {
  white-space: pre-wrap;
  margin-bottom: 15px;
  vertical-align: middle;
  &:last-child {
    margin-bottom: 0;
  }
}
.user-filter {
  position: fixed;
  right: 30px;
  bottom: 30px;
}
.character-title {
  padding-left: 8%;
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
  color: #00adef;
  border-bottom: 1px solid #00adef;
}
.character-wrap {
  padding: 30px 0;
}
.character-item {
  width: 100%;
  padding-left: 8%;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  .character-label {
    margin-left: 10px;
  }
  &.character-selected {
    color: #409eff;
    font-weight: bold;
  }
}
</style>