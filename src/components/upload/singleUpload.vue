<template>
  <!-- 只能上传一张图片 -->
  <div class="upload_wrapper">
    <el-upload
      class="avatar-uploader"
      accept=".png, .jpg, .bmp, .gif, .webp"
      :headers="headers"
      :action="baseURL"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :before-remove="beforeRemove"
      :on-preview="handlePictureCardPreview"
      :on-success="handleAvatarSuccess"
      :on-error="handleError"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <template v-if="dialogVisible">
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="imageUrl" />
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { Upload, Dialog } from 'element-ui';
import configs from '@/configs';
import storage from '@/utils/storage';

export default {
  name: 'singleUpload',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  components: {
    'el-upload': Upload,
    'el-dialog': Dialog,
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      baseURL: `${configs.serverURL}/upload-service/upload`,
      imageUrl: '',
      headers: { Authorization: storage.getToken() },
      // currentNumber: 0 // 当limit不为1的时候, 用于控制图片没上传完的Icon显示隐藏
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log('isLt2M', isLt2M);
      if (!isJPG && !isPNG) {
        this.$message.error('仅支持jpg/png格式！');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过2M！');
        return false;
      }
      return (isJPG || isPNG) && isLt2M;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
      this.$emit('input', this.imageUrl);
      this.$emit('onSuccess');
    },
    handleRemove() {
      this.$emit('input', '');
    },
    beforeRemove() {
      return this.$confirm(
        this.$t('components_upload_index_tip_delete'),
        this.$t('prompt_title'),
        {
          confirmButtonText: this.$t('btn_determine'),
          cancelButtonText: this.$t('btn_cancel'),
          type: 'warning',
          closeOnClickModal: false,
        }
      );
    },
    handleError(err) {
      if (err && err.status === 401) {
        storage.cleanLogin();
        // window.bugs.$emit('show-logout-confirm');
      } else {
        this.$message.error('上传错误');
      }
    },
  },
  created() {
    this.imageUrl = this.value;
  },
};
</script>

<style lang="less">
.upload_wrapper {
  // 删除'按delete'键可删除那个标识
  .el-icon-close-tip {
    display: none !important;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 135px;
    height: 135px;
    line-height: 135px;
    text-align: center;
  }
  .avatar {
    width: 135px;
    height: 135px;
    display: block;
  }
}
</style>
