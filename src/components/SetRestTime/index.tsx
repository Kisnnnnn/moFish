import { Space, TimePicker } from 'antd';
const dayjs = require('dayjs');
const localStorage = require('localStorage');

interface Props {}
const SetRestTime: React.FC<Props> = (props) => {
  const onChange = (value: any) => {
    let time = dayjs(value).format('HH:mm');
    localStorage.setItem('goOffTime', time);
  };
  return (
    <Space>
      <div>
        设置你的下班时间
        <TimePicker onChange={onChange} format="HH:mm" />
      </div>
    </Space>
  );
};
export default SetRestTime;
