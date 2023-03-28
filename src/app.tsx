import { RunTimeLayoutConfig } from '@umijs/max';
import Footer from '@/pages/Footer';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: './mofish/img_mofish_1.jpg',
    title: '摸鱼moFish',
    rightContentRender: (props) => <Footer prop={props} />,
    menu: {
      locale: false,
    },
    dva: {
      immer: true, // 表示是否启用 immer 以方便修改 reducer
      hmr: true, // 表示是否启用 dva model 的热更新
    },
    valtio: {},
  };
};
