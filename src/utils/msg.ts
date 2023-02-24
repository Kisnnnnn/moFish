import { message } from 'antd';

const msgTransErr = (content?: string) =>
  message.error(
    content || '翻译出错了，请查看README或者是否翻译APP ID配置是否配置准确',
  );

const loading = (content?: string) =>
  message.loading({
    key: 'loading',
    content,
  });

const closeLoading = () => message.destroy('loading');

export { msgTransErr, loading, closeLoading };
