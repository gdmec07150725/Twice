/* 权限管理 */
import Restful from './restful';

class Authorization {
  /**
   * 查询全部权限信息
   */
  getAllAuth() {
    return Restful.get('/user-service/permissions');
  }

  /**
   * 根据权限id查询权限信息, 不包含子节点
   * @param {*} id
   */
  getAuthById(id) {
    return Restful.get(`/user-service/permissions/${id}`);
  }

  /**
   * 修改权限信息
   * @param {*} params
   */
  editAuth(params) {
    return Restful.put('/user-service/permissions', params);
  }

  /**
   * 新增权限点
   * @param {*} params
   */
  createAuth(params) {
    return Restful.post('/user-service/permissions', params);
  }

  /**
   * 删除权限
   * @param {*} id
   */
  deleteAuth(id) {
    return Restful.delete(`/user-service/permissions/${id}`);
  }
}

export default new Authorization();
