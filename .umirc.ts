import { defineConfig } from '@umijs/max';
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  alias: {},
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  outputPath: 'build',
  publicPath: isDev ? '/' : './',
  history: {
    type: 'hash',
  },
  dva: {},
  layout: {
    // 关闭国际化
    locale: false,
  },
  headScripts: [
    {
      src: '/head/index.js',
    },
  ],
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      icon: 'HomeOutlined',
      path: '/home',
      component: './Home',
    },
    {
      name: '玩具',
      icon: 'SmileOutlined',
      path: '/arder',
      component: './Arder',
      routes: [
        {
          path: ':item',
          component: './Arder/$item',
        },
      ],
    },
    {
      name: '翻译',
      icon: 'FieldStringOutlined',
      path: '/translate',
      component: './Translate',
    },
    {
      path: '/translate/set',
      component: './Translate/set',
    },
    {
      name: '设置工作时间',
      path: '/settime',
      icon: 'SettingOutlined',
      component: './SetTime',
    },
    {
      path: '/*',
      component: '@/pages/404.tsx',
    },
  ],
  npmClient: 'pnpm',
});
