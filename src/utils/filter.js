import moment from 'moment';

/* 格式化日期 */
const formatDate = value => {
  if (value) {
    return moment(value).format('YYYY-MM-DD');
  }
};

/* 将时间转换为时间戳 (毫秒)*/
const timestampDate = value => {
  if (value) {
    return Number(moment(value).format('x'));
  }
};

export { formatDate, timestampDate };
