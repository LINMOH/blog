import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite"; // 导入 Tailwind CSS 的 Vite 插件支持
import sitemap from "@astrojs/sitemap"; // 自动生成站点地图（SEO 必备）
import remarkToc from "remark-toc"; // 自动生成 Markdown 目录的插件
import remarkCollapse from "remark-collapse"; // 支持折叠 Markdown 内容（如折叠目录）
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"; // Shiki 高亮器的增强插件（代码差异对比、局部高亮等）
import { transformerFileName } from "./src/utils/transformers/fileName"; // 自定义插件：在代码块顶部显示文件名
import { SITE } from "./src/config"; // 导入你在 src/config.ts 中定义的站点配置

// Astro 配置详情：https://astro.build/config
export default defineConfig({
  // 基础路径：从配置文件中读取你的网址
  site: SITE.website,

  // 集成插件列表
  integrations: [
    sitemap({
      // 过滤器：如果不显示归档页，则不将其加入站点地图
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],

  // Markdown 与代码高亮配置
  markdown: {
    // Remark 插件：处理 Markdown 语法转换
    remarkPlugins: [
      remarkToc, // 开启目录功能
      [remarkCollapse, { test: "Table of contents" }] // 将标题为 "Table of contents" 的内容默认折叠
    ],
    // Shiki 代码高亮配置
    shikiConfig: {
      // 针对深色和浅色模式设置不同的主题
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false, // 禁用默认颜色，使用主题颜色
      wrap: false, // 代码不自动换行（开启横向滚动）
      // 代码块增强转换器
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }), // 显示文件名样式
        transformerNotationHighlight(), // 支持 // [!code highlight] 语法高亮行
        transformerNotationWordHighlight(), // 支持 // [!code word:xxx] 语法高亮特定词汇
        transformerNotationDiff({ matchAlgorithm: "v3" }), // 支持 // [!code ++] 和 // [!code --] 语法显示差异
      ],
    },
  },

  // Vite 引擎底层配置
  vite: {
    plugins: [tailwindcss()], // 注入 Tailwind CSS 支持
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"], // 排除特定依赖的预编译，防止在生成动态 OG 图时报错
    },
  },

  // 图片优化配置
  image: {
    responsiveStyles: true, // 开启响应式图片样式
    layout: "constrained", // 图片布局方式：受约束（保持比例且不超过容器）
  },

  // 环境变量架构：定义项目中可以使用的变量
  env: {
    schema: {
      // 谷歌站点验证 ID
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public", // 客户端可访问
        context: "client",
        optional: true, // 可选配置
      }),
    },
  },

  // 实验性功能配置（前沿特性）
  experimental: {
    preserveScriptOrder: true, // 保持脚本执行顺序
    // 字体优化集成
    fonts: [
      {
        name: "Google Sans Code", // 字体名称
        cssVariable: "--font-google-sans-code", // 定义 CSS 变量以便在 Tailwind 中使用
        provider: fontProviders.google(), // 使用 Google Fonts 数据源
        fallbacks: ["monospace"], // 后备字体
        weights: [300, 400, 500, 600, 700], // 字重
        styles: ["normal", "italic"], // 样式
      },
    ],
  },
});