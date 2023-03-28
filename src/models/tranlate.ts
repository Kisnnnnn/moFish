// 全局共享数据示例
import { sentBaiDuTranlateText } from '@/services/translate';
import { msgTransErr, loading, closeLoading } from '@/utils/msg';

export default {
  state: {
    user: {},
    targetName: '123',
  },
  effects: {
    *sendText(payload: any): any {
      loading();

      const { q, target, options } = payload;
      const rtn: any = yield sentBaiDuTranlateText(
        {
          q: q,
          target: target,
        },
        options,
      );

      closeLoading();

      if (rtn.trans_result && rtn.trans_result.length) {
        return rtn.trans_result[0];
      } else {
        msgTransErr();
        return;
      }
    },
  },
  reducers: {},
};
