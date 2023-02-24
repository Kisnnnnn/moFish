const DEFAULT_NAME = '摸鱼小工具';
// 将electron设置为全局变量
const { contextBridge, ipcRenderer } = (window as any).electron;
export { DEFAULT_NAME, contextBridge, ipcRenderer };
