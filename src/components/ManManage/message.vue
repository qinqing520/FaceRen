<template>
  <div>
    <el-card style="margin-top: 0.15rem;">
      <el-row justify="space-between"
              type="flex"
              :gutter="20"
              class="oneRow">
        <el-col :span="12">
          <span> 公司: <input placeholder="请输入编号"
                   v-model="seekCompany" /></span>
          <span> 姓名：<input placeholder="请输入姓名"
                   v-model="seekName" /></span>
          <!-- 筛选按钮 -->
          <span @click="seekMesssage"><img src="../../assets/img/seek01.png" /></span>
          <!-- <span><img src="../../assets/img/seek02.png" /></span> -->
        </el-col>
        <el-col :span="2"
                v-if="listdata.length">总人数: {{listdata.length}}</el-col>
      </el-row>
      <el-row class="twoRow">
        <!-- 添加按钮 -->
        <span @click="isAdduser"><img src="../../assets/img/add01.png" /></span>
        <el-dialog title="添加人员信息"
                   :visible.sync="adduser.dialogVisible"
                   width="30%">
          <div class="titleMessage">1.基本信息</div>
          <div class="basicMessage">
            <div><b>公司:</b>
              <em>
                <el-select v-model="adduser.companyData"
                           slot="prepend"
                           placeholder="请选择公司">
                  <el-option v-for="item in companyList"
                             :key="item.company_id"
                             :label="item.company_name"
                             :value="item.company_id">
                  </el-option>
                </el-select>
              </em>
            </div>
            <div><b>用户名:</b>
              <em>
                <el-input placeholder="请输入用户名"
                          v-model="adduser.username"></el-input>
              </em>
            </div>
            <div><b>性别:</b>
              <em>
                <el-select v-model="adduser.sex"
                           slot="prepend"
                           placeholder="请输入性别">
                  <el-option label="女"
                             value="女">
                  </el-option>
                  <el-option label="男"
                             value="男">
                  </el-option>
                </el-select>
              </em>
            </div>
            <div><b>密码:</b>
              <em>
                <el-input placeholder="请输入密码"
                          type="password"
                          v-model="adduser.password"></el-input>
              </em>
            </div>

            <div> <b>出生日期:</b>
              <em>
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="adduser.AbirthData"
                                style="width: 100%;"></el-date-picker>
              </em>
            </div>
          </div>
          <div class="titleMessage">2.人脸底部照片<span>(只能上传jpg/png文件，且不超过500kb)</span></div>
          <div class="upPicture"><span class="isPicture">照片:</span><em>
              <!-- <div class="uploadPicture">
                <el-upload class="upload-demo"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :before-remove="beforeRemove"
                           multiple
                           :limit="3"
                           :on-exceed="handleExceed"
                           :file-list="fileList">
                  <el-button size="small"
                             type="primary">本地选取</el-button>
                </el-upload>
              </div> -->
              <!-- <img src="../../assets/img/image_bg.png" /> -->

              <el-upload :action="UploadUrl"
                         list-type="picture-card"
                         :on-preview="handlePictureCardPreview"
                         :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%"
                     :src="dialogImageUrl"
                     alt="">
              </el-dialog>
            </em></div>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="adduser.dialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="isconfirm">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 删除 -->
        <span @click="isDel"><img src="../../assets/img/del01.png" /></span>
        <!-- 导入 -->
        <span><img src="../../assets/img/import01.png" /></span>
        <!-- 导出 -->
        <span><img src="../../assets/img/export01.png" /></span>
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
                           label="公司"
                           align="center">
          </el-table-column>
          <el-table-column prop="username"
                           label="姓名"
                           align="center">
          </el-table-column>
          <el-table-column prop="sex"
                           label="性别"
                           align="center">
          </el-table-column>
          <el-table-column prop="birthday"
                           label="生日"
                           align="center">
          </el-table-column>
          <el-table-column prop=""
                           label="操作"
                           align="center">
            <template slot-scope="scope">
              <!-- 编辑按钮 (共用了添加用户data)-->
              <i style="padding: 0 0.1rem;"
                 @click="isEdit(scope)"><img src="../../assets/img/a_edit01.png"></i>
              <el-dialog title="修改人员信息"
                         :visible.sync="edituser.dialogVisible"
                         width="28%">
                <div class="titleMessage">1.基本信息</div>
                <div class="basicMessage">
                  <div><b>id:</b>
                    <em>
                      <el-input placeholder="请输入id"
                                v-model="adduser.id"
                                :disabled="true"></el-input>
                    </em>
                  </div>
                  <div><b>用户名:</b>
                    <em>
                      <el-input placeholder="请输入用户名"
                                v-model="adduser.username"></el-input>
                    </em>
                  </div>
                  <!-- <div><b>密码:</b>
                    <em>
                      <el-input placeholder="请输入密码"
                                type="password"
                                v-model="adduser.password"></el-input>
                    </em>
                  </div> -->
                  <div><b>性别:</b>
                    <em>
                      <el-select v-model="adduser.sex"
                                 slot="prepend"
                                 placeholder="请输入性别"
                                 style="left:-0.75rem">
                        <el-option label="女"
                                   value="女">
                        </el-option>
                        <el-option label="男"
                                   value="男">
                        </el-option>
                      </el-select>
                    </em>
                  </div>
                  <!-- <div><b>出生日期:</b>
                    <em>
                      <el-date-picker type="date"
                                      placeholder="选择日期"
                                      v-model="adduser.AbirthData"
                                      style="width: 100%;"></el-date-picker>
                    </em>
                  </div> -->
                </div>
                <span slot="footer"
                      class="dialog-footer">
                  <el-button @click="adduser.dialogVisible = false">取 消</el-button>
                  <el-button type="primary"
                             @click="isEdituser">确 定</el-button>
                </span>

              </el-dialog>
              <i style="padding: 0 0.1rem;"
                 @click="isImage(scope)"><img src="../../assets/img/a_image01.png"></i>
              <i style="padding: 0 0.1rem;"
                 @click="isInfo(scope)"><img src="../../assets/img/a_info01.png"></i>
              <i style="padding: 0 0.1rem;"
                 @click="isDel(scope)"><img src="../../assets/img/a_del01.png"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页 -->
      <el-row>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       :page-size="100"
                       layout="prev, pager, next, jumper"
                       :total="1000">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Cascader from 'element-ui'
