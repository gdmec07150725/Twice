/* 公司管理 */
import Restful from './restful';
import { stringify } from 'qs';

class Company {
  /*
   * 查询所有公司信息
   */
  async getAllCompany(params) {
    return Restful.get(
      `/company-service/companies/page?${stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true,
      })}`
    );
  }

  /* 新增公司 */
  async addNewCompany(params) {
    return Restful.post('/company-service/companies', params);
  }

  /* 编辑公司 */
  async modifyCompany(params) {
    return Restful.put(`/company-service/companies`, params);
  }

  /* 删除公司 */
  async deleteCompany(id) {
    return Restful.delete(`/company-service/companies/${id}`);
  }
}

export default new Company();
