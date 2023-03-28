import { Row, Col } from 'antd';
import { Pie } from '@ant-design/plots';
import './index.less';
interface Props {
  data: TimeDate;
}
let remianTimeText = '';

const TimeCharts: React.FC<Props> = (props) => {
  const { data } = props;
  const { offDay, workTime, isOff, remianTime, allWorkTime } = data;

  console.log(allWorkTime);
  console.log(remianTime);
  console.log(workTime);

  let bulletData = [
    {
      type: '上班时间',
      value: workTime.$ms,
    },
    {
      type: '上班额度',
      value: remianTime.$ms,
    },
  ];

  const config = {
    data: bulletData,
    angleField: 'value',
    colorField: 'type',
    animation: false,
    radius: 0.9,
    innerRadius: 0.8,
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '16px',
        },
        content: offDay
          .replace('小时', ':')
          .replace('分钟', ':')
          .replace('秒', ''),
      },
    },
    color: ['#ef935b', '#f5f5f5'],
    label: {
      type: 'inner',
      offset: '-30%',
      content: (data: any) => {
        const { percent, type } = data;

        if ('上班额度' === type) {
          remianTimeText = `${(percent * 100).toFixed(0)}%`;
        }
        return;
      },
    },
    legend: false,
    tooltip: false,
    interactions: false,
  };
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col className="item" span={12}>
          {!isOff && (
            <div className="pie">
              <Pie {...config} />
              <div className="pie-text">
                你的今日上班额度还剩
                <span className="pie-text-color">{remianTimeText}</span>
              </div>
            </div>
          )}
          {isOff && (
            <div className="off">
              <img className="offimg" src="/offwork/off1.jpg" alt="" />
            </div>
          )}
        </Col>
        <Col className="item" span={12}>
          1
        </Col>
        <Col className="item" span={12}>
          1
        </Col>
        <Col className="item" span={12}>
          1
        </Col>
        <Col className="item" span={12}>
          1
        </Col>
        <Col className="item" span={12}>
          1
        </Col>
        <Col className="item" span={12}>
          1
        </Col>
      </Row>
    </div>
  );
};
export default TimeCharts;
