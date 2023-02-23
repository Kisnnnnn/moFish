import { PageContainer } from '@ant-design/pro-components';
import { tranlate } from '@/valtio/tranlate';
import { useSnapshot } from '@umijs/max';
const Translate: React.FC = () => {
  const tranlateApi = useSnapshot(tranlate);
  // console.log(tranlateApi.action.sendText('你好', 'en', {}));

  return (
    <PageContainer>
      <h1>翻译</h1>
      <div className='frame'></div>
    </PageContainer>
  );
};

export default Translate;
