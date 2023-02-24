import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';
import { Spin, Alert } from 'antd';

const arder: React.FC = () => {
  return (
    <PageContainer>
      <Spin size="large">
        <Alert
          message="暂无玩具，收集中.."
          description="有什么好想法可以提issue"
          type="info"
        />
      </Spin>
      <Outlet />
    </PageContainer>
  );
};

export default arder;
