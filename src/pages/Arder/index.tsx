import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Spin, Alert, Row, Col, Image } from 'antd';
import './css/index.less';

const Arder: React.FC = () => {
  const goFC = () => {
    history.push('/arder/fcgame');
  };

  return (
    <PageContainer className="arder">
      <Row gutter={[16, 16]}>
        <Col className="item" span={4} onClick={goFC}>
          <Image preview={false} width={80} src="./image/icon_fcgame.png" />
          <div className="tit">FC游戏</div>
        </Col>
        <Col className="item" span={4}>
          1
        </Col>
        <Col className="item" span={4}>
          1
        </Col>
        <Col className="item" span={4}>
          1
        </Col>
        <Col className="item" span={4}>
          1
        </Col>
      </Row>
      <Spin size="large">
        <Alert
          message="更多玩具，收集中.."
          description="有什么好想法可以提issue"
          type="info"
        />
      </Spin>
    </PageContainer>
  );
};

export default Arder;
