import Restful from './restful';
import { stringify } from 'qs';

class Constant {
  /**
   * 查询所有常量数据
   * @param {*} params
   */
  async getAllConstant() {
    return Restful.get(`/constant-service/constants`);
  }
  /**
   * 查询所有常量数据
   * @param {*} params
   */
  async getParentConstantList(params) {
    return Restful.get(
      `/constant-service/constants/params/page?${stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true,
      })}`
    );
  }

  /* 新增父级常量*/
  async createParentConstant(params) {
    return Restful.post(`/constant-service/constants/params`, params);
  }

  /* 编辑父级常量 */
  async editParentConstant(params) {
    return Restful.put(`/constant-service/constants/params`, params);
  }

  /* 删除父级常量（子级一同删除） */
  async deleteParentConstant(id) {
    return Restful.delete(`/constant-service/constants/params/${id}`);
  }

  /* 获取子级常量 */
  async getChildConstantList(params) {
    return Restful.get(
      `/constant-service/constants/param-details?${stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true,
      })}`
    );
  }

  /* 新增子级常量 */
  async createChildConstant(params) {
    return Restful.post(`/constant-service/constants/param-details`, params);
  }

  /* 编辑子级常量 */
  async editChildConstant(params) {
    return Restful.put(`/constant-service/constants/param-details`, params);
  }

  /* 删除子级常量 */

  async deleteChildConstant(id) {
    return Restful.delete(`/constant-service/constants/param-details/${id}`);
  }
}

export default new Constant();
