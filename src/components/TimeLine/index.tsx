import { useEffect, useState } from 'react';
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');

interface Props {
  goOffTime: string | null;
  show?: Boolean;
  mini?: Boolean;
}
dayjs.extend(duration);
// 获取上班时间
let isOff = false;
let formatNowDate = '';

const TimeLine: React.FC<Props> = (props) => {
  let { show = true, mini = false, goOffTime } = props;
  let [nowDateTime, setNowDateTime] = useState(new Date());
  let [offSaturDay, setOffSaturDay] = useState('');
  let [offSunDay, setOffSunDay] = useState('');
  let [offTime, setOffTime] = useState('');
  let [restDay, setRestDay] = useState(0);
  useEffect(() => {
    // 周日
    let saturDay = dayjs().day(6).startOf('day');
    // 周六
    let sunData = saturDay.add(1, 'day').startOf('day');
    // 下班时间
    let goOffDate = dayjs(dayjs().format('YYYY-MM-DD ') + goOffTime);

    // 下班时间
    // 当前时间
    let nowDate = dayjs(nowDateTime);
    formatNowDate = nowDate.format('YYYY-MM-DD HH:mm:ss');
    let curWeekDay = dayjs(nowDateTime).day();
    let offSaturDay = dayjs
      .duration(saturDay.diff(nowDate))
      .format('DD天 HH小时 mm分钟 ss秒');
    let offSunDay = dayjs
      .duration(sunData.diff(nowDate))
      .format('DD天 HH小时 mm分钟 ss秒');
    let offTimeValue = dayjs
      .duration(goOffDate.diff(nowDate))
      .format('HH小时 mm分钟 ss秒');

    // 当天是否下班
    isOff = dayjs(goOffDate).isBefore(nowDate); // 默认毫秒

    setOffSaturDay(offSaturDay);
    setOffSunDay(offSunDay);
    setOffTime(offTimeValue);

    // 判断是否休息日
    setRestDay(curWeekDay);
    setTimeout(() => {
      setNowDateTime(new Date());
    }, 1000);
  }, [nowDateTime]);

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
  // 是否休息日
  const isRestDay = restDay === 6 || restDay === 0;
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
      <span style={timeStyle}>{offTime}</span>
      !!!
    </div>
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
      <strong>{hasOffDayDom}</strong>
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