// import url from '@/http/http'
export default {
  data () {
    return {
      // 列表信息
      listdata: [],
      // 公司信息列表
      companyList: [],
      // 筛选功能表单数据
      seekCompany: '',
      seekName: '',
      //添加人员和编辑用户
      adduser:
        {
          // 弹框
          dialogVisible: false,
          // 弹出日历
          isbirthData: false,
          AbirthData: '',
          username: "",
          companyData: '',
          sex: '',
          password: '',
          id: '',
          isSex: ''
        },
      // 修改人员信息
      edituser: {
        dialogVisible: false,
      },
      isToken: "",
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      UploadUrl: "http://localhost:8080/",
      delId: [],
      currentPage: 4
    }
  },
  created () {
    this.isToken = JSON.parse(sessionStorage.getItem("token"))
    this.getUserList()
    // 返回 web 主机的域名，如：http://127.0.0.1:8080/testdemo/test.html?id=1&name=test
    var url = window.location.href;
    // 返回当前页面的路径和文件名，如：/testdemo/test.html
    var pathname = window.location.pathname;
    // 返回 web 主机的端口，如：8080
    var port = window.location.port;
    // 返回所使用的 web 协议，如：http:
    var protocol = window.location.protocol;
    // 获取参数，如：?id=1&name=test
    var search = window.location.search;
    // 获取指定参数值
    console.log(url)


  },
  methods: {
    // 获取人员信息
    getUserList () {
      this.$http.get('/api' + "/user/find/list", {
        headers: {
          'Content-Type': 'application/json',
          'token': this.isToken
        }
      }).then(res => {
        this.listdata = res.data.data.list
      }).catch(err => {
        console.log("获取人员信息失败")
      })
    },
    // 添加按钮
    isAdduser () {
      this.adduser.dialogVisible = true
      // 获取公司信息
      this.$http.get('/api' + "/company/find/list", {
        headers: {
          'Content-Type': 'application/json',
          'token': this.isToken
        }
      }).then(res => {
        this.companyList = res.data.data.list
      }).catch(err => {
        console.log("获取公司信息失败")
      })
    },
    // 弹日历
    birthData () {
      this.adduser.isbirthData = true
    },
    // 上传图片
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 提交用户信息，暂时还没有图片
    isconfirm () {
      console.log(typeof (this.adduser.AbirthData))
      console.log(this.adduser.AbirthData)
      return false
      console.log("确认按钮")
      this.$http.post('/api' + "/user/save", {
        "company_id": this.adduser.companyData,
        "password": this.adduser.password,
        "sex": this.adduser.sex,
        "birthday": this.adduser.AbirthData,
        "username": this.adduser.username
      }, {
          headers: {
            'Content-Type': 'application/json',
            'token': this.isToken
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
        })
      this.adduser.dialogVisible = false
    },
    // 编辑修改用户
    isEdit (scope) {
      this.edituser.dialogVisible = true
      console.log(scope)
      this.adduser.id = scope.row.user_id
      this.adduser.username = scope.row.username
      this.adduser.sex = scope.row.sex
      this.adduser.AbirthData = scope.row.birthday
    },
    // 确定编辑按钮
    isEdituser () {
      this.$http.post('/api' + "/user/update", {
        "user_id": this.adduser.id,
        "username": this.adduser.username,
        "sex": this.adduser.sex
      }, {
          headers: {
            'Content-Type': 'application/json',
            'token': this.isToken
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log("获取公司信息失败")
        })
      this.edituser.dialogVisible = false
      this.getUserList()
    },
    // 查看图像
    isImage () {

    },
    // 预览详细信息接口
    isInfo () {

    },
    // 批量删除前面的复选框
    handleSelectionChange (val) {
      val.forEach((ele, indx) => {
        this.delId.push(ele.user_id)
      });
    },
    // 删除人员按钮
    async isDel (scope) {
      if (scope.row) {
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
      if (scope.row) {
        this.delId.push(scope.row.user_id)
      }
      this.$http.post('/api' + "/user/del", this.delId, {
        headers: {
          'Content-Type': 'application/json',
          'token': this.isToken
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log("删除人员信息失败")
      })
      this.getUserList()
    },
    // 
    // 筛选按钮
    seekMesssage () {
      console.log(this.seekCompany, this.seekName)
      if (this.seekCompany && this.seekName) {
        this.$http.get('/api' + "/user/find/list?" + "company_name=" + this.seekCompany + "&username=" + this.seekName,
          {
            headers: {
              'Content-Type': 'application/json',
              'token': this.isToken
            }
          }).then(res => {
            this.listdata = res.data.data.list
            // return false
          }).catch(err => {
            console.log("获取人员信息失败")
          })
      } else if (this.seekCompany) {
        this.$http.get('/api' + "/user/find/list?" + "company_name=" + this.seekCompany,
          {
            headers: {
              'Content-Type': 'application/json',
              'token': this.isToken
            }
          }).then(res => {
            this.listdata = res.data.data.list
          }).catch(err => {
            console.log("获取人员信息失败")
          })

      } else if (this.seekName) {
        this.$http.get('/api' + "/user/find/list?" + "&username=" + this.seekName,
          {
            headers: {
              'Content-Type': 'application/json',
              'token': this.isToken
            }
          }).then(res => {
            this.listdata = res.data.data.list
          }).catch(err => {
            console.log("获取人员信息失败")
          })
      } else {
        return false
      }

    },

    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(file.url)
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    }
  },
}
</script>
<style lang="less">
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

