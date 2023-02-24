import { ipcRenderer } from '@/constants';

const send = function (event: string, ...args: any[]) {
  console.log(args);

  ipcRenderer.send(event, args);
};

const openUrl = function (url: string) {
  send('openBlankUrl', url);
};

export { send, openUrl };
