import { Row, Col, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import './index.less';
import { useState } from 'react';

interface Props {
  prop?: any;
}
function getRandomNumbers(min: number, max: number, count: number) {
  const numbers = []; // 用于存储随机数的数组
  for (let i = min; i <= max; i++) {
    numbers.push(i); // 将所有可能的号码添加到数组中
  }

  const result = []; // 用于存储随机取出的号码的数组

  // 通过循环随机取出指定数量的号码
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length); // 随机生成一个索引
    const randomNumber = numbers.splice(randomIndex, 1)[0]; // 从数组中取出对应索引的号码，并将其移除
    result.push(randomNumber); // 将取出的号码添加到结果数组中
  }

  return result.sort((a, b) => a - b);
}

const CaiPiao: React.FC<Props> = ({}) => {
  // 使用示例
  let ssBalls: any = [];
  let ssBallDom: any = '';
  // 大乐透
  let dltBalls: any = [];
  let dltBallDom: any = '';
  // 双色球
  let [ssBallsData, setSSBallData] = useState([]) as any[];
  // 大乐透
  let [dltBallsData, setDLTBallData] = useState([]) as any[];

  // 双色球
  const addSSBall = (ball: number[]) => {
    ssBalls.push(ball);
    if (ssBalls.length === 5) {
      setSSBallData(ssBalls);
    }
  };

  // 试一试
  const trySSBall = () => {
    ssBalls = [];
    for (let i = 0; i < 5; i++) {
      const reds = getRandomNumbers(1, 33, 6);
      const blues = getRandomNumbers(1, 16, 1);

      const ball = reds.concat(blues);

      addSSBall(ball);
    }
  };

  ssBallDom = ssBallsData.map((ballList: number[], i: number) => {
    let ssBallDom = ballList.map((ball, bIndex) => {
      return (
        <div className={bIndex === 6 ? 'blue-ball' : 'red-ball'} key={bIndex}>
          {ball.toString()}
        </div>
      );
    });
    return (
      <div className="balls" key={i}>
        {ssBallDom}
      </div>
    );
  });

  // 大乐透
  const addDLTBall = (ball: number[]) => {
    dltBalls.push(ball);

    if (dltBalls.length === 5) {
      setDLTBallData(dltBalls);
    }
  };

  const tryDLTBall = () => {
    ssBalls = [];
    for (let i = 0; i < 5; i++) {
      const reds = getRandomNumbers(1, 35, 5);
      const blues = getRandomNumbers(1, 12, 2);

      const ball = reds.concat(blues);

      addDLTBall(ball);
    }
  };

  dltBallDom = dltBallsData.map((ballList: number[], i: number) => {
    let ssBallDom = ballList.map((ball, bIndex) => {
      return (
        <div
          className={bIndex === 5 || bIndex === 6 ? 'blue-ball' : 'red-ball'}
          key={bIndex}
        >
          {ball.toString()}
        </div>
      );
    });
    return (
      <div className="balls" key={i}>
        {ssBallDom}
      </div>
    );
  });

  const textDom = (
    <PageContainer>
      <Row className="list" gutter={[16, 16]}>
        <Col className="item" span={24}>
          <div className="header">双色球</div>
          <div className="balls-list">{ssBallDom}</div>

          <Button className="try-button" onClick={trySSBall} type="primary">
            试试手气
          </Button>
        </Col>
        <Col className="item" span={24}>
          <div className="header">大乐透</div>
          <div className="balls-list">{dltBallDom}</div>

          <Button className="try-button" onClick={tryDLTBall} type="primary">
            试试手气
          </Button>
        </Col>
        <Col className="item" span={24}>
          111
        </Col>
        <Col className="item" span={24}>
          111
        </Col>
        <Col className="item" span={24}>
          111
        </Col>
      </Row>
    </PageContainer>
  );
  return textDom;
};
export default CaiPiao;
