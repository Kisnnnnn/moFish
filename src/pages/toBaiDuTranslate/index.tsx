import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { ipcRenderer } from '@/constants';

const ToBaiDuTranslate: React.FC = () => {
  // 设置
  const goUrl = () => {
    ipcRenderer.send('openTranslateWindow', 'https://fanyi.baidu.com/');
  };

  goUrl();
  return (
    <PageContainer>
      <Button className="btn-set" type="primary" onClick={goUrl}>
        再次打开百度翻译
      </Button>
    </PageContainer>
  );
};

export default ToBaiDuTranslate;
