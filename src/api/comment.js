/* 评论 */
import Restful from './restful';
import { stringify } from 'qs';

class Comment {
  /**
   * 根据评论类型和内容id获取评论列表
   * @param {*} params
   */
  async getCommentList(params) {
    return Restful.get(`/user-service/comments?${stringify(params)}`);
  }

  /**
   * 发表评论
   * @param {*} params
   */
  async PublishComment(params) {
    return Restful.post('/user-service/comments', params);
  }

  /**
   * 删除评论
   * @param {*} commentId
   */
  async deleteComment(commentId) {
    return Restful.delete(`/user-service/comments/${commentId}`);
  }
}

export default new Comment();
