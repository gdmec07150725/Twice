import moment from 'moment';
moment.locale('zh-CN');

/* 格式化日期 */
const formatDate = value => {
  if (value) {
    return moment(value).format('YYYY-MM-DD');
  }
};

const formatTime = value => {
  if (value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }
};

/* 将时间转换为时间戳 (毫秒)*/
const timestampDate = value => {
  if (value) {
    return Number(moment(value).format('x'));
  }
};
/* 返回相对当前的（一个小时前） */
const relativeTime = value => {
  if (value) {
    const time = moment(value)
      .startOf('seconds')
      .fromNow();
    if (time === '几秒内' || time === '几秒前') {
      return '刚刚';
    }
    return time;
  }
};
export { formatDate, formatTime, timestampDate, relativeTime };
