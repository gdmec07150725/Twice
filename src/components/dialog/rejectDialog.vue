<template>
  <div class="reject_inputWrapper" v-if="visible">
    <m-dialog
      title="拒绝内容"
      :dialogVisible="visible"
      :showClose="true"
      dialogWidth="95%"
      @onHandleClose="handleCloseDialog"
      :closeOnClickModal="false"
    >
      <div class="content_wrapper" slot="content">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="原因" prop="comment">
            <el-input
              v-model="form.comment"
              type="textarea"
              maxlength="255"
              :rows="4"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="action" slot="action">
        <delete-button
          :disabled="!form.comment"
          :loading="rejectLoading"
          @click="handleReject('form')"
        >
          确认拒绝
        </delete-button>
      </div>
    </m-dialog>
  </div>
</template>

<script>
import Mdialog from './index.vue';
import { Form, FormItem, Input } from 'element-ui';
import deleteButton from '_c/Button/deleteButton.vue';
export default {
  name: 'rejectDialog',
  components: {
    'm-dialog': Mdialog,
    deleteButton,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    rejectLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        comment: '',
      },
      rules: {
        comment: [
          {
            required: true,
            message: '请输入原因',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  watch: {
    visible() {
      this.form.comment = '';
    },
  },
  methods: {
    handleReject(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const { comment } = this.form;
          const params = {
            comment,
          };
          this.$emit('onHandleReject', params);
        }
      });
    },
    handleCloseDialog() {
      this.form.comment = '';
      this.$emit('onHandleCloseDialog');
    },
  },
};
</script>

<style scoped>
.content_wrapper {
  padding-top: 24px;
}
.reject_radioSelect {
  margin-top: 10px;
}
.reject_radio {
  display: block;
  margin-bottom: 8px;
}
.detailStatement {
  margin-left: 8px;
  font-size: 12px;
  color: #6c6c6c;
}
</style>
