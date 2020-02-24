<template>
  <div class="line_height">
    <el-table
      class="hide"
      :data="tableData"
      v-loading="loading"
      stripe
      border
      :header-cell-style="getRowClass"
      @sort-change="sortChange"
      @filter-change="filterChange"
      ref="table"
      :row-key="rowKey"
      :empty-text="emptyText"
    >
      <template v-for="item in tableColumns">
        <el-table-column
          v-if="item.filters && !item.slot"
          :column-key="item.prop"
          :key="item.prop"
          :fixed="item.fixed"
          :prop="item.prop"
          :label="item.label"
          :align="item.align || 'left'"
          :width="item.width"
          :min-width="item.minWidth"
          :show-overflow-tooltip="true"
          :sortable="item.sortable"
          :render-header="renderHeader"
        />
        <el-table-column
          v-if="item.filters && item.slot"
          :column-key="item.prop"
          :key="item.prop"
          :fixed="item.fixed"
          :prop="item.prop"
          :label="item.label"
          :align="item.align || 'left'"
          :width="item.width"
          :min-width="item.minWidth"
          :show-overflow-tooltip="true"
          :sortable="item.sortable"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <slot :row="scope.row" :name="item.prop" />
          </template>
        </el-table-column>
        <el-table-column
          v-if="!item.slot && !item.filters"
          :column-key="item.prop"
          :key="item.prop"
          :fixed="item.fixed"
          :prop="item.prop"
          :label="item.label"
          :align="item.align || 'left'"
          :width="item.width"
          :min-width="item.minWidth"
          :show-overflow-tooltip="true"
          :sortable="item.sortable"
        />
        <el-table-column
          :column-key="item.prop"
          :key="item.prop"
          v-if="item.slot && !item.filters"
          :fixed="item.fixed"
          :prop="item.prop"
          :label="item.label"
          :align="item.align || 'left'"
          :width="item.width"
          :min-width="item.minWidth"
          :show-overflow-tooltip="true"
          :sortable="item.sortable"
        >
          <template slot-scope="scope">
            <slot :row="scope.row" :name="item.prop" />
          </template>
        </el-table-column>
      </template>
      <template v-if="!ActionBar || !ActionBar.NoDisplayButton">
        <el-table-column fixed="right" label="操作" :width="actionWidth">
          <template slot-scope="scope">
            <slot :row="scope.row" name="btnGroup"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui';
