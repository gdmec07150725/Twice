<template>
  <div style="display: none;">
    <input
      ref="uploadInput"
      type="file"
      accept=".jpg, .png"
      @change="$event => handleChange($event)"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'customizeUpload', // 图片上传组件（没有UI， 只返回图片地址）
  data() {
    return {};
  },
  methods: {
    ...mapActions(['uploadSingleImage']),
    handleUpload() {
      // 阻止时间冒泡（但是不生效）
      event.stopPropagation();
      this.$refs['uploadInput'] && this.$refs['uploadInput'].click();
    },
    handleJudgeImageType(fileList = []) {
      // 判断图片类型
      const fileTypeJudgeResult = [];
      fileList.forEach(item => {
        const imgName = item.name;
        const pointIndex = imgName.lastIndexOf('.');
        if (pointIndex !== -1) {
          const fileType = imgName.substr(pointIndex + 1).toLowerCase();
          if (fileType !== 'png' && fileType !== 'jpg') {
            fileTypeJudgeResult.push(Promise.reject());
            return;
          } else {
            fileTypeJudgeResult.push(Promise.resolve(item));
          }
        }
      });
      return fileTypeJudgeResult;
    },
    handleChange(event) {
      const file = event.target.files;
      const judgeResult = this.handleJudgeImageType(file);
      Promise.all(judgeResult)
        .then(res => {
          this.submitFile(res[0]); // 取第一张进行上传
        })
        .catch(() => {
          console.log('oops');
        });
    },
    async submitFile(res) {
      try {
        if (res) {
          const formData = new FormData(); // 使用FormData上传图片
          formData.append('file', res);
          this.$emit('onHandleStartUpload'); // 开始上传
          const { data } = await this.uploadSingleImage(formData);
          if (data) {
            this.$emit('onHandleImageUrl', data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
