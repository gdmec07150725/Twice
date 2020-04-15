/* 人员管理 */
import Restful from './restful';
import { stringify } from 'qs';

class Staff {
  /**
   * 根据公司id获取公司的所有用户
   * @param {*} params
   */
  getStaffListByCompanyId(params) {
    return Restful.get(
      `/user-service/users/company/${params.companyId}?${stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true,
      })}`
    );
  }

  /**
   * 新增用户
   * @param {*} params
   */
  addStaff(params) {
    return Restful.post('/user-service/users', params);
  }

  /**
   * 修改用户信息
   * @param {*} params
   */
  editStaff(params) {
    return Restful.put('/user-service/users', params);
  }

  /**
   * 删除用户
   * @param {*} id
   */
  deleteStaff(id) {
    return Restful.delete(`/user-service/users/${id}`);
  }

  /**
   * 根据用户id获取用户详情
   * @param {*} id
   */
  getStaffDetail(id) {
    return Restful.get(`/user-service/users/${id}`);
  }

  /**
   * 为用户分配角色
   * @param {*} params
   */
  assignRoleToStaff(params) {
    return Restful.post(
      `/user-service/users/assign/${params.id}?${stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true,
      })}}`
    );
  }
}

export default new Staff();