import clonedeep from 'clonedeep';
export default {
  name: 'MTable',
  components: {
    'el-table': Table,
    'el-table-column': TableColumn,
  },
  props: {
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    tableColumns: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    stripe: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
    },
    rowKey: {
      type: String,
      default: '',
    },
    ActionBar: {
      type: Object,
      default: () => ({}),
    },
    actionWidth: {
      // 操作区的宽度
      type: Number,
      default: 150,
    },
  },
  data() {
    return {
      filterObj: {}, // 用于存储filter下拉框选中的值（dynamic）
      checkboxData: {}, // 用于存储checkbox的下拉数据 （dynamic）
      filterInput: {}, // 用于存储filter的input值（dynamic）
      indeterminate: {}, // 保存checkAll的半选中状态（dynamic）
      checkAll: {}, // 保存全选状态（dynamic）
    };
  },
  methods: {
    getRowClass() {
      return 'background:#EDF0F4;color:#fff;text-align:left;font-size:9px;font-weight:bold;border-right:1px solid #D3D6DD;color: #000000;';
    },
    sortChange({ prop, order }) {
      this.$emit('onHandleSortChange', prop, order);
    },
    filterChange(filters) {
      console.log('filters', filters);
      // const key = _.keys(filters)[0];
      // const value = filters[key];
      // this.$emit('onHandleFilterChange', key, value);
    },
    renderHeader(h, { column, $index }) {
      const { label } = column;
      const {
        filters,
        filterValue,
        filterInputValue,
        prop,
      } = this.tableColumns[$index];
      if (prop && !this.filterObj.hasOwnProperty(prop)) {
        this.$set(this.filterObj, prop, filterValue); // 创建当前filter值的响应式对象
      }
      if (prop && !this.filterInput.hasOwnProperty(prop)) {
        this.$set(this.filterInput, prop, filterInputValue); // 创建当前filter input值的响应式对象
      }
      if (prop && !this.indeterminate.hasOwnProperty(prop)) {
        this.$set(this.indeterminate, prop, false);
      }
      if (prop && !this.checkAll.hasOwnProperty(prop)) {
        this.$set(this.checkAll, prop, false);
      }
      if (
        prop &&
        filters &&
        filters.length > 0 &&
        !this.checkboxData.hasOwnProperty(prop)
      ) {
        let filterResult = clonedeep(filters);
        const lowerCaseValue = filterInputValue.toLowerCase();
        if (filterInputValue) {
          filterResult = filters.filter(item => {
            const lowerCaseText = item.text.toLowerCase();
            return lowerCaseText.indexOf(lowerCaseValue) !== -1;
          });
        }
        this.$set(this.checkboxData, prop, filterResult); // 创建当前filter列表的响应式对象
        // 设置全选的初始状态
        const checkedCount = filterValue.length;
        if (checkedCount > 0 && checkedCount < filters.length) {
          this.indeterminate[prop] = true;
        }
        if (checkedCount === filters.length) {
          this.checkAll[prop] = true;
        }
      }
      let filtersList = [];
      if (this.checkboxData[prop] && this.checkboxData[prop].length > 0) {
        filtersList = clonedeep(this.checkboxData[prop]);
      }
      const checkboxRender = filtersList.map(item => {
        return (
          <div
            style="margin-bottom: 10px; width: 98%; overflow: hidden;"
            key={item.value}
            title={item.text}>
            <custome-checkbox label={item.value}>{item.text}</custome-checkbox>
          </div>
        );
      });
      return (
        <span style="display: block; width: 100%; height: 100%;">
          <Popover placement="bottom" width="200" trigger="click">
            <div class="table_checkboxWrapper">
              <custome-input
                placeholder="搜索"
                value={this.filterInput[prop]}
                style="margin-bottom: 10px;"
                clearable={true}
                suffix-icon="el-icon-search"
                on-input={value => this.handleSearchInput(value, prop)}
                on-change={value =>
                  this.handleSearchChange(value, prop, filters)
                }
                nativeOnkeyup={e => this.handleKeyUp(e, prop, filters)}
              />
              <span
                class={
                  checkboxRender.length === filters.length
                    ? 'showAllCheck'
                    : 'hiddenAllCheck'
                }>
                <custome-checkbox
                  indeterminate={this.indeterminate[prop]}
                  value={this.checkAll[prop]}
                  on-input={value => this.handleCheckAllInput(value, prop)}
                  on-change={value =>
                    this.handleCheckAllChange(value, prop, filters)
                  }
                  style="margin-bottom: 10px;">
                  全选
                </custome-checkbox>
              </span>
              <div style="max-height: 300px; overflow-y: auto; margin-bottom: 12px;">
                {checkboxRender.length > 0 && (
                  <custome-checkbox-group
                    value={this.filterObj[prop]}
                    on-input={value => this.handleCheckboxInput(value, prop)}
                    on-change={value =>
                      this.handleCheckboxChange(value, prop, filters)
                    }>
                    {checkboxRender}
                  </custome-checkbox-group>
                )}
              </div>
              <div
                class="buttonGroup"
                style="display: flex; justify-content: space-between;">
                <custome-button
                  size="mini"
                  on-click={() => this.handleApply(prop)}
                  disabled={
                    this.filterObj[prop] && !this.filterObj[prop].length
                  }>
                  应用
                </custome-button>
                <custome-button
                  size="mini"
                  on-click={() => this.handleClear(prop, filters)}>
                  清除
                </custome-button>
              </div>
            </div>
            <div
              class="custome-header-wrapper"
              style="height: 34px; padding: 0; cursor: pointer;"
              slot="reference">
              <span
                class="custome-header-title"
                class={
                  this.filterObj[prop] && this.filterObj[prop].length
                    ? 'highlight'
                    : ''
                }>
                {label}
              </span>
              <span
                class={
                  this.filterObj[prop] && this.filterObj[prop].length
                    ? 'highlight'
                    : ''
                }>
                <i class="iconfont icon-guolv"></i>
              </span>
            </div>
          </Popover>
        </span>
      );
    },
    handleSearchInput(value, target) {
      this.filterInput[target] = value;
    },
    handleSearchChange(value, target, filtersOrigin = []) {
      let filterResult = clonedeep(filtersOrigin);
      const lowerCaseValue = value.toLowerCase();
      const newFilterValue = [];
      if (value && filtersOrigin) {
        filterResult = filtersOrigin.filter(item => {
          const lowerCaseText = item.text.toLowerCase();
          return lowerCaseText.indexOf(lowerCaseValue) !== -1;
        });
      }
      filterResult.forEach(item => {
        const { value } = item;
        if (this.filterObj[target].indexOf(value) !== -1) {
          newFilterValue.push(value);
        }
      });
      const checkedCount = this.filterObj[target].length;
      this.indeterminate[target] =
        checkedCount > 0 && checkedCount < filtersOrigin.length;
      this.filterObj[target] = newFilterValue;
      this.checkboxData[target] = clonedeep(filterResult);
    },
    handleKeyUp(e, target, filtersOrigin = []) {
      if (e.keyCode === 13) {
        this.handleSearchChange(
          this.filterInput[target],
          target,
          filtersOrigin
        );
      }
    },
    handleCheckAllInput(value, target) {
      this.checkAll[target] = value;
    },
    handleCheckAllChange(value, target, filtersOrigin = []) {
      const valueArray = filtersOrigin.map(item => item.value);
      this.filterObj[target] = value ? valueArray : [];
      this.indeterminate[target] = false;
    },
    handleCheckboxInput(value, target) {
      this.filterObj[target] = value;
    },
    handleCheckboxChange(value, target, filtersOrigin = []) {
      let checkedCount = value.length;
      this.checkAll[target] = checkedCount === filtersOrigin.length;
      this.indeterminate[target] =
        checkedCount > 0 && checkedCount < filtersOrigin.length;
    },
    handleApply(target) {
      this.$emit('onHandleFilterInputChange', target, this.filterInput[target]);
      this.$emit('onHandleFilterChange', target, this.filterObj[target]);
      document.getElementById('app').click();
    },
    handleClear(target, filtersOrigin = []) {
      this.filterObj[target] = [];
      this.filterInput[target] = '';
      this.indeterminate[target] = false;
      this.checkAll[target] = false;
      this.checkboxData[target] = clonedeep(filtersOrigin);
      this.$emit('onHandleFilterInputChange', target, this.filterInput[target]);
      this.$emit('onHandleFilterChange', target, this.filterObj[target]);
      document.getElementById('app').click();
    },
    sortColumns(props, order) {
      this.$refs.table.sort(props, order);
    },
    // renderRoleHeader(h, { column, $index }) {
    //   return h(
    //     'div',
    //     { style:'cursor: pointer;position: relative;padding-left:0px'},
    //     [
    //       h('span', column.label),
    //       h('i', {
    //         class:'iconfont icon-filter',
    //         style:'cursor: pointer;position: relative;width: 100%;text-align: right;'
    //       })
    //     ],
    //   );
    // },
    // none ()  {
    //   console.log('暂无')
    // }
  },
  mounted() {},
};
</script>

<style lang="less">
.el-table-filter__checkbox-group {
  .el-checkbox {
    display: flex !important;
    align-items: center;
    .el-checkbox__label {
      max-width: 200px !important;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.titleWrapper {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.el-table__fixed-right {
  height: 100% !important;
}
.table_checkboxWrapper {
  .el-checkbox {
    width: 100%;
    display: flex;
    align-items: center;
    .el-checkbox__label {
      display: block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.showAllCheck {
  display: block;
}
.hiddenAllCheck {
  display: none;
}
.highlight {
  color: #409eff;
}
</style>
