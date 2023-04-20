const DEFAULT_NAME = '摸鱼小工具';
const USER_ID = '1';
// 将electron设置为全局变量
const { contextBridge, ipcRenderer } = (window as any).electron;
import Dexie, { Table } from 'dexie';

export interface Info {
  userId: string;
  goOnTime?: string;
  goOffTime?: string;
  tranlateAppId?: string;
  tranlateScrcetKey?: string;
}
export interface Tranlate {
  userId: string;
  tranlateAppId?: string;
  tranlateScrcetKey?: string;
}
class mainDexie extends Dexie {
  info!: Table<Info>;
  tranlateTable!: Table<Tranlate>;
  constructor() {
    super('mainDexie');
    this.version(2).stores({
      info: '&userId, goOnTime, goOffTime',
      tranlateTable: '&userId, tranlateAppId, tranlateScrcetKey',
    });

    // 打开数据库连接
    this.open().catch((err) => {
      console.error(err.stack || err);
    });

    this.info = this.table('info');
    this.tranlateTable = this.table('tranlateTable');
  }
}

const db = new mainDexie();

export { DEFAULT_NAME, contextBridge, ipcRenderer, USER_ID, db };
