/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';
import md5 from 'js-md5';
import { getTranslate } from '@/utils/db';
const baiduApi = 'https://fanyi-api.baidu.com/api/trans/vip/translate?';

export async function sentBaiDuTranlateText(
  params: {
    q: string; // 翻译文字
    target: string; // 翻译目标
  },
  options?: { [key: string]: any },
) {
  const {
    tranlateScrcetKey = '',
    tranlateAppId = '',
  }: {
    tranlateAppId?: string;
    tranlateScrcetKey?: string;
  } = await getTranslate();
  const BAIDU_INFO = {
    appid: tranlateAppId,
    key: tranlateScrcetKey,
  };
  console.log(BAIDU_INFO);

  // appid: 20230222001571068,
  // key: m7a_NpIItmOKDBLJf043,
  const salt = parseInt((Math.random() * 1000000000).toString());
  const sign = md5(BAIDU_INFO.appid + params.q + salt + BAIDU_INFO.key);
  const requestParams = encodeURI(
    `q=${params.q}&from=auto&to=${params.target}&appid=${BAIDU_INFO.appid}&salt=${salt}&sign=${sign}`,
  );
  return request<TranslateApi.baiduRequest>(baiduApi + requestParams, {
    method: 'GET',
    ...(options || {}),
  }).catch((err) => {
    const { message, code } = err;

    return { message, code };
  });
}
