import Restful from './restful';
import { stringify } from 'qs';

class Article {
  /**
   * 新增文章
   * @param {*} params
   */
  async insertArticle(params) {
    return Restful.post(`/user-service/articles`, params);
  }

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

  /**
   * 根据一级分类查询旗下所有二级分类的文章
   * @param {*} params
   */
  async getArticleListBySecondCategory(params) {
    return Restful.get(
      `/user-service/articles/category/${params.categoryId}?${stringify(
        params
      )}`
    );
  }

  /**
   * 获取分类数据
   * @param {*} params
   */
  async getCategoryList(params) {
    return Restful.get(`/user-service/categories/company?${stringify(params)}`);
  }

  /**
   * 获取二级分类
   * @param {*} params
   */
  async getChildCategory(params) {
    return Restful.get(
      `/user-service/categories/first/${params.id}?${stringify(params)}`
    );
  }
}
export default new Article();
