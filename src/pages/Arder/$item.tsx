import { useParams } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
const arder: React.FC = (props: any) => {
  const { item } = useParams();
  return (
    <PageContainer>
      <div>
        M <span>{item}</span>
      </div>
    </PageContainer>
  );
};

export default arder;
