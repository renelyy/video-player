<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(video, index) in videos" :key="index">
        <el-card shadow="hover" @click.self="showVideoDialog(video)">
          <img
            v-if="video.thumbnail"
            :src="video.thumbnail"
            alt="Video Thumbnail"
            style="width: 100%; height: 200px; object-fit: cover"
          />
          <div style="padding: 14px">
            <h4>{{ video.title }}</h4>
            <a :href="video.description" target="_blank">{{ video.description }}</a>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-model="dialogVisible"
      title="视频播放"
      width="70%"
      @opened="playVideo"
    >
      <video ref="video" controls width="100%"></video>
    </el-dialog>
  </div>
</template>

<script>
import Hls from 'hls.js';

export default {
  name: 'VideoPlayer',
  props: {
    videos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      currentVideo: null,
      hls: null // 新增 hls 实例
    };
  },
  watch: {
    dialogVisible(val) {
      if (!val) this.stopVideo()
    }
  },
  methods: {
    showVideoDialog(video) {
      this.currentVideo = video;
      this.dialogVisible = true;
    },
    playVideo() {
      if (this.currentVideo && Hls.isSupported()) {
        const videoElement = this.$refs.video;
        this.hls = new Hls(); // 初始化 hls 实例
        this.hls.loadSource(this.currentVideo.url);
        this.hls.attachMedia(videoElement);
        this.hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoElement.play();
        });
      }
    },
    stopVideo() {
      if (this.hls) {
        this.hls.destroy(); // 销毁 hls 实例
        const videoElement = this.$refs.video;
        videoElement.pause(); // 停止视频播放
      }
    }
  }
};
</script>
