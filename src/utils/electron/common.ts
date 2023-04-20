import { ipcRenderer } from '@/constants';

const send = function (event: string, ...args: any[]) {
  ipcRenderer.send(event, args);
};

const openUrl = function (url: string) {
  send('openBlankUrl', url);
};

export { send, openUrl };
