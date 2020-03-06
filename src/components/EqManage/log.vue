<template>
  <div>
    <el-card style="margin-top: 0.15rem;">
      <el-row justify="space-between"
              type="flex"
              :gutter="20"
              class="oneRow">
        <el-col :span="12">
          <div> 时间:
            <el-date-picker v-model="seekTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <span> 设备：<input placeholder="请输入姓名"
                   v-model="seekName" /></span>
          <span> 用户名：<input placeholder="请输入姓名"
                   v-model="seekName" /></span>
          <span> 操作类型：<input placeholder="请输入姓名"
                   v-model="seekName" /></span>
          <!-- 查询按钮 -->
          <span @click="seekIPbtn"><img src="../../assets/img/seek02.png" /></span>
          <!-- 导出按钮 -->
          <span>导出按钮</span>
        </el-col>
        <el-col :span="2"
                v-if="listdata">
          <span>日志总数: {{listdata.length}}</span>
        </el-col>
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
          <el-table-column prop="device_ip"
                           label="时间"
                           align="center">
          </el-table-column>
          <el-table-column prop="device_name"
                           label="用户名"
                           align="center">
          </el-table-column>
          <el-table-column prop="serial"
                           label="设备名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="serial"
                           label="照片"
                           align="center">
          </el-table-column>
          <el-table-column prop="device_enabled"
                           label="操作类型"
                           align="center">
            <template slot-scope="scope">
              <i v-if="scope.row.device_enabled==0">
                <img src="../../assets/img/on_off02.png">
              </i>
              <i v-else-if="scope.row.device_enabled==1">
                <img src="../../assets/img/on_off01.png">
              </i>
            </template>
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
                  <div><b>设备ID:</b>
                    <em>
                      <el-input v-model="scope.row.device_id"
                                disabled></el-input>
                    </em>
                  </div>
                  <div><b>设备地址:</b>
                    <em>
                      <el-input placeholder="请输入设备地址"
                                v-model="addDevice.DeviceAddress"></el-input>
                    </em>
                  </div>
                  <div><b>设备IP:</b>
                    <em>
                      <el-input placeholder="请输入设备IP"
                                v-model="addDevice.DeviceIp"></el-input>
                    </em>
                  </div>
                  <div><b>设备端口:</b>
                    <em>
                      <el-input placeholder="请输入设备端口"
                                v-model="addDevice.DevicePort"></el-input>
                    </em>
                  </div>
                  <div><b>设备名称:</b>
                    <em>
                      <el-input placeholder="请输入设备名称"
                                v-model="addDevice.DeviceName"></el-input>
                    </em>
                  </div>
                  <div><b>设备密码:</b>
                    <em>
                      <el-input placeholder="请输入设备密码"
                                v-model="addDevice.DevicePassword"></el-input>
                    </em>
                  </div>
                  <div><b>序列号:</b>
                    <em>
                      <el-input placeholder="请输入设备序列号"
                                v-model="addDevice.DeviceSeria"></el-input>
                    </em>
                  </div>
                  <div><b>公司名称:</b>
                    <em>
                      <el-input placeholder="请输入公司名称"
                                v-model="addDevice.CompanyName"></el-input>
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
      // 按时间筛选数据
      seekTime: '',
      //设备表单数据
      listdata: [],
      // 添加设备数据
      addDevice: {
        dialogVisible: false,
        CompanyName: '',
        DevicePort: '',
        DeviceName: '',
        DevicePassword: '',
        DeviceAddress: '',
        DeviceIp: '',
        DeviceSeria: '',
        DeviceID: '',
        DeviceType: '',
        ProtocolType: ''
      },
      // 筛选ip
      seekIP: '',
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
      this.$http.get('/api' + "/device/find/list", {
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
    // 查询设备按钮
    seekIPbtn () {
      this.$http.get('/api' + "/company/find/list?deviceIp=" + this.seekIP, {
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
    //添加公司按钮
    isAddDevice () {
      this.addDevice.dialogVisible = true
    },
    // 保存按钮
    isconfirm () {
      this.$http.post('/api' + "/device/add ", {
        "device_ip": this.addDevice.DeviceIp,
        "device_port": this.addDevice.DevicePort + 0,
        "device_name": this.addDevice.DeviceName,
        "device_password": this.addDevice.DevicePassword,
        "device_address": this.addDevice.DeviceAddress,
        "serial": this.addDevice.DeviceSeria,
        "company_name": this.addDevice.CompanyName,
        "protocolType": this.addDevice.ProtocolType,
        "deviceType": this.addDevice.DeviceType
      }, {
          headers: {
            'Content-Type': 'application/json',
            'token': this.isToken
          }
        }).then(res => {
          this.addDevice.dialogVisible = false,
            this.getList()
          // 添加完之后表单置空
          this.addDevice.DeviceIp = null,
            this.addDevice.DevicePort = null,
            this.addDevice.DeviceName = null,
            this.addDevice.DevicePassword = null,
            this.addDevice.DeviceAddress = null,
            this.addDevice.DeviceSeria = null,
            this.addDevice.CompanyName = null
        }).catch(err => {
          console.log("添加公司失败")
        })

    },
    // 删除设备按钮
    isDelCompany () {


    },
    // 复选框选择的时候
    handleSelectionChange (val) {
      val.forEach((ele, indx) => {
        this.delId.push(ele.device_id)
      });
    },
    // 编辑设备按钮
    isEdit (scope) {
      this.isEditdialogVisible = true
      console.log(scope.row)
      this.addDevice.DeviceIp = scope.row.device_ip
      this.addDevice.DevicePort = scope.row.device_port
      this.addDevice.DeviceName = scope.row.device_name
      this.addDevice.DevicePassword = scope.row.device_password
      this.addDevice.DeviceSeria = scope.row.serial
      this.addDevice.CompanyName = scope.row.company_name
      this.addDevice.DeviceID = scope.row.device_id
      this.addDevice.DeviceAddress = scope.row.device_address
    },
    // 保存修改按钮
    isEditconfirm () {
      this.$http.post('/api' + "/device/update", {
        "device_id": this.addDevice.DeviceID,
        "device_ip": this.addDevice.DeviceIp,
        "device_port": this.addDevice.DevicePort + 0,
        "device_name": this.addDevice.DeviceName,
        "device_password": this.addDevice.DevicePassword,
        "device_address": this.addDevice.DeviceAddress,
        "serial": this.addDevice.DeviceSeria,
        "company_name": this.addDevice.CompanyName,
        "protocolType": this.addDevice.ProtocolType,
        "deviceType": this.addDevice.DeviceType
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
    // 删除设备按钮
    async isDel (scope) {
      if (scope.row) {
        this.delId.push(scope.row.device_id)
        console.log(this.delId)
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
      this.$http.post('/api' + "/device/del", this.delId, {
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


