/* 公司管理 */
import Restful from './restful';

class Company {
  /*
   * 查询所有公司信息
   */
  async getAllCompany() {
    return Restful.get('/companies');
  }
}

export default new Company();
