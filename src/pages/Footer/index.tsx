import { Image, Typography, Tooltip } from 'antd';
import { openUrl } from '@/utils/electron/common';

interface Props {
  prop?: any;
}

const goGithub = () => {
  openUrl('https://github.com/Kisnnnnn/moFish');
};
const Footer: React.FC<Props> = ({ prop }) => {
  const collapsed = prop.collapsed;
  const iconDom = (
    <Image
      style={{ marginBottom: '5px' }}
      preview={false}
      width={40}
      src="/logo/icon.jpeg"
    />
  );
  const textDom = (
    <div>
      <Tooltip title="点击查看">
        <Typography.Link onClick={goGithub}>欢迎 Star🌟 @Guihub 摸鱼小助手</Typography.Link>
      </Tooltip>
    </div>
  );
  return collapsed ? iconDom : textDom;
};
export default Footer;
