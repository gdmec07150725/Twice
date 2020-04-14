import Restful from './restful';

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
}
export default new Role();
