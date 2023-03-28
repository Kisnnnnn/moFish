interface Props {
  data: TimeDate;
  show?: boolean;
  mini?: boolean;
}

// 获取上班时间
const textStyle = {
  fontSize: '18px',
  lineHeight: '30px',
};
const timeStyle = {
  color: '#EB455F',
  fontSize: '20px',
};
const nowTimeStyle = {
  color: '#F94A29',
  fontSize: '20px',
};

const TimeLine: React.FC<Props> = (props) => {
  const { data } = props;
  const {
    restDay,
    isOff,
    offSaturDay,
    offSunDay,
    offDay,
    workTime,
    formatNowDate,
  } = data;

  // 是否休息日
  const isRestDay = restDay === 6 || restDay === 0;
  const workTimeText = workTime.format('DD天 HH小时 mm分钟 ss秒');
  const offStarDayDom = !isRestDay && (
    <div style={textStyle}>
      距离<strong style={timeStyle}>周六</strong>还有{' '}
      <span style={timeStyle}>{offSaturDay}</span>
      !!!
    </div>
  );
  const offSunDayDom = !isRestDay && (
    <div style={textStyle}>
      距离<strong style={timeStyle}>周日</strong>还有{' '}
      <span style={timeStyle}>{offSunDay}</span>
      !!!
    </div>
  );
  // 距离下班时间
  const offDayDom = !isOff && !isRestDay && (
    <div style={textStyle}>
      距离<strong style={timeStyle}>下班</strong>还有{' '}
      <span style={timeStyle}>{offDay}</span>
      !!!
    </div>
  );
  // 已经工作时间
  const hasWorkDayDom = !isOff && !isRestDay && (
    <div style={textStyle}>已经工作了{workTimeText}</div>
  );
  // 已经下班！！！！
  const hasOffDayDom = isOff && !isRestDay && (
    <div style={textStyle}>
      你看看都几点了！！！！已经过下班时间，快下班吧不要卷了~~
    </div>
  );

  return (
    <div>
      <h1 style={nowTimeStyle}>当前时间：{formatNowDate}</h1>
      <div>{hasOffDayDom}</div>
      <div>{hasWorkDayDom}</div>
      {/* 距离下班时间 */}
      {/* 距离周六时间 */}
      <div>{offStarDayDom}</div>
      {/* 距离周日时间 */}
      <div>{offSunDayDom}</div>
      {/* 已经是休息日了！！ */}
      <div>{offDayDom}</div>
    </div>
  );
};

export default TimeLine;
