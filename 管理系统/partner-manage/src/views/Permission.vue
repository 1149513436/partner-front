<template>
  <div>
    <!-- 功能按钮区域 -->
    <div style="margin: 10px 0">
      <el-button type="success" @click="handleAdd">
        <el-icon style="vertical-align: middle">
          <Plus />
        </el-icon> <span style="vertical-align: middle"> 新增 </span>
      </el-button>
      <el-upload class="ml5" :show-file-list="false" style="display: inline-block; position: relative; top: 3px"
        :action='`http://${config.serverUrl}/permission/import`' :on-success="handleImportSuccess"
        :headers="{ Authorization: token }">
        <el-button type="primary">
          <el-icon style="vertical-align: middle">
            <Bottom />
          </el-icon> <span style="vertical-align: middle"> 导入 </span>
        </el-button>
      </el-upload>
      <el-button type="primary" @click="exportData" class="ml5">
        <el-icon style="vertical-align: middle">
          <Top />
        </el-icon> <span style="vertical-align: middle"> 导出 </span>
      </el-button>
      <el-popconfirm title="您确定删除吗？" @confirm="confirmDelBatch">
        <template #reference>
          <el-button type="danger" style="margin-left: 5px">
            <el-icon style="vertical-align: middle">
              <Remove />
            </el-icon> <span style="vertical-align: middle"> 批量删除 </span>
          </el-button>
        </template>
      </el-popconfirm>
    </div>
    <!-- 表格 -->
    <div style="margin: 10px 0">
      <el-table :data="state.tableData" stripe border row-key="id" default-expand-all
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="orders" label="顺序"></el-table-column>
        <el-table-column prop="icon" label="图标">
          <template #default="scope">
            <el-icon>
              <component :is=" scope.row.icon" />
            </el-icon>
           
          </template>
        </el-table-column>
        <el-table-column prop="page" label="页面路径"></el-table-column>
        <el-table-column prop="pid" label="父级id"></el-table-column>
        <el-table-column prop="auth" label="权限"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template #default="scope">
            <el-tag type="warning" v-if="scope.row.type == 1">菜单目录</el-tag>
            <el-tag v-if="scope.row.type == 2">菜单页面</el-tag>
            <el-tag type="success" v-if="scope.row.type == 3">页面权限</el-tag>
            
          </template>
        </el-table-column>
        <el-table-column prop="type" label="是否隐藏" width="100">
          <template #default="scope">
          <el-switch v-model="scope.row.hide" @change="changeHide(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="您确定删除吗？" @confirm="del(scope.row.id)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <div style="margin: 10px 0">
      <el-pagination
          @current-change="currentChange"
          @size-change="sizeChange"
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          background
          :page-sizes="[2, 5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      />
    </div> -->

    <el-dialog v-model="dialogFormVisible" title="信息" width="40%">
      <el-form ref="ruleFormRef" :rules="rules" :model="state.form" label-width="80px" style="padding: 0 20px"
        status-icon>
        <el-form-item prop="type" label="类型">
          <el-radio-group v-model="state.form.type">
            <el-radio :label="1">菜单目录</el-radio>
            <el-radio :label="2">菜单页面</el-radio>
            <el-radio :label="3">页面权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="name" label="名称">
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="path" label="访问路径" v-if="state.form.type === 2">
          <el-input v-model="state.form.path" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="page" label="页面路径" v-if="state.form.type === 2">
          <el-input v-model="state.form.page" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="orders" label="顺序" v-if="state.form.type === 1 || state.form.type === 2">
          <!-- <el-input v-model="state.form.orders" autocomplete="off"  /> -->
          <el-input-number v-model="state.form.orders" :min="1" />
        </el-form-item>
        <el-form-item prop="icon" label="图标">
          <el-select v-model="state.form.icon"  placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in icons"
                :key="item.id"
                :label="item.code"
                :value="item.value"
            >
              <el-icon>
                <component :is="item.value"></component>
              </el-icon>
              <span style="font-size: 14px; margin-left: 5px; top: -3px">{{ item.code }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="pid" label="父级id">

          <el-tree-select style="width: 100%" v-model="state.form.pid" :data="state.tableData"
          @node-click="handleNodeClick" :props="{ label: 'name', value: 'id' }" :render-after-expand="false"
            check-strictly />
        </el-form-item>
        <el-form-item prop="auth" label="权限" v-if="state.form.type === 2 || state.form.type === 3">
          <el-input v-model="state.form.auth" autocomplete="off" />
        </el-form-item>
        

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {
  Search,
  RefreshLeft,
  Plus,
  Bottom,
  Top,
  Remove
} from '@element-plus/icons-vue'
import { reactive, ref } from "vue";
import request from "@/utils/request";
import { ElMessage,ElTag} from "element-plus";
import config from "../../config";
import { useUserStore } from "@/stores/user";

const name = ref('')
const address = ref('')
const pageNum = ref(1)
const pageSize = ref(5)
const total = ref(0)
const options = reactive([])
let icons = reactive([])
const state = reactive({
  tableData: [],
  form: {}
})
const multipleSelection = ref([])
const auth=useUserStore().getAuths() //偏平化按钮权限
// console.log("auth",auth);
// 批量删除
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const confirmDelBatch = () => {
  if (!multipleSelection.value || !multipleSelection.value.length) {
    ElMessage.warning("请选择数据")
    return
  }
  const idArr = multipleSelection.value.map(v => v.id)
  request.post('/permission/del/batch', idArr).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
      load()  // 刷新表格数据
    } else {
      ElMessage.error(res.msg)
    }
  })
}

