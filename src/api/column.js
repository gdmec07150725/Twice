/* 公司管理 */
import Restful from './restful';
import { stringify } from 'qs';

class Column {
  /* 查询专栏内容 */
  async getParentColumn(params) {
    return Restful.get(`/user-service/categories/company?${stringify(params)}`);
  }

  /* 查询二级专栏 */
  async getChildrenColumn(id) {
    return Restful.get(`/user-service/categories/first/${id}`);
  }
  /* 新增专栏 */
  async addColumn(params) {
    return Restful.post('/user-service/categories', params);
  }

  /* 编辑专栏 */
  async editColumn(params) {
    return Restful.put('/user-service/categories', params);
  }

  /* 删除专栏 */
  async delColumn(id) {
    return Restful.delete(`/user-service/categories/${id}`);
  }
}

export default new Column();
