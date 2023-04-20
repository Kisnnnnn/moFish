import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { history } from '@umijs/max';
import { ipcRenderer } from '@/constants';
import './css/fcgame.less';

interface DataType {
  key: string;
  player1: string;
  player2: string;
}

const goBack = () => {
  history.back();
};
const openFC = () => {
  ipcRenderer.send('openFCGameWindow');
};
const columns: ColumnsType<DataType> = [
  {
    title: '按键',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'player1',
    dataIndex: 'player1',
    key: 'player1',
  },
  {
    title: 'player1',
    dataIndex: 'player2',
    key: 'player2',
  },
];

const data: DataType[] = [
  {
    key: 'Left',
    player1: '按键 A',
    player2: '数字-4',
  },
  {
    key: 'Right',
    player1: '按键 D',
    player2: '数字-6',
  },
  {
    key: 'Up',
    player1: '按键 W',
    player2: '数字-8',
  },
  {
    key: 'Down',
    player1: '按键 S',
    player2: '数字-2',
  },
  {
    key: 'A',
    player1: '按键 A',
    player2: '数字-7',
  },
  {
    key: 'B',
    player1: '按键 B',
    player2: '数字-9',
  },
  {
    key: 'AA',
    player1: '按键 Z',
    player2: '数字-/',
  },
  {
    key: 'BB',
    player1: '按键 X',
    player2: '数字-*',
  },
  {
    key: 'Start',
    player1: '按键 Enter',
    player2: '数字-1',
  },
  {
    key: 'Select',
    player1: '按键 Ctrl',
    player2: '数字-3',
  },
];

const Arder: React.FC = () => {
  openFC();
  return (
    <div className="fcgame">
      <div className="header">
        <Button type="primary" onClick={goBack}>
          返回
        </Button>
        <Button type="primary" onClick={openFC}>
          再次打开游戏机
        </Button>
      </div>
      <Table
        columns={columns}
        pagination={{
          disabled: true,
        }}
        dataSource={data}
      />
    </div>
  );
};

export default Arder;
