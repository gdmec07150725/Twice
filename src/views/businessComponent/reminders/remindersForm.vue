<template>
  <div>
    <m-dialog
      title="新增提醒事项"
      :dialogVisible="true"
      :isDestroyClose="true"
      @onHandleClose="handleCloseDialog"
    >
      <el-form
        ref="form"
        :model="remindersForm"
        label-width="100px"
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
        <el-form-item label="提醒时间" prop="time">
          <el-date-picker
            type="date"
            placeholder="请选择提醒时间"
            v-model="remindersForm.time"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="提前时间" prop="advance">
          <el-select
            v-model="remindersForm.advance"
            placeholder="请选择提前时间"
          >
            <!-- <template v-for="item in companyType">
              <el-option
                :label="item.paramValue"
                :value="item.paramValue"
                :key="item.paramValue"
              ></el-option>
            </template>-->
          </el-select>
        </el-form-item>
        <el-form-item label="权重" prop="weights">
          <el-select v-model="remindersForm.weights" placeholder="请选择权重">
            <!-- <template v-for="item in companyType">
              <el-option
                :label="item.paramValue"
                :value="item.paramValue"
                :key="item.paramValue"
              ></el-option>
            </template>-->
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
import { Form, FormItem, Input, DatePicker, Select } from 'element-ui';
import MDialog from '_c/dialog';
export default {
  name: 'remindersForm',
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-date-picker': DatePicker,
    'el-select': Select,
    // 'el-option': Option,
    MDialog,
  },
  data() {
    return {
      remindersForm: {
        content: '',
        time: '',
        advance: '',
        weights: '',
      },
      rules: {
        content: [
          {
            required: true,
            message: '请输入提醒内容',
            trigger: 'blur',
          },
        ],
        time: [
          {
            required: true,
            message: '请选择提醒时间',
            trigger: 'change',
          },
        ],
        weights: [
          {
            required: true,
            message: '请选择权重',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    handleCreateClick() {},
    handleEditReminders() {},
    handleCloseDialog(refresh = false) {
      this.$emit('onHandleCloseDialog', refresh);
    },
  },
};
</script>
