import { IApi } from '@umijs/max';

export default (api: IApi) => {
  // 将eletrcon 添加到window
  api.modifyHTML(($) => {
    $('head').append([
      `<script>window.electron = require('electron');</script>`,
    ]);
    return $;
  });
};
