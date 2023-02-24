// 全局共享数据示例
import { useState } from 'react';
import { sentBaiDuTranlateText } from '@/services/translate';
import { msgTransErr, loading, closeLoading } from '@/utils/msg';
interface loadingInstance {
  destroy(key?: React.Key): void;
}
interface loading {
  msg: string;
  targetName: string;
}

export default {
  state: {
    user: {},
    targetName: '123',
  },
  effects: {
    *sendText(payload: any, { call, put }: any): any {
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
