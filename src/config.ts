export const SITE = {
  /** 部署后的域名：替换为你自己的网址，用于生成 RSS 订阅和 SEO 链接 */
  website: "https://linmohan.fun/", 
  /** 网站作者：将显示在版权声明和元数据中 */
  author: "Bcamy",
  /** 作者主页：通常链接到你的个人简介、GitHub 或社交媒体 */
  profile: "https://linmohan.net/",
  /** 网站描述：显示在搜索引擎搜索结果中的简短介绍 */
  desc: "Bcamy's Personal Blog",
  /** 网站标题：显示在浏览器标签页和首页顶部 */
  title: "Bcamy's Blog",
  /** 社交分享图：当你的链接被分享到社交媒体时显示的默认预览图 */
  ogImage: "social.png",
  /** 主题模式：是否启用深色/浅色模式切换功能 */
  lightAndDarkMode: true,
  /** 首页展示数量：首页“最近发布”栏目下显示的文章篇数 */
  postPerIndex: 4,
  /** 分页数量：博客列表页（Posts 页面）每页显示的文章篇数 */
  postPerPage: 10,
  /** 定时发布边际时间：设置发布时间偏差量（默认 15 分钟），防止服务器时间同步误差 */
  scheduledPostMargin: 15 * 60 * 1000, 
  /** 是否显示归档页：启用后将展示按年份/月份排列的文章记录 */
  showArchives: true,
  /** 是否显示返回按钮：在文章详情页顶部显示“返回”链接 */
  showBackButton: true, 
  /** 编辑文章功能：允许读者通过链接直接跳转到 GitHub 修改源码 */
  editPost: {
    enabled: false, // 是否开启
    text: "Edit page", // 显示的文字
    url: "https://github.com/LINMOH/blog/edit/main/", // 你的仓库编辑地址
  },
  /** 动态生成分享图：开启后会为每篇文章自动生成包含标题的 OG 图片 */
  dynamicOgImage: true,
  /** 文字排列方向：ltr (左到右) | rtl (右到左) | auto */
  dir: "ltr", 
  /** HTML 语言代码：如 en, zh-CN 等。设为空则默认为 "en" */
  lang: "en", 
  /** 默认时区：影响日期格式化输出，中国通常设为 "Asia/Shanghai" */
  timezone: "Asia/Shanghai", 
} as const;