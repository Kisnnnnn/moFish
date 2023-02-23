// 运行时配置

import { RunTimeLayoutConfig } from '@umijs/max';
import Footer from '@/pages/Footer';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout: RunTimeLayoutConfig = (initialState) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    title: '摸鱼moFish',
    footerRender: () => <Footer />,
    menu: {
      locale: false,
    },
  };
};
