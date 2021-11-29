# 去 ™ 的阿里网盘 PC 客户端

网盘上的影视资源，一般都是使用网盘客户端下载后再观看，这样大大影响体验（~~社畜本来就没时间，还 ™ 等你下载完，那时候我早就睡觉了~~）。最好能在线观看！

## 方法一：nginx 代理

<iframe src="https://gene9831.github.io/no-aDrive-client/index.html" width='100%'></iframe>

## 方法二：ffplay

## 准备

- [阿里云盘](https://www.aliyundrive.com/drive/)
- chrome 插件 [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) + 脚本

  - [阿里云盘链接提取](https://greasyfork.org/zh-CN/scripts/425955-%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98) 在线观看的前提是能得到链接！
  - [阿里云盘字幕](https://greasyfork.org/zh-CN/scripts/431503-%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98%E5%AD%97%E5%B9%95) 如果你只想在浏览器上观看的话，这个应该可以满足你了，不过网页上清晰度最高好像是 720p，看看剧还行（~~那你为啥不用手机~~）

- [ffmpeg](https://ffmpeg.org/download.html) 里面的 ffplay，万能本地播放器
  > 既然可以直接获取到链接，为啥不用 potplayer 播放链接，而是使用 ffplay。因为链接需要加个 http header 才可以播放！

## 获取链接

阿里云盘网页上点点点，就可以得到链接了（链接有效期好像不长，不过够看电影了）

## 播放

```bash
ffplay -referer "https://www.aliyundrive.com/" -vf "subtitles=/path/to/subtitle" "VIDEO_URL"
```

添加**必要的** http header

```bash
-referer "https://www.aliyundrive.com/"
// 这两个写法一样
-headers "referer: https://www.aliyundrive.com/"
```

指定字幕文件，支持 ass。此步可省略

```bash
-vf "subtitles=/path/to/subtitle"
```

> 路径分割符最好使用 "/"，使用 "\\" 需要转义

ffplay 常用快捷键 [reference](https://www.cnblogs.com/vkSwift/p/13946727.html)

| 按键              | 作用                                             |
| ----------------- | ------------------------------------------------ |
| Q, Esc            | 退出                                             |
| F                 | 全屏                                             |
| P, 空格           | 暂停                                             |
| W                 | 显示音频波形                                     |
| S                 | 逐帧显示                                         |
| 左方向键/右方向键 | 向后 10s/向前 10s                                |
| 上方向键/下方向键 | 向后 1min/向前 1min                              |
| page down/page up | 向后 10min/向前 10min                            |
| 鼠标点击屏幕      | 跳转到指定位置（根据鼠标位置相对屏幕的宽度计算） |

## 下载

如果你只想下载可以使用 ffmpeg 或者 aria2，下载前添加个的 http header 就可以了
