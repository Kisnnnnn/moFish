import { Row, Col } from 'antd';
import { Pie, Heatmap } from '@ant-design/plots';
import './index.less';
interface Props {
  data: TimeDate;
}
let remianTimeText = '';

const TimeCharts: React.FC<Props> = (props) => {
  const { data } = props;
  const { offDay, workTime, isOff, remianTime, restDay } = data;

  // console.log(allWorkTime);
  // console.log(remianTime);
  // console.log(workTime);

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
  let heatMapData: { value: string; name: string; week: string }[] = [];
  let WEEK_ENUM = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  for (let o = 1; o < 8; o++) {
    let value = '摸鱼';

    if (o > 5) {
      value = '休息';
    } else if (restDay < o) {
      value = '加油';
    } else if (restDay === o) {
      value = 'ing';
    }
    heatMapData.push({
      week: WEEK_ENUM[o - 1],
      value,
      name: '工作日',
    });
  }
  const configHeatmap = {
    data: heatMapData,
    xField: 'week',
    yField: 'name',
    colorField: 'value',
    shape: 'square',
    color: ['#dddddd', '#5fa4cd', '#2e7ab6', '#57C5B6'],
    axis: {
      line: null,
    },
    label: {
      style: {
        fill: '#fff',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
      },
    },
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
              <img className="offimg" src="offwork/off1.jpg" alt="" />
            </div>
          )}
        </Col>
        <Col className="item heartmap" span={12}>
          <Heatmap className="heartmap" {...configHeatmap} />
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
