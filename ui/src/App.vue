<template>
  <div>
    <VideoPlayer :videos="videos" />
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue';
import axios from 'axios'; // 导入 Axios 库

export default {
  components: {
    VideoPlayer
  },
  data() {
    return {
      videos: [] // 初始化为空
    };
  },
  created() {
    // 在组件创建时加载视频列表
    this.loadVideos();
  },
  methods: {
    async loadVideos() {
      try {
        // 发送 HTTP 请求获取视频列表
        const response = await axios.get('http://localhost:3000/videos'); // 你需要根据实际情况修改 URL
        console.log(response.data)
        // 将获取到的视频列表存储到组件的数据中
        this.videos = response.data;
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }
  }
};
</script>
