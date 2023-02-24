import { message } from 'antd';

const msgTransErr = (content?: string) =>
  message.error(
    content || '翻译出错了，请查看README或者是否翻译APP ID配置是否配置准确',
  );

const loading = (content?: string, key?: string) =>
  message.loading({
    key: key || 'loading',
    content,
  });

const closeLoading = () => message.destroy('loading');

const msgSuccess = (content?: string, key?: string) =>
  message.success({
    key: key || 'loading',
    content,
  });
export { msgTransErr, loading, closeLoading, msgSuccess };
