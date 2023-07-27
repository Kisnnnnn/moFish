import { useModel } from '@umijs/max';
import { Layout, Row, Typography, Button } from 'antd';
import React, { useState } from 'react';
import styles from './Guide.less';
import EmoticonPic from '@/components/EmoticonPic';
import TimeLine from '@/components/TimeLine';
import TimeCharts from '@/components/TimeCharts';
import './Guide.less';
interface Props {
  name: string;
}

// 脚手架示例组件
const Guide: React.FC<Props> = (props) => {
  const { name } = props;
  // 是否显示图表
  const [isShowCharts, setIsShowCharts] = useState(true);
  const dayDate = useModel('timeModel');

  return (
    <Layout>
      <Row>
        <div className="header-drag"></div>
        <Typography.Title level={3} className={styles.title}>
          欢迎使用 <strong>{name}</strong> ！
        </Typography.Title>
        <div className="btn-translate">
          <Button type="primary" onClick={() => setIsShowCharts(!isShowCharts)}>
            转换{isShowCharts ? '文字' : '图表'}
          </Button>
        </div>
        {!isShowCharts && (
          <div style={{ textAlign: 'center', width: '100vw' }}>
            <EmoticonPic width="300px" />
            {<TimeLine data={dayDate} />}
          </div>
        )}
        {isShowCharts && (
          <div className="charts">
            <TimeCharts data={dayDate}></TimeCharts>
          </div>
        )}
      </Row>
    </Layout>
  );
};

export default Guide;
