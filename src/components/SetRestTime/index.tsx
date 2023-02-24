import { Space, TimePicker } from 'antd';
import { history } from '@umijs/max';
import { msgSuccess } from '@/utils/msg';
const dayjs = require('dayjs');
const localStorage = require('localStorage');

interface Props {}
const SetRestTime: React.FC<Props> = (props) => {
  const onChange = (value: any) => {
    let time = dayjs(value).format('HH:mm');
    localStorage.setItem('goOffTime', time);
    msgSuccess('设置成功！');
    history.push('/');
  };
  return (
    <Space>
      <div>
        <div style={{ fontSize: '20px', margin: '0 0 20px 0' }}>设置你的下班时间</div>
        <TimePicker onChange={onChange} size="large" format="HH:mm" />
      </div>
    </Space>
  );
};
export default SetRestTime;
