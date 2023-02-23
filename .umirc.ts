import { defineConfig } from '@umijs/max';

const isDev = process.env.NODE_ENV === 'development';
export default defineConfig({
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
  valtio: {},
  layout: {
    // 关闭国际化
    locale: false,
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: 'CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
    {
      name: '玩具',
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
      path: '/translate',
      component: './Translate',
    },
    {
      path: '/*',
      component: '@/pages/404.tsx',
    },
  ],
  npmClient: 'pnpm',
});
