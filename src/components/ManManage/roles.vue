<template>
  <div>
    <el-card style="margin-top: 0.15rem;">
      <el-row justify="space-between"
              type="flex"
              :gutter="20"
              class="oneRow">
        <el-col :span="12">
          <span> 角色名: <input placeholder="请输入角色名"
                   v-model="seekrolesName" /></span>
          <span> 角色标签：<input placeholder="请输入标签"
                   v-model="seekRolesTitle" /></span>
          <!-- 筛选按钮 -->
          <span @click="seekMesssage"><img src="../../assets/img/seek02.png" /></span>
          <!-- <span><img src="../../assets/img/seek02.png" /></span> -->
        </el-col>
        <el-col :span="2"
                v-if="listdata.length">角色总数: 123</el-col>
      </el-row>
      <el-row class="twoRow">
        <!-- 添加按钮 -->
        <span @click="isAddRoles"><img src="../../assets/img/add202.png" /></span>
        <el-dialog title="添加角色"
                   :visible.sync="addRoles.dialogVisible"
                   width="30%">
          <div class="basicMessage">
            <div><b>角色名:</b>
              <em>
                <el-input placeholder="请输入角色名"
                          v-model="addRoles.rolesName"></el-input>
              </em>
            </div>
            <div><b>角色标题:</b>
              <em>
                <el-input placeholder="请输入角色标题"
                          v-model="addRoles.rolesTitle"></el-input>
              </em>
            </div>
            <div><b>备注:</b>
              <em>
                <el-input placeholder="请输入备注"
                          v-model="addRoles.rolesRemark"></el-input>
              </em>
            </div>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="addRoles.dialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="isconfirm">保存</el-button>
          </span>
        </el-dialog>
        <!-- 删除 -->
        <span @click="isDelRoles"><img src="../../assets/img/del201.png" /></span>
        <!-- 分配权限 -->
        <span @click="permissionRoles"><img src="../../assets/img/permission02.png" /></span>
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
          <el-table-column prop=""
                           label="角色名"
                           align="center">
          </el-table-column>
          <el-table-column prop=""
                           label="角色标题"
                           align="center">
          </el-table-column>
          <el-table-column prop=""
                           label="备注"
                           align="center">
          </el-table-column>
          <el-table-column prop=""
                           label="操作"
                           align="center">
            <template slot-scope="scope">
              <!-- 分配角色 -->
              <i style="padding: 0 0.08rem;"
                 @click="isPermission(scope)"><img src="../../assets/img/a_permission01.png"></i>
              <!-- 编辑角色 -->
              <i style="padding: 0 0.08rem;"
                 @click="isEdit(scope)"><img src="../../assets/img/a_edit01.png"></i>
              <!-- 删除角色 -->
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
      // 登录时的token
      isToken: '',
      // 筛选按钮数据
      seekrolesName: '',
      seekRolesTitle: '',
      // 添加角色数据
      addRoles: {
        dialogVisible: false,
        rolesName: '',
        rolesTitle: '',
        rolesRemark: ''
      },
      // 表格数据
      listdata: [],
    }
  },
  created () {
    this.isToken = JSON.parse(sessionStorage.getItem("token"))
    this.getRolesList()
  },
  methods: {
    // 获取角色信息
    getRolesList () {
      this.$http.get('/api' + "/user/find/role", {
        headers: {
          'Content-Type': 'application/json',
          'token': this.isToken
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log("获取人员信息失败")
      })
    },
    // 筛选按钮
    seekMesssage () {

    },
    // 添加按钮 
    isAddRoles () {
      this.addRoles.dialogVisible = true
    },
    // 确认保存添加
    isconfirm () {

    },
    // 删除角色
    isDelRoles () {

    },
    // 分配权限
    permissionRoles () {

    },
    //操作下面的分配角色
    isPermission () {

    },
    // 编辑角色
    isEdit () {

    },
    // 删除角色
    isDel () {

    },
    // 表格最前面的复选框
    handleSelectionChange () {
    }
  },

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
