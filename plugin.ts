import { IApi } from '@umijs/max';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $('body').append([
      `<script>window.electron = require('electron');</script>`,
    ]);
    return $;
  });
};
