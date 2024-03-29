import { PageContainer } from '@ant-design/pro-components';
import { connect } from '@umijs/max';
import { Input, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './css/index.less';
import { ipcRenderer } from '@/constants';
import { useState } from 'react';
const { TextArea } = Input;

const masterProps = function (state: any) {
  const { targetName } = state['tranlate'];

  return {
    targetName,
  };
};

const masterDispatchProps = (dispatch: any) => {
  return {
    async sendText(
      q: string,
      target: string,
      options?: { [key: string]: any },
    ) {
      const action = {
        type: 'tranlate/sendText',
        q: q,
        target: target,
        options: options,
      };
      return await dispatch(action);
    },
  };
};

const Translate: React.FC = (props: any) => {
  let { sendText } = props;
  let [englishText, setEnglishText] = useState('');
  let [chnText, setChnText] = useState('');
  // 中翻译英文
  const chnToEnglish = async () => {
    let data = await sendText(chnText, 'en', {});
    const { dst } = data || {};

    if (dst) {
      setEnglishText(dst);
    }
  };
  // 英文翻译中
  const englishToChn = async () => {
    let data = await sendText(englishText, 'zh', {});
    const { dst } = data || {};

    if (dst) {
      setChnText(dst);
    }
  };

  // 设置
  const goSet = () => {
    ipcRenderer.send('openTranslateWindow', 'https://fanyi.baidu.com/');
    // history.push('/translate/set');
  };
  return (
    <PageContainer>
      <Button className="btn-set" onClick={goSet}>
        翻译API设置
      </Button>
      <div className="frame">
        <TextArea
          className="trans-input"
          rows={6}
          value={chnText}
          onChange={({ target }) => setChnText(target.value)}
          placeholder="请输入中文"
        ></TextArea>
        <div className="trans-btns">
          <Button type="primary" size="large" onClick={chnToEnglish}>
            <DownOutlined />
            中翻英
          </Button>
          <Button type="primary" size="large" onClick={englishToChn}>
            <UpOutlined />
            英翻中
          </Button>
        </div>
        <TextArea
          className="trans-input"
          rows={6}
          value={englishText}
          onChange={({ target }) => setEnglishText(target.value)}
          placeholder="请输入英文"
        ></TextArea>
      </div>
    </PageContainer>
  );
};
export default connect(masterProps, masterDispatchProps)(Translate);
