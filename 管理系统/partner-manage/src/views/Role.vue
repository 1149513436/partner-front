<script setup>
import {
  Search,
  RefreshLeft,
  Plus,
  Bottom,
  Top,
  Remove
} from '@element-plus/icons-vue'
import {nextTick, reactive, ref} from "vue";
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import config from "../../config";
import {useUserStore} from "@/stores/user";

const name = ref('')
const address = ref('')
const pageNum = ref(1)
const pageSize = ref(5)
const total = ref(0)
const permissionTreeRef = ref()
const state = reactive({
  tableData: [],
  form: {},
  treeData:[],//权限数组
})
const multipleSelection = ref([])

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
  request.post('/role/del/batch', idArr).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
      load()  // 刷新表格数据
    } else {
      ElMessage.error(res.msg)
    }
  })
}

const load = () => {
  request.get('/role/page', {
    params: {
      name: name.value,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    }
  }).then(res => {
    state.tableData = res.data.records
    total.value = res.data.total
  })

  request.get('/permission/tree').then(res=>{
    state.treeData=res.data;
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
  ],
  flag: [
    { required: true, message: '请输入唯一标识', trigger: 'blur' },
  ]
})
const ruleFormRef = ref()

// 新增
const handleAdd = () => {
  dialogFormVisible.value = true
  ruleFormRef.value=''
  state.form = {}
}

// 保存
const save = () => {
  ruleFormRef.value.validate(valid => {   // valid就是校验的结果
    if (valid) {
      //被选中的菜单
      let checkedKeys=permissionTreeRef.value.getCheckedKeys();//tree的一个事件
      console.log(checkedKeys);
      //半选中的菜单,就是没有全选
      let halfCheckedKeys=permissionTreeRef.value.getHalfCheckedKeys();//tree的一个事件
      console.log(halfCheckedKeys);
      checkedKeys.unshift.apply(checkedKeys,halfCheckedKeys);
      state.form.permissionIds=checkedKeys;
      request.request({
        url: 'role',
        method: state.form.id ? 'put' : 'post',
        data: state.form
      }).then(res => {
        if (res.code === '200') {
          ElMessage.success('保存成功')
          dialogFormVisible.value = false
          state.form=''
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
  ruleFormRef.value='';
  console.log(raw.permissionIds);
  if (!raw.permissionIds.length) {  // 设置无任何节点选择的状态
      permissionTreeRef.value.setCheckedKeys([])
    }
    raw.permissionIds.forEach(v => {
      nextTick(()=>{//这里必须使用异步始终，因为第一次点击会报错导致permissionTreeRef.value还没有读到
          permissionTreeRef.value.setChecked(v, true, false)  // 给权限树设置选中的节点
      })
    
    })

/*   raw.permissionIds.forEach(v=>{
  //tree的事件，设置节点是否被选中, 使用此方法必须设置 node-key 属性	(key/data, checked, deep)
  //  接收三个参数: 1. 要选中的节点的 key 或者数据 2. 一个布尔类型参数表明是否选中. 
  //  3. 一个布尔类型参数表明是否递归选中子节点

  permissionTreeRef.value.setChecked(v,true,false)//给权限树设置选中的结点
  }) */
}

// 删除
const del = (id) => {
  request.delete('/role/' + id).then(res => {
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
  window.open(`http://${config.serverUrl}/role/export`)
}

const userStore = useUserStore()
const token = userStore.getBearerToken

const handleImportSuccess = () => {
  // 刷新表格
  load()
  ElMessage.success("导入成功")
}
</script>

<template>
  <div style="width:100%">
    <div>
      <el-input v-model="name" placeholder="请输入名称" class="w300" />
      <el-button type="primary" class="ml5" @click="load">
        <el-icon style="vertical-align: middle">
          <Search />
        </el-icon>  <span style="vertical-align: middle"> 搜索 </span>
      </el-button>
      <el-button type="warning" class="ml5" @click="reset">
        <el-icon style="vertical-align: middle">
          <RefreshLeft />
        </el-icon>  <span style="vertical-align: middle"> 重置 </span>
      </el-button>

    </div>
    <!-- 功能按钮区域 -->
    <div style="margin: 10px 0">
      <el-button type="success" @click="handleAdd">
        <el-icon style="vertical-align: middle">
          <Plus />
        </el-icon>  <span style="vertical-align: middle"> 新增 </span>
      </el-button>
      <el-upload
          class="ml5"
          :show-file-list="false"
          style="display: inline-block; position: relative; top: 3px"
          :action='`http://${config.serverUrl}/role/import`'
          :on-success="handleImportSuccess"
          :headers="{ Authorization: token}"
      >
        <el-button type="primary">
          <el-icon style="vertical-align: middle">
            <Bottom />
          </el-icon>  <span style="vertical-align: middle"> 导入 </span>
        </el-button>
      </el-upload>
      <el-button type="primary" @click="exportData" class="ml5">
        <el-icon style="vertical-align: middle">
          <Top />
        </el-icon>  <span style="vertical-align: middle"> 导出 </span>
      </el-button>
      <el-popconfirm title="您确定删除吗？" @confirm="confirmDelBatch">
        <template #reference>
          <el-button type="danger" style="margin-left: 5px">
            <el-icon style="vertical-align: middle">
              <Remove />
            </el-icon>  <span style="vertical-align: middle"> 批量删除 </span>
          </el-button>
        </template>
      </el-popconfirm>
    </div>
      <!-- 表格 -->
    <div style="margin: 10px 0">
      <el-table :data="state.tableData" stripe border  @selection-change="handleSelectionChange" fit>
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="flag" label="唯一标识"></el-table-column>
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
    <div style="margin: 10px 0">
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
    </div>

    <el-dialog v-model="dialogFormVisible" title="信息" width="40%">
      <el-form ref="ruleFormRef" :rules="rules" :model="state.form" label-width="80px" style="padding: 0 20px" status-icon>
        <el-form-item prop="name" label="名称">
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="flag" label="唯一标识">
          <el-input v-model="state.form.flag" autocomplete="off" />
        </el-form-item>
        <el-form-item  label="权限">
          <div style="width:100%;border-radius:5px;border:1px solid #ccc">
            <el-tree show-checkbox :data="state.treeData" autocomplete="off" 
            node-key="id" default-expand-all ref="permissionTreeRef"
            :props="{label:'name',value:'id'}"/>
          </div>
          
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
