import { Space, Button, Input, Form, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { msgSuccess, msgTransErr } from '@/utils/msg';
import { history } from '@umijs/max';
import { ipcRenderer } from '@/constants';

const localStorage = require('localStorage');
const tranlateAppId = localStorage.getItem('tranlateAppId');
const tranlateScrcetKey = localStorage.getItem('tranlateScrcetKey');

const setTranslateApi: React.FC = () => {
  const [appId, setAppId] = useState(tranlateAppId);
  const [scrcetKey, setScrcetKey] = useState(
    localStorage.getItem(tranlateScrcetKey),
  );
  // 去github查看说明文档
  const goGuide = () => {
    ipcRenderer.send(
      'openBlankUrl',
      'https://github.com/Kisnnnnn/moFish/blob/main/README.md',
    );
  };
  // 存储翻译
  const saveBuiduApi = () => {
    if (!appId || !scrcetKey) {
      msgTransErr('请输入配置项');
      return;
    }
    localStorage.setItem('tranlateAppId', appId);
    if (scrcetKey) {
      localStorage.setItem('tranlateScrcetKey', scrcetKey);
    }
    scrcetKey && appId && msgSuccess('设置成功!');
    setTimeout(() => {
      history.go(-1);
    }, 1000);
  };

  return (
    <Space>
      <div>
        <div style={{ fontSize: '20px', margin: '0 0 20px 0' }}>
          设置你的百度翻译API
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ minWidth: 300, maxWidth: 700 }}
          autoComplete="off"
        >
          <Form.Item label="AppId">
            <Input
              value={appId}
              onChange={({ target }) => setAppId(target.value)}
            ></Input>
            <div style={{ marginTop: '5px' }}>
              <Tooltip title="点击查看">
                <Typography.Link onClick={goGuide}>
                  什么是百度翻译API?
                </Typography.Link>
              </Tooltip>
            </div>
          </Form.Item>
          <Form.Item label="密钥">
            <Input
              value={scrcetKey}
              onChange={({ target }) => setScrcetKey(target.value)}
            ></Input>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" onClick={saveBuiduApi}>
              设置
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Space>
  );
};
export default setTranslateApi;
