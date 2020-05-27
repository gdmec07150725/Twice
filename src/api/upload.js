/* 公司管理 */
import Restful from './restful';

class Upload {
  /* 获取提醒事项列表 */
  async uploadSingleImage(formData) {
    return Restful.upload(`/upload-service/upload`, formData);
  }
}

export default new Upload();
