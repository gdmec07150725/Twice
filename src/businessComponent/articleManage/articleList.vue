<template>
  <div class="reminders-list">
    <p class="title">文章管理</p>
    <m-card>
      <div slot="search">
        <div class="filterInput">
          <m-search
            :searchText="filter.title"
            @onHandleSubmitSearch="handleSubmitSearch"
          />
        </div>
      </div>
      <div slot="content">
        <m-table
          :rowStyle="{ cursor: 'pointer' }"
          :tableColumns="tableColumns"
          :tableData="articleList"
          :loading="tableLoading"
          ref="articleTable"
          :actionWidth="145"
          @rowClick="handleRowClick"
        >
          <template #category="{ row}">
            {{ row.category && row.category.name }}
          </template>
          <template #createdAt="{ row }">
            {{ row.createdAt | formatTime }}
          </template>
          <template #publishedAt="{ row }">
            {{ row.publishedAt | formatTime }}
          </template>
          <template #status="{ row }">
            <table-status :status="row.status && row.status" />
          </template>
          <template #btnGroup="{ row }">
            <div class="operation">
              <edit-button
                :disabled="row.status !== 'ARTICLE_STATUS_CHECKING'"
                @click="handleAgree(row)"
              >
                同意
              </edit-button>
              <delete-button
                class="global_button"
                :disabled="row.status !== 'ARTICLE_STATUS_CHECKING'"
                @click="openRejectModal(row)"
              >
                拒绝
              </delete-button>
            </div>
          </template>
        </m-table>
        <m-pagination
          :currentPage="pagination.page"
          :pageSize="pagination.rows"
          :total="pagination.total"
          @onHandleCurrentChange="handleCurrentChange"
        />
      </div>
    </m-card>
    <reject-dialog
      :visible="rejectDialogVisible"
      :rejectLoading="rejectLoading"
      @onHandleReject="handleReject"
      @onHandleCloseDialog="handleCloseDialog"
    />
    <article-detail
      ref="articleDetail"
      :articleId="currentArticleDetail.id"
      :openDrawer="openDrawer"
      @onHandleAgree="handleAgree"
      @onOpenRejectModal="openRejectModal"
      @onHandleCloseDrawer="handleCloseDrawer"
    />
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import MTable from '_c/table/table.vue';
import MCard from '_c/card';
import MSearch from '_c/search';
import tableStatus from '_c/status/tableStatus';
import MPagination from '_c/pagination';
import rejectDialog from '_c/dialog/rejectDialog.vue';
import articleDetail from './articleDetail.vue';
import { filterData } from '@/utils/utils';
import storage from '@/utils/storage';

export default {
  name: 'articleList',
  components: {
    MTable,
    MCard,
    MSearch,
    tableStatus,
    rejectDialog,
    MPagination,
    articleDetail,
  },
  computed: {
    ...mapState({
      articleList: state => state.article.cmsArticleList,
      pagination: state => state.article.cmsArticlePagination,
      filter: state => state.filter.filter.article,
      // filterInputValue: state => state.filter.filterInput.reminders,
    }),
  },
  data() {
    return {
      tableColumns: [
        {
          prop: 'title',
          label: '文章标题',
          slot: false,
        },
        {
          prop: 'userId',
          label: '用户名称',
          slot: false,
        },
        {
          prop: 'category',
          label: '所属专栏',
          slot: true,
        },
        {
          prop: 'createdAt',
          label: '创建时间',
          slot: true,
        },
        {
          prop: 'publishedAt',
          label: '发布时间',
          slot: true,
        },
        {
          prop: 'status',
          label: '状态',
          slot: true,
        },
      ],
      tableLoading: false,
      rejectDialogVisible: false,
      rejectLoading: false,
      openDrawer: false,
      currentArticleDetail: {}, // 当前预览的文章详情
    };
  },
  methods: {
    ...mapActions(['getCmsArticleList', 'approveArticle']),
    ...mapMutations(['CHANGEFILTER']),
    handleError(error = {}) {
      const { message = '' } = error;
      message && this.$message.error(message);
    },
    handleSubmitSearch(searchValue) {
      this.handlefilterChange('title', searchValue);
    },
    handlefilterChange(filterKey, filterValue) {
      const filterParams = {
        filterKey,
        filterValue,
        page: 'article',
      };
      const params = {
        page: 1,
      };
      this.CHANGEFILTER(filterParams);
      this.loadArticleList(params);
    },
    handleCurrentChange(currentPage) {
      const params = {
        page: currentPage,
      };
      this.loadArticleList(params);
    },
    loadArticleList(params = {}) {
      const concatParams = {
        ...params,
        ...this.filter,
      };
      this.queryArticleList(concatParams);
    },
    async queryArticleList(params = {}) {
      try {
        const concatParams = {
          page: this.pagination.page,
          rows: this.pagination.rows,
          companyId: JSON.parse(storage.getCompanyDetail()).id,
          ...params,
        };
        this.tableLoading = true;
        await this.getCmsArticleList(filterData(concatParams));
        this.tableLoading = false;
      } catch (error) {
        this.tableLoading = false;
      }
    },
    handleRowClick(record) {
      this.openDrawer = true;
      this.currentArticleDetail = { ...record };
    },
    handleCloseDrawer() {
      this.openDrawer = false;
    },
    async handleAgree(record) {
      try {
        await this.$confirm('确认通过审核？ 文章将立马发布！', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
        });
        const params = { ...record, status: 'ARTICLE_STATUS_ADOPT' };
        const res = await this.approveArticle(params);
        if (res && res.message) {
          this.$message.success(res.message);
        }
        if (this.$refs['articleDetail']) {
          this.$refs['articleDetail'].queryArticleDetail();
        }
        this.loadArticleList();
      } catch (error) {
        this.handleError(error);
      }
    },
    openRejectModal(record) {
      this.rejectDialogVisible = true;
      this.currentArticleDetail = { ...record };
    },
    handleCloseDialog() {
      this.rejectDialogVisible = false;
    },
    async handleReject(params) {
      try {
        const { comment } = params;
        const concatParams = {
          ...this.currentArticleDetail,
          refuseReason: comment,
          status: 'ARTICLE_STATUS_REJECT',
        };
        this.rejectLoading = true;
        const res = await this.approveArticle(concatParams);
        if (res && res.message) {
          this.$message.success(res.message);
        }
        if (this.$refs['articleDetail']) {
          this.$refs['articleDetail'].queryArticleDetail();
        }
        this.rejectLoading = false;
        this.handleCloseDialog();
        this.loadArticleList();
      } catch (error) {
        this.rejectLoading = false;
        this.handleError(error);
      }
    },
  },
  created() {
    this.loadArticleList();
  },
};
</script>
