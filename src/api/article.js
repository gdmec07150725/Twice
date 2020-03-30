import Restful from './restful';
import { stringify } from 'qs';

class Article {
  /**
   * 获取文章列表
   * @param {*} params
   */
  async getArticleList(params) {
    return Restful.get(
      `/user-service/articles/company/${params.companyId}?${stringify(params)}`
    );
  }

  /**
   * 获取文章详情
   * @param {*} companyId (后面做好登录之后，不需要传公司id了)
   */
  async getArticleDetail(articleId) {
    return Restful.get(`/user-service/articles/${articleId}`);
  }

  /**
   * 修改文章（CMS用于修改文章状态，同意或拒绝）
   * @param {*} params
   */
  async editArticleDetail(params) {
    return Restful.put('/user-service/articles', params);
  }
}
export default new Article();
