<template>
  <div>
    <m-dialog
      dialogWidth="25%"
      title="新增提醒事项"
      :dialogVisible="true"
      :isDestroyClose="true"
      @onHandleClose="handleCloseDialog"
    >
      <el-form
        ref="form"
        :model="remindersForm"
        label-width="80px"
        slot="content"
        :rules="rules"
      >
        <el-form-item label="提醒内容" prop="content">
          <el-input
            v-model="remindersForm.content"
            placeholder="请输入提醒内容"
            maxlength="64"
          ></el-input>
        </el-form-item>
        <el-form-item label="提醒时间" prop="remindAt">
          <publish-time-picker
            v-model="remindersForm.remindAt"
            placeholderDate="提醒日期"
            placeholderTime="提醒时间"
          />
        </el-form-item>
        <el-form-item label="权重" prop="prior">
          <el-select v-model="remindersForm.prior" placeholder="请选择权重">
            <!-- <template v-for="item in companyType">
              <el-option
                :label="item.paramValue"
                :value="item.paramValue"
                :key="item.paramValue"
              ></el-option>
            </template>-->
            <el-option label="高" value="高"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="action">
        <edit-button
          @click="
            actionType === 1 ? handleCreateClick() : handleEditReminders()
          "
          :loading="addLoading"
        >
          {{ actionType === 1 ? '创建' : '保存' }}</edit-button
        >
      </div>
    </m-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { Form, FormItem, Input, Select, Option } from 'element-ui';
import MDialog from '_c/dialog';
import publishTimePicker from '_c/timeSelect/publishTimePicker.vue';
import * as filter from '@/utils/filter';
export default {
  name: 'remindersForm',
  props: {
    actionType: {
      type: Number,
      default: 1,
    },
    remindersDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-select': Select,
    'el-option': Option,
    MDialog,
    publishTimePicker,
  },
  data() {
    return {
      remindersForm: {
        content: '',
        remindAt: 0,
        prior: '',
      },
      rules: {
        content: [
          {
            required: true,
            message: '请输入提醒内容',
            trigger: 'blur',
          },
        ],
        remindAt: [
          {
            required: true,
            message: '请选择提醒时间',
            trigger: 'change',
          },
        ],
        prior: [
          {
            required: true,
            message: '请选择权重',
            trigger: 'change',
          },
        ],
      },
      addLoading: false,
    };
  },
  methods: {
    ...mapActions(['createNewReminders']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleCreateClick() {
      this.$refs['form'].validate(pass => {
        if (pass) {
          this.handleCreateReminders();
        }
      });
    },
    async handleCreateReminders() {
      try {
        const params = {
          ...this.remindersForm,
        };
        console.log(params);
        this.addLoading = true;
        const res = await this.createNewReminders(params);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    async handleEditReminders() {
      try {
        const { id } = this.remindersDetail;
        const params = {
          id,
          ...this.remindersForm,
        };
        this.addLoading = true;
        const res = await this.editReminders(params);
        const { message = '' } = res;
        message && this.$message.success(message);
        this.addLoading = false;
        this.handleCloseDialog(true);
      } catch (error) {
        this.addLoading = false;
        this.handleError(error);
      }
    },
    initReminders() {
      Object.keys(this.remindersForm).forEach(item => {
        this.remindersForm[item] = this.remindersDetail[item] || '';
      });
      const { remindAt } = this.remindersDetail;
      this.remindersForm['remindAt'] = filter.timestampDate(remindAt || '');
    },
    handleCloseDialog(refresh = false) {
      this.$emit('onHandleCloseDialog', refresh);
    },
  },
  created() {
    if (this.actionType === 2) {
      this.initReminders();
    }
  },
};
</script>
