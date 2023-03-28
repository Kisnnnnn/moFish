import { getVal } from '@/utils/electron/common';
import { useState, useEffect } from 'react';
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');

dayjs.extend(duration);
export default () => {
  let [nowDateTime, setNowDateTime] = useState(new Date());
  let [offSaturDay, setOffSaturDay] = useState('');
  let [offSunDay, setOffSunDay] = useState('');
  let [offDay, setOffDay] = useState('');
  // 周几
  let [restDay, setRestDay] = useState(0);
  // 已经工作时间
  let [workTime, setWorkTime] = useState('');
  // 完整工作时间
  let [allWorkTime, setAllWorkTime] = useState('');
  // 剩余工作时间
  let [remianTime, setRemainTime] = useState('');
  let [isOff, setIsOff] = useState(false);
  let [formatNowDate, setFormatNowDate] = useState(false);
  const [onTime, setOnTime] = useState(dayjs());
  const [offTime, setOffTime] = useState(dayjs());
  const updateSetTimefn = () => {
    getVal('goOnTime').then((val) => {
      setOnTime(val);
    });
    getVal('goOffTime').then((val) => {
      setOffTime(val);
    });
  };
  useEffect(() => {
    updateSetTimefn();
  }, []);

  useEffect(() => {
    // 周日
    let saturDay = dayjs().day(6).startOf('day');
    // 周六
    let sunData = saturDay.add(1, 'day').startOf('day');
    // 下班时间
    let goOffDate = dayjs(dayjs().format('YYYY-MM-DD ') + offTime);
    let goOnDate = dayjs(dayjs().format('YYYY-MM-DD ') + onTime);
    // 下班时间
    // 当前时间
    let nowDate = dayjs(nowDateTime);
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
    setIsOff(dayjs(goOffDate).isBefore(nowDate)); // 默认毫秒
    setOffSaturDay(offSaturDay);
    setOffSunDay(offSunDay);
    setOffDay(offTimeValue);
    setWorkTime(dayjs.duration(dayjs(nowDate).diff(goOnDate)));
    setRemainTime(dayjs.duration(dayjs(goOffDate).diff(nowDate)));
    setAllWorkTime(dayjs.duration(dayjs(goOffDate).diff(goOnDate)));

    // 判断是否休息日
    setRestDay(curWeekDay);
    setFormatNowDate(dayjs(nowDateTime).format('YYYY-MM-DD HH:mm:ss'));

    setTimeout(() => {
      setNowDateTime(new Date());
    }, 1000);
  }, [nowDateTime]);

  return {
    restDay,
    offSaturDay,
    offSunDay,
    offDay,
    workTime,
    nowDateTime,
    isOff,
    formatNowDate,
    updateSetTimefn,
    remianTime,
    allWorkTime,
  };
};
