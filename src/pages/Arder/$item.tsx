import { useParams } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
const Arder: React.FC = () => {
  const { item } = useParams();
  return (
    <PageContainer>
      <div>
        M <span>{item}</span>
      </div>
    </PageContainer>
  );
};

export default Arder;
