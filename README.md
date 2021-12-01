# 去 ™ 的阿里网盘 PC 客户端

## 获取资源链接

PC 网页上提取文件链接，使用 [TamperMonkey 插件](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) + 脚本

- [阿里云盘链接提取](https://greasyfork.org/zh-CN/scripts/425955-%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98) 链接有效期只有几个小时，下载或在线观看电影已经足够了
- [阿里云盘字幕](https://greasyfork.org/zh-CN/scripts/431503-%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98%E5%AD%97%E5%B9%95) 如果你只想在浏览器上观看的话，这个应该可以满足你了

## 播放

[阿里云盘链接提取](https://greasyfork.org/zh-CN/scripts/425955-%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98)这个脚本可以让你直接在浏览器下载文件。但是复制链接用播放器打开会返回错误：权限不足。因为阿里资源服务端对 http 头中的 referer 字段进行了限制，需要添加头部 `Referer: https://www.aliyundrive.com/`

下面介绍两个方法如何添加头部并使用播放器播放

### 方法一：nginx 代理（推荐使用）

nginx 中的反向代理是可以使用 `proxy_set_header` 指令来设置额外的头部。大致流程是，将阿里云资源链接进行 `URLEncode`，当作 query 参数。例如：

```txt
http://localhost:8888/?redirect=URL_ENCODED
```

然后 nginx 提取 `redirect` 参数解码后，通过 `proxy_set_header` 指令来设置头部，最后使用 `proxy_pass` 指令代理到 `redirect` 的值。

建议使用 docker 容器，具体的配置文件在 [nginx-adrive](./nginx-adrive)

docker 启用 nginx 命令：

```bash
docker run -d --name nginx-adrive -p 8888:80 \
           -v /path/to/nginx-adrive/nginx.conf:/etc/nginx/nginx.conf \
           -v /path/to/nginx-adrive/njs:/etc/nginx/njs \
           nginx
```

使用[链接转换](https://gene9831.github.io/no-aDrive-client/index.html)，将阿里云资源转接转换成本地可播放链接

### 方法二：ffplay

下载[ffmpeg](https://ffmpeg.org/download.html) 需要用到里面的 ffplay，一个万能本地播放器

播放命令

```bash
ffplay -referer "https://www.aliyundrive.com/" \
       -vf "subtitles=/path/to/subtitle" \
       "VIDEO_URL"
```

解释说明：

1. 添加**必要的** http header

   ```bash
   -referer "https://www.aliyundrive.com/"
   // 这两个写法一样
   -headers "referer: https://www.aliyundrive.com/"
   ```

2. 指定字幕文件，支持 ass。此步可省略

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

如果你只想下载可以使用 ffmpeg 或者 aria2，下载前添加的必要的 http header 就可以了

```http
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.34
Referer: https://www.aliyundrive.com/
```
