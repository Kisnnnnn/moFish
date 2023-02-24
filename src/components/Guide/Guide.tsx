import { Modal } from 'antd';
import { history } from '@umijs/max';
import { Layout, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './Guide.less';
import EmoticonPic from '@/components/EmoticonPic';
import TimeLine from '@/components/TimeLine';
interface Props {
  name: string;
}

// 脚手架示例组件
const Guide: React.FC<Props> = (props) => {
  const { name } = props;
  const [goOffTime, setGoOffTime] = useState(localStorage.getItem('goOffTime'));

  useEffect(() => {
    // 如果没有上班时间则直接跳转到设置页面
    if (!goOffTime) {
      Modal.info({
        content: '你还没有设置上班时间，去设置上班时间吧',
        onOk: () => {
          Modal.destroyAll();
          history.push('/settime');
        },
      });
    }
  }, [setGoOffTime]);

  return (
    <Layout>
      <Row>
        <Typography.Title level={3} className={styles.title}>
          欢迎使用 <strong>{name}</strong> ！
        </Typography.Title>
        <div style={{ textAlign: 'center', width: '100vw' }}>
          <EmoticonPic width="300px" />
          {goOffTime && <TimeLine goOffTime={goOffTime} />}
        </div>
      </Row>
    </Layout>
  );
};

export default Guide;
