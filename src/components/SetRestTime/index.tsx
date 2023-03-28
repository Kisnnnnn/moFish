import { Form, TimePicker, Button } from 'antd';
import { history, useModel } from '@umijs/max';
import { msgSuccess, msgTransErr } from '@/utils/msg';
import { getVal, setVal } from '@/utils/electron/common';
import { useEffect, useState } from 'react';
const dayjs = require('dayjs');

const SetRestTime: React.FC = () => {
  const [onTime, setOnTime] = useState(dayjs());
  const [offTime, setOffTime] = useState(dayjs());
  const dayDate = useModel('timeModel');

  useEffect(() => {
    getVal('goOnTime').then((val) => {
      setOnTime(dayjs('2022-10-10 ' + val));
    });
    getVal('goOffTime').then((val) => {
      setOffTime(dayjs('2022-10-10 ' + val));
    });
  }, []);

  const onChange = (value: any) => {
    setOnTime(value);
    getVal('goOnTime', value);
  };

  const onOffChange = (value: any) => {
    setOffTime(value);
    getVal('goOffTime', value);
  };

  const submit = async () => {
    let next = dayjs(onTime).isAfter(dayjs(offTime));
    if (next) {
      return msgTransErr('上班时间要比下班时间早呀~');
    }
    await setVal('goOnTime', onTime.format('HH:mm'));
    await setVal('goOffTime', offTime.format('HH:mm'));
    msgSuccess('设置成功！');
    dayDate.updateSetTimefn();
    history.push('/');
  };

  return (
    <Form onFinish={submit}>
      <Form.Item
        label="设置你的上班时间"
        rules={[{ required: true, message: '请输入上班时间!' }]}
      >
        <TimePicker
          onChange={onChange}
          value={onTime}
          size="large"
          format="HH:mm"
        />
      </Form.Item>
      <Form.Item
        label="设置你的下班时间"
        rules={[{ required: true, message: '请输入下班时间!' }]}
      >
        <TimePicker
          onChange={onOffChange}
          value={offTime}
          size="large"
          format="HH:mm"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default SetRestTime;
