<template>
  <div>
    <el-col :span="11">
      <el-date-picker
        v-model="date"
        type="date"
        :editable="false"
        :clearable="false"
        @change="handleChangeDate"
        :picker-options="{
          disabledDate(time) {
            return time.getTime() < minDate;
          },
          format: 'YYYY-MM-DD',
        }"
        :placeholder="placeholderDate"
        style="width: 100%;"
      ></el-date-picker>
    </el-col>
    <el-col class="line" :span="2" style="text-align: center;">-</el-col>
    <el-col :span="11">
      <el-time-select
        ref="elTimeSelect"
        v-model="time"
        :editable="false"
        @change="handleChangeTime"
        :picker-options="{
          start: '00:00',
          step: '00:15',
          end: '23:30',
          minTime: minTime,
        }"
        :placeholder="placeholderTime"
        style="width: 100%;"
      ></el-time-select>
    </el-col>
  </div>
</template>

<script>
import { Col, DatePicker, TimeSelect } from 'element-ui';
import moment from 'moment';
export default {
  name: 'PublishTimePicker', // 不是公用的
  components: {
    'el-col': Col,
    'el-date-picker': DatePicker,
    'el-time-select': TimeSelect,
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholderDate: {
      type: String,
      default: '请选择日期',
    },
    placeholderTime: {
      type: String,
      default: '请选择时间',
    },
  },
  computed: {
    minDate() {
      return new Date(
        moment(
          (parseInt(new Date().getTime() / 1000) - 3600 * 24) * 1000
        ).valueOf()
      );
    },
    minTime() {
      // 同一天
      if (
        this.date &&
        moment(this.date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ) {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        return `${hours}:${minutes}`;
      } else {
        return false;
      }
    },
  },
  watch: {
    value(newVal) {
      if (!newVal || parseInt(newVal, 10) === 0) {
        this.timeValue = '';
        this.date = '';
        this.time = '';
      } else {
        this.timeValue = newVal;
      }
      this.initInnerValue();
    },
  },
  data() {
    return {
      date: '',
      time: '',
      timeValue: '',
    };
  },
  methods: {
    handleChangeDate() {
      // console.log("this.date", this.date, this.time);
      if (this.date && !this.time) {
        this.setDefaultTime(this.date);
      } else if (this.date && this.time) {
        if (
          moment(this.date).format('YYYY-MM-DD') ===
          moment().format('YYYY-MM-DD')
        ) {
          let nowHours = new Date().getHours();
          let nowMinutes = new Date().getMinutes();
          let selectHours = this.time.split(':')[0];
          let selectMinutes = this.time.split(':')[1];
          if (selectHours < nowHours) {
            this.setDefaultTime(this.date);
          } else if (selectHours == nowHours && selectMinutes < nowMinutes) {
            this.setDefaultTime(this.date);
          }
        }
      }
      if (!this.date) {
        this.time = '';
      }
      this.bindValue();
      this.$refs.elTimeSelect.focus();
    },
    handleChangeTime() {
      if (this.time && !this.date) {
        const d = new Date();
        // 只选中time之后的Date
        const defaultTime = moment(
          `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${this.time}`
        ).format('X');
        // 当前时间
        const currentTime = new Date().getTime() / 1000;
        if (defaultTime > currentTime) {
          this.date = moment(
            parseInt(new Date().getTime() / 1000) * 1000
          ).valueOf();
        } else {
          this.date = moment(
            (parseInt(new Date().getTime() / 1000) + 3600 * 24) * 1000
          ).valueOf();
        }
      }
      if (!this.time) {
        this.date = '';
      }
      this.bindValue();
    },
    bindValue() {
      // console.log("this.date", this.date, this.time);
      if (this.date && this.time) {
        let newDate = new Date(this.date);
        newDate.setHours(this.time.split(':')[0]);
        newDate.setMinutes(this.time.split(':')[1]);
        const final = newDate.getTime();
        this.$emit('input', final);
      } else if (!this.date && !this.time) {
        this.$emit('input', 0);
      }
    },
    initInnerValue() {
      if (!this.timeValue) {
        return;
      }
      this.date = new Date(this.timeValue);
      this.time = moment(this.timeValue).format('HH:mm');
    },
    setDefaultTime(newVal) {
      if (
        moment(newVal).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ) {
        let nowHours = new Date().getHours();
        let nowMinutes = new Date().getMinutes();
        let defaultTime = '00:00';
        if (nowMinutes < 15) {
          defaultTime = `${nowHours}:15`;
        } else if (nowMinutes < 30) {
          defaultTime = `${nowHours}:30`;
        } else if (nowMinutes < 45) {
          defaultTime = `${nowHours}:45`;
        } else if (nowMinutes < 59) {
          defaultTime = `${nowHours + 1}:00`;
        }
        this.time = defaultTime;
      } else {
        this.time = '00:00';
      }
    },
  },
  created() {
    if (!this.value || parseInt(this.value, 10) === 0) {
      this.timeValue = '';
    } else {
      this.timeValue = this.value;
    }
    this.initInnerValue();
  },
};
</script>