const load = () => {
  request.get('/permission/tree').then(res => {
    state.tableData = res.data
    // total.value = res.data.total
  })
}
load()  // 调用 load方法拿到后台数据

const reset = () => {
  name.value = ''
  load()
}

const currentChange = (num) => {
  pageNum.value = num
  load()
}
const sizeChange = (size) => {
  pageSize.value = size
  load()
}

const dialogFormVisible = ref(false)

const rules = reactive({

  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ]
})
const ruleFormRef = ref()

// 新增
const handleAdd = () => {
  dialogFormVisible.value = true
  ruleFormRef.value = ''
  state.form = { type: 1, orders: 1 }
}

// 保存
const save = () => {
  ruleFormRef.value.validate(valid => {   // valid就是校验的结果
    if (valid) {
      request.request({
        url: 'permission',
        method: state.form.id ? 'put' : 'post',
        data: state.form
      }).then(res => {
        if (res.code === '200') {
          ElMessage.success('保存成功')
          dialogFormVisible.value = false
          state.form = ''
          load()  // 刷新表格数据
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  })
}

// 编辑
const handleEdit = (raw) => {
  state.form = JSON.parse(JSON.stringify(raw))
  dialogFormVisible.value = true
  ruleFormRef.value = ''

  request.get('/dict/icons').then(res=>{
    icons=res.data
    console.log("icons",icons);
  })
}
//表单树形控件点击
const handleNodeClick=(data)=>{
  if(data.id===state.form.id){
    ElMessage.warning("父节点不能为自身")
    nextTick(()=>{
      state.form.pid=null;
    })
    }
}
//改变是否隐藏
const changeHide=(row)=>{
  request.put('/permission',row).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
      load()  // 刷新表格数据
    } else {
      ElMessage.error(res.msg)
    }
  })
}
// 删除
const del = (id) => {
  request.delete('/permission/' + id).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
      load()  // 刷新表格数据
    } else {
      ElMessage.error(res.msg)
    }
  })
}

// 导出接口
const exportData = () => {
  window.open(`http://${config.serverUrl}/permission/export`)
}

const userStore = useUserStore()
const token = userStore.getBearerToken

const handleImportSuccess = () => {
  // 刷新表格
  load()
  ElMessage.success("导入成功")
}
</script>
