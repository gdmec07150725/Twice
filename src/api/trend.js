/* 动态 */
import Restful from './restful';
import { stringify } from 'qs';

class Trend {
  /**
   * 新增动态
   * @param {*} params
   */
  async addTrend(params) {
    return Restful.post('/user-service/trends', params);
  }

  /**
   * 根据公司id查找某个公司所有的动态
   * @param {*} params
   */
  async getAllTrendByCompany(params) {
    return Restful.get(
      `/user-service/trends/company/${params.id}?${stringify(params)}`
    );
  }
}

export default new Trend();
