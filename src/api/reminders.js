/* 提醒事项 */
import Restful from './restful';
import { stringify } from 'qs';

class Reminders {
  /* 获取提醒事项列表 */
  async getAllReminders(params) {
    return Restful.get(
      `/user-service/reminds/page?${stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true,
      })}`
    );
  }

  /* 新增提醒事项 */
  async createNewReminders(params) {
    return Restful.post('/user-service/reminds', params);
  }

  /* 编辑提醒事项 */
  async editReminders(params) {
    return Restful.put(`/user-service/reminds`, params);
  }

  /* 删除提醒事项 */
  async deleteReminders(id) {
    return Restful.delete(`/user-service/reminds/${id}`);
  }
  /* 根据id查找提醒事项 */
  async getRemindersDetailById(id) {
    return Restful.get(`/user-service/reminds/${id}`);
  }
}

export default new Reminders();
