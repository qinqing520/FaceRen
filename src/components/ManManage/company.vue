<template>
  <div>
    <el-card style="margin-top: 0.15rem;">
      <el-row justify="space-between"
              type="flex"
              :gutter="20"
              class="oneRow">
        <el-col :span="12">
          <span> 公司名称: <input placeholder="请输入公司名称"
                   v-model="seekCompanyName" /></span>
          <!-- 筛选按钮 -->
          <span @click="seekCompany"><img src="../../assets/img/seek02.png" /></span>
        </el-col>
        <el-col :span="3"
                v-if="listdata">企业总数: {{listdata.length}}</el-col>
      </el-row>
      <el-row class="twoRow">
        <!-- 添加按钮 -->
        <span @click="isAddCompany"><img src="../../assets/img/add202.png" /></span>
        <el-dialog title="添加企业信息"
                   :visible.sync="addCompany.dialogVisible"
                   width="30%">
          <div class="basicMessage">
            <div><b>公司名称:</b>
              <em>
                <el-input placeholder="请输入公司名称"
                          v-model="addCompany.CompanyName"></el-input>
              </em>
            </div>
            <div><b>公司地址:</b>
              <em>
                <el-input placeholder="请输入公司地址"
                          v-model="addCompany.CompanyAddress"></el-input>
              </em>
            </div>
            <div><b>公司电话:</b>
              <em>
                <el-input placeholder="请输入电话"
                          v-model="addCompany.CompanyTel"></el-input>
              </em>
            </div>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="addCompany.dialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="isconfirm">保存</el-button>
          </span>
        </el-dialog>
        <!-- 删除 -->
        <span @click="isDel"><img src="../../assets/img/del201.png" /></span>
      </el-row>
      <el-row>
        <!-- 表格 -->
        <el-table style="width: 100%"
                  :header-cell-style="{background:'#eee',color:'#000'}"
                  :data="listdata"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column label="序号"
                           align="center"
                           type="index"
                           width="55">
          </el-table-column>
          <el-table-column prop="company_name"
                           label="公司名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="company_address"
                           label="公司地址"
                           align="center">
          </el-table-column>
          <el-table-column prop="company_tel"
                           label="公司电话"
                           align="center">
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <!-- 编辑公司 -->
              <i style="padding: 0 0.08rem;"
                 @click="isEdit(scope)"><img src="../../assets/img/a_edit01.png"></i>
              <el-dialog title="修改企业信息"
                         :visible.sync="isEditdialogVisible"
                         width="30%">
                <div class="basicMessage">
                  <div><b>公司ID:</b>
                    <em>
                      <el-input placeholder="请输入公司名称"
                                v-model="addCompany.CompanyID"
                                disabled></el-input>
                    </em>
                  </div>
                  <div><b>公司名称:</b>
                    <em>
                      <el-input placeholder="请输入公司名称"
                                v-model="addCompany.CompanyName"></el-input>
                    </em>
                  </div>
                  <div><b>公司地址:</b>
                    <em>
                      <el-input placeholder="请输入公司地址"
                                v-model="addCompany.CompanyAddress"></el-input>
                    </em>
                  </div>
                  <div><b>公司电话:</b>
                    <em>
                      <el-input placeholder="请输入电话"
                                v-model="addCompany.CompanyTel"></el-input>
                    </em>
                  </div>
                </div>
                <span slot="footer"
                      class="dialog-footer">
                  <el-button @click="isEditdialogVisible= false">取 消</el-button>
                  <el-button type="primary"
                             @click="isEditconfirm">保存</el-button>
                </span>
              </el-dialog>
              <!-- 删除公司 -->
              <i style="padding: 0 0.08rem;"
                 @click="isDel(scope)"><img src="../../assets/img/a_del201.png"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页 -->
      <!-- <el-row>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage3"
                       :page-size="100"
                       layout="prev, pager, next, jumper"
                       :total="1000">
        </el-pagination>
      </el-row> -->
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      //公司表单数据
      listdata: [],
      // 添加公司数据
      addCompany: {
        dialogVisible: false,
        CompanyName: '',
        CompanyAddress: '',
        CompanyTel: '',
        CompanyID: ''
      },
      // 筛选公司
      seekCompanyName: '',
      isToken: '',
      isEditdialogVisible: false,
      delId: []
    }
  },
  created () {
    this.isToken = JSON.parse(sessionStorage.getItem("token"))
    this.getList()
  }, methods: {
    // 获取公司列表数据
    getList () {
      this.$http.get('/api' + "/company/find/list", {
        headers: {
          'Content-Type': 'application/json',
          'token': this.isToken
        }
      }).then(res => {
        this.listdata = res.data.data.list
        console.log(res)
      }).catch(err => {
        console.log("获取人员信息失败")
      })
    },
    // 查询公司按钮
    seekCompany () {
      this.$http.get('/api' + "/company/find/list?company_name=" + this.seekCompanyName + '', {
        headers: {
          'Content-Type': 'application/json',
          'token': this.isToken
        }
      }).then(res => {
        this.listdata = res.data.data.list
        console.log(res)
      }).catch(err => {
        console.log("获取人员信息失败")
      })
    },
    //添加公司按钮
    isAddCompany () {
      this.addCompany.dialogVisible = true
    },
    // 保存按钮
    isconfirm () {
      this.$http.post('/api' + "/company/add", {
        "company_name": this.addCompany.CompanyName,
        "company_address": this.addCompany.CompanyAddress,
        "company_tel": this.addCompany.CompanyTel
      }, {
          headers: {
            'Content-Type': 'application/json',
            'token': this.isToken
          }
        }).then(res => {
          this.addCompany.dialogVisible = false,
            // 添加完之后表单置空
            this.addCompany.CompanyName = null,
            this.addCompany.CompanyAddress = null,
            this.addCompany.CompanyTel = null
        }).catch(err => {
          console.log("添加公司失败")
        })
      this.getList()
    },
    // 删除公司按钮
    isDelCompany () {


    },
    // 复选框选择的时候
    handleSelectionChange (val) {
      console.log(val)
      val.forEach((ele, indx) => {
        this.delId.push(ele.company_id)
      });
      console.log(this.delId)
    },
    // 编辑公司按钮
    isEdit (scope) {
      this.isEditdialogVisible = true
      console.log(scope.row)
      this.addCompany.CompanyID = scope.row.company_id
      this.addCompany.CompanyName = scope.row.company_name
      this.addCompany.CompanyAddress = scope.row.company_address
      this.addCompany.CompanyTel = scope.row.company_tel
    },
    // 保存修改按钮
    isEditconfirm () {
      this.$http.post('/api' + "/company/update", {
        "company_id": this.addCompany.CompanyID,
        "company_name": this.addCompany.CompanyName,
        "company_address": this.addCompany.CompanyAddress,
        "company_tel": this.addCompany.CompanyTel
      }, {
          headers: {
            'Content-Type': 'application/json',
            'token': this.isToken
          }
        }).then(res => {
          this.isEditdialogVisible = false
        }).catch(err => {
          console.log("保存修改按钮失败！")
        })
      this.getList()
    },
    // 删除公司按钮
    async isDel (scope) {

      if (scope.row) {
        this.delId.push(scope.row.company_id)
      } else if (!this.delId.length) {
        this.$message({ message: "请您选择您需要删除的人员!", type: "warning" })
        return false
      }
      const confirmResult = await this.$confirm(
        '您确定要删除吗?',
        '删除人员信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      this.$http.post('/api' + "/company/del", this.delId, {
        headers: {
          'Content-Type': 'application/json',
          'token': this.isToken
        }
      }).then(res => {
        this.getList()
        console.log(res)
      }).catch(err => {
        console.log("添加公司失败")
      })

    }

  }
}
</script>
<style lang="less" scoped>
.oneRow {
  color: #3c4e86;
  font-size: 0.2rem;
  padding: 0.25rem 0;
  input {
    height: 0.27rem;
  }
  span {
    margin-right: 0.4rem;
  }
}
.twoRow {
  padding-bottom: 0.25rem;
  span {
    margin-right: 0.15rem;
  }
  .upPicture {
    position: relative;
    .isPicture {
      font-size: 0.2rem;
      color: #3c4e86;
      font-size: 0.2rem;
      font-weight: 700;
      position: absolute;
      left: 0.45rem;
    }
    em {
      margin-left: 1rem;
    }
  }
}
.titleMessage {
  color: black;
  padding-bottom: 0.2rem;
  font-weight: 700;
  text-align: left;
  span {
    font-weight: 500;
    font-size: 0.1rem;
  }
}
.basicMessage {
  color: #3c4e86;
  b {
    display: inline-block;
    width: 1rem;
    text-align: right;
    height: 0.5rem;
    font-size: 0.2rem;
    padding-right: 0.1rem;
  }
  // input {
  //   height: 0.3rem;
  //   width: 3.5rem;
  // }
  em {
    width: 4rem;
    display: inline-block;
  }
  // .el-input {
  //   display: inline;
  // }
}
// 上传照片
.upPicture {
  position: relative;
  .uploadPicture {
    position: absolute;
    left: 1.17rem;
    top: 0.21rem;
    button {
      position: relative;
      width: 1rem;
      height: 0.45rem;

      span {
        position: absolute;
        left: 0.16rem;
        top: 0.13rem;
        font-size: 0.16rem;
      }
    }
  }
}
</style>


