import Restful from './restful';

class Constant {
  /**
   * 查询所有常量数据
   * @param {*} params
   */
  async getAllConstant() {
    return Restful.get(`/constant-service/constants`);
  }
}

export default new Constant();
