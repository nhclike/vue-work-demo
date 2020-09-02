/* 表格-组件 */
<template>
  <div class="shjListPage">
    <div ref="top">
      <!-- 列表标题区 -->
      <div v-if="tableTitle.length>0" class="table-top">
        <!-- <span class="flag">&nbsp;</span> -->
        <span class="title">{{tableTitle}}</span>
      </div>
      <!-- 列表查询区 -->
      <div v-if="showInquire" class="form-body inquire">
        <slot name="tableInquire">
          <!-- 通过引用slot="tableInquire"在此位置插入类似以下操作按钮内容 -->
          <!-- <div slot="tableInquire" class="label-justify">
            <el-form :model="inquireForm" :label-position="'left'" label-width="1rem" status-icon>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="议题类型" class>
                    <el-select v-model="inquireForm.type" placeholder clearable>
                      <el-option
                        v-for="item in confJSON.confTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="议题状态" class>
                    <el-select v-model="inquireForm.status" placeholder="状态">
                      <el-option
                        v-for="item in confJSON.confStatusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="议题时间" class>
                    <el-date-picker
                      v-model="inquireForm.showDate"
                      type="datetimerange"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="关键字" class>
                    <el-input v-model="inquireForm.keyword" placeholder="关键字" />
                  </el-form-item>
                </el-col>

                <el-col :span="12" class="btn-box">
                  <button
                    class="bg-color-primary"
                    @keyup.enter="queryList"
                    @click.prevent="queryList"
                  >查询</button>
                </el-col>
              </el-row>
            </el-form>
          </div>-->
        </slot>
      </div>
      <!-- 列表操作条 -->
      <div v-if="showOperate">
        <slot name="tableOperateBox">
          <!-- 通过引用slot="tableOperateBox"在此位置插入类似以下操作按钮内容 -->
          <!-- <a  href="javascript:" @click="">新增</a> -->
        </slot>
      </div>
    </div>

    <!-- 列表内容区 -->
    <div class="tableContent" :style="tableStyle">
      <el-table
        :data="tableData"
        v-loading="loading"
        ref="multipleTable"
        element-loading-text="拼命加载中"
        :default-sort="defaultSort"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @cell-mouse-enter="handleCellMouseEnter"
        @cell-mouse-leave="handleCellMouseLeave"
        @cell-click="handleCellClick"
      >
        <el-table-column
          v-if="showTableSelection"
          type="selection"
          label="全选"
          :width="tableSelection.width"
          :min-width="tableSelection.minWidth"
          align="center"
          header-align="center"
        ></el-table-column>
        <slot name="tableColumnHead"></slot>
        <el-table-column
          show-overflow-tooltip
          v-for="item in tableColumnData"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :formatter="item.formatter"
          align="center"
          header-align="center"
          :sortable="item.sortable"
        ></el-table-column>

        <!-- 操作栏按钮 -->
        <el-table-column
          v-if="showTableOperate"
          label="操作"
          :width="tableOperateWidth.width"
          :min-width="tableOperateWidth.minWidth"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span
              v-for="(item,index) in tableOperate"
              :key="index"
              v-if="showOperateBtn(scope.row,item,index)"
              :id="item.id"
              class="listButton"
              :class="item.class"
              @click="handleClickOperte(scope.row,item,index)"
            >{{item.text}}</span>
          </template>
        </el-table-column>
        <slot name="tableColumn">
          <!-- 通过引用slot="tableColumn"在此位置插入类似以下操作按钮内容 -->
          <!-- <div slot="tableColumn">
              <el-table-column
                label="操作"
                :width="tableOperateWidth.width"
                :min-width="tableOperateWidth.minWidth"
              >
                <template slot-scope="scope">
                  <span
                    v-for="(item,index) in tableOperate"
                    :key="index"
                    :id="item.id"
                    class="listButton"
                    :class="item.class"
                    @click="handleClick(scope.row,item,index)"
                  >{{item.conntentText}}</span>
                </template>
              </el-table-column>
            </div>
            <div slot="tableColumn">
              <el-table-column
                label="名称"
                width
                min-width="100"
                align="center"
                header-align="center"
              >
                <template slot-scope="scope">
                  <div
                    class="list-view"
                    @click="()=>{showAlertBoxNews=true;operateBtnName='view';rowId=scope.row.id}"
                  >{{scope.row.name}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="时间"
                width
                min-width="100"
                align="center"
                header-align="center"
                sortable
                sort-by="createTime"
                prop="createTime"
              >
                <template slot-scope="scope">
                  <div>{{scope.row.createTime}}</div>
                </template>
              </el-table-column>
          </div>-->
        </slot>
      </el-table>
    </div>
    <!-- 列表分页区 -->
    <div ref="pagination" class="tablePagination block">
      <!-- <span class="demonstration">分页</span> -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tablePaginationData.currentPage"
        :page-sizes="tablePaginationData.pageSizes"
        :page-size="tablePaginationData.pageSize"
        :layout="tablePaginationData.layout"
        :total="tablePaginationData.total"
      >
        <span class="pagination_slot" v-if="tablePaginationData.layout.indexOf('->')>-1">
          共
          <i class="font-color-primary">{{tablePaginationData.pages}}</i>页
          <i class="font-color-primary">{{tablePaginationData.total}}</i>条记录
        </span>
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
    name: 'shj-list-page',
    components: {},
    props: {
        /* [表格组件-1] */
        // 默认排序方式
        defaultSort: {
            default: () => ({
                // prop: 'type',
                // order: 'descending'
            }),
            required: false
        },
        // 标题，为空时不显示
        tableTitle: {
            type: String,
            default: '',
            required: false
        },
        // 是否显示-查询区
        showInquire: {
            type: Boolean,
            default: false,
            required: false
        },
        // 是否显示-操作条
        showOperate: {
            type: Boolean,
            default: false,
            required: false
        },
        // 是否显示-列[选择]
        showTableSelection: {
            type: Boolean,
            default: false,
            required: false
        },
        // 列[选择]-参数配置
        tableSelection: {
            default: () => ({
                width: '',
                minWidth: '30'
            }),
            required: false
        },
        // 列[选择]-选中列表
        multipleSelection: {
            default: '',
            required: false,
            validator(value) {
                return true;
            }
        },
        // 列[基本]-参数配置
        tableColumnData: {
            default: () => [
                // {
                //     prop: 'fieldname ',
                //     label: '字段中文名称',
                //     width: '',
                //     minWidth: '30',
                //     formatter: this.formatEmpty,
                //     sortable: false
                // }
            ],
            required: false
        },
        // 行-数据
        tableData: {
            default: () => [],
            required: false
        },
        // 是否显示-列[操作]
        showTableOperate: {
            default: true,
            required: false
        },
        // 列[操作]-参数配置
        tableOperateWidth: {
            default: () => ({
                width: '',
                minWidth: '30'
            }),
            required: false
        },
        // 列[操作-按钮]-数据
        tableOperate: {
            default: () => [
                // {
                //   id: 'idName', // DOM节点id,用来确定样式或特殊操作
                //   class: 'className', // 样式名称
                //   conntentText: 'conntentText', // 按钮内容
                //   status: 'status', // 根据按钮状态绑定确定是否显示该按钮 当与状态绑定时， 在[showOperateBtn]中进行判断，如:showOperateBtn="showOperateBtn" 返回true则显示该按钮,多个状态可定义如 status:'0,1,2,3',使用 item.status.split(',').indexOf(String(row.status))!==-1进行判断
                //   active: true// 是否显示按钮
                // }
            ],
            required: false
        },
        // 是否显示-列[操作-按钮]中部分按钮
        showOperateBtn: {
            type: Function,
            default: (row, item, index) => {
                let active = item.active;
                if (active) {
                    return true;
                }
            }
        },
        // 分页-数据
        tablePaginationData: {
            type: Object,
            default: () => ({
                pageSizes: [10, 20, 50, 100], // 选择每页数量
                currentPage: 1, // 当前页码
                pageSize: 10, // 每页数量
                total: 0, // 总数量
                pages: 0, // 共几页
                layout: 'slot,->, prev, pager, next, jumper' // 页面布局样式
            }),
            required: false
        }
    },
    data() {
        return {
            tableStyle: 'height:0px',
            loading: false // 是否显示-加载中
        };
    },
    computed: {},
    watch: {
    // tableOperate: {
    //     handler() {
    //     },
    //     deep: true,
    //     immediate: true
    // }
    },
    // created() {},
    mounted() {
        this.setTableStyle();
    },
    methods: {
        setTableStyle() {
            let topH = this.$refs.top.clientHeight;
            let bottomH = this.$refs.pagination.clientHeight;
            this.tableStyle = `height:calc(100% - ${topH + bottomH}px)`;
        },
        /* 表格的方法 */
        /* cellStyle({ row, column, rowIndex, columnIndex }) {
            return {
                'line-height': '70px',
                height: '70px',
                'font-size': '24px'
            };
        },
        headerCellStyle({ row, column, rowIndex, columnIndex }) {
            return {
                'line-height': '70px',
                height: '70px',
                'font-size': '26px',
                background: '#1677ff',
                'font-weight': '500',
                color: '#fff'
            };
        }, */

        // 列[选择]-change事件-选中的表格数据发生改变
        handleSelectionChange(val) {
            // this.multipleSelection = val;
            // 子传父
            this.$emit('handleSelectionChange', { val });
        },

        // 单元格-hover事件
        handleCellMouseEnter(row, column, cell, event) {
            // console.log('handleCellMouseEnter', row, column, cell, event);
            // 子传父
            this.$emit('handleCellMouseEnter', row, column, cell, event);
            // if (column.property === 'liveUrl') {
            //     cell.classList.add('activeCell');
            // }
        },

        // 单元格-hover退出事件
        handleCellMouseLeave(row, column, cell, event) {
            // console.log('handleCellMouseLeave', row, column, cell, event);
            // 子传父
            this.$emit('handleCellMouseLeave', row, column, cell, event);
            // if (column.property === 'liveUrl') {
            //     cell.classList.remove('activeCell');
            // }
        },

        // 单元格-click事件
        handleCellClick(row, column, cell, event) {
            // console.log('handleCellClick', row, column, cell, event);
            // 子传父
            this.$emit('handleCellClick', row, column, cell, event);
        },

        // 按钮点击-列[操作-按钮]
        handleClickOperte(row, item, index) {
            // 子传父
            this.$emit('handleClickOperte', row, item, index);
        },

        // 每页数量-pageSize-change事件-表格数据重新渲染
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            // 子传父
            this.$emit('handleSizeChange', val);
        },

        // 页码-currentPage-change事件-表格数据重新渲染
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            // 子传父
            this.$emit('handleCurrentChange', val);
        }
    }
};
</script>
<style lang='less'>
@import '../../assets/style/table/el-table.less';
</style>

