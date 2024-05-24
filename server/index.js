const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors()); // 允许跨域请求

// 配置静态文件目录
app.use(express.static(path.join(__dirname, 'videos')));

// 获取视频列表的路由
app.get('/videos', (req, res) => {
  // 在这里根据实际情况获取视频列表数据
  const videos = [
    {
      title: '供暖器',
      description: 'https://leetcode.cn/problems/heaters/description/',
      url: 'http://localhost:3000/ts_files/output1/output1.m3u8',
      thumbnail: 'http://localhost:3000/thumbnail1.jpg'
    },
    {
      title: '基数排序',
      description: 'Description for Video 2',
      url: 'http://localhost:3000/ts_files/output2/output2.m3u8',
      thumbnail: 'http://localhost:3000/thumbnail2.jpg'
    }
    // 可以根据需要添加更多视频项
  ];

  // 发送视频列表作为 JSON 响应
  res.json(videos);
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
