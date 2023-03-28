import { ipcRenderer } from '@/constants';

const send = function (event: string, ...args: any[]) {
  console.log(args);

  ipcRenderer.send(event, args);
};

const openUrl = function (url: string) {
  send('openBlankUrl', url);
};

const setVal = async (key: string, val: any) => {
  return await ipcRenderer.invoke('setVal', key, val);
};

const getVal = async (key: string, defaultVal?: any) => {
  return await ipcRenderer.invoke('getVal', key, defaultVal);
};

const clearVal = async () => {
  return await ipcRenderer.invoke('clearVal');
};

const delVal = async (key: string) => {
  return await ipcRenderer.invoke('delVal', key);
};

const hasVal = async (key: string) => {
  return await ipcRenderer.invoke('hasVal', key);
};

export { send, openUrl, setVal, getVal, clearVal, delVal, hasVal };
