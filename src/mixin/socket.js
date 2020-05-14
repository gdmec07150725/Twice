import { mapActions } from 'vuex';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import configs from '@/configs';
import { playMus } from '@/utils/utils';
import storage from '@/utils/storage';

export default {
  methods: {
    ...mapActions(['getRemindersDetailById']),
    initConnectSocket() {
      const userId = JSON.parse(storage.getUserDetail()).id;
      const socket = new SockJS(configs.socketURL);
      const stompClient = Stomp.over(socket);
      stompClient.debug = null;
      stompClient.connect({}, () => {
        stompClient.subscribe(`/remind/subscribe/${userId}`, greeting => {
          console.log('greeting', greeting);
          const { body } = greeting;
          if (body) {
            const { type, id } = JSON.parse(body);
            if (type === 'TASK_TYPE_REMIND') {
              this.handleGetReminderDetail(id);
            }
          }
        });
      });
    },
    async handleGetReminderDetail(id) {
      try {
        const res = await this.getRemindersDetailById(id);
        playMus(); // 播放声音
        this.$notify({
          title: '提醒事项',
          message: res.content,
          duration: 0, // 不会自动关闭
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.initConnectSocket(); // 初始化Socket连接
  },
};
