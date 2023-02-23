import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';

const arder: React.FC = () => {
  return (
    <div>
      玩具首页
      <Outlet />
    </div>
  );
};

export default arder;
