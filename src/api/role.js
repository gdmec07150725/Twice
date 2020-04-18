import Restful from './restful';
// import { stringify } from 'qs';

class Role {
  /* 查询角色 */
  getRole() {
    return Restful.get('/user-service/roles');
  }
  /**
   * 根据角色id查询角色的权限信息
   * @param {*} id 角色id
   */
  getRoleAuth(id) {
    return Restful.get(`/user-service/roles/${id}/permissions`);
  }
  /**
   * 新增角色
   * @param {*} params
   */
  addRole(params) {
    return Restful.post('/user-service/roles', params);
  }

  /**
   * 编辑角色
   * @param {*} params
   */
  editRole(params) {
    return Restful.put('/user-service/roles', params);
  }

  /**
   * 删除角色
   * @param {*} id
   */
  deleteRole(id) {
    return Restful.delete(`/user-service/roles/${id}`);
  }

  /**
   * 给角色分配权限
   * @param {*} params
   */
  assignAuth(params) {
    return Restful.post(`/user-service/roles/${params.id}/assign`, params);
  }
}
export default new Role();
