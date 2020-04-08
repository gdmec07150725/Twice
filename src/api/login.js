import Restful from './restful';

class Login {
  /**
   * 登录
   * @param {*} params
   */
  async logIn(params) {
    return Restful.post(`/login-service/login`, params);
  }
}
export default new Login();
