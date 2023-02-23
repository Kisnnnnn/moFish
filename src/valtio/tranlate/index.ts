import { proxy } from '@umijs/max';
import { sentBaiDuTranlateText } from '@/services/translate';
const tranlate = proxy({
  action: {
    async sendText(
      q: string,
      target: string,
      options?: { [key: string]: any },
    ) {
      return sentBaiDuTranlateText(
        {
          q: q,
          target: target,
        },
        options,
      );
    },
  },
});

export { tranlate };
