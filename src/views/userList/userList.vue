<template>
    <div class="user_table_list">
        <el-card class="search_name">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="pageInfo.name"
                    ></el-input>
                </el-col>
                <el-col :span="7">
                    <el-button type="success" @click="getUserData">搜索</el-button>
                    <el-button type="success" @click="addUser">添加用户</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="tableData"
                style="width: 100%"
                stripe
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="所属店铺">
                                <span>{{ props.row.shop }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.shopId }}</span>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="USERNAME" prop="username"></el-table-column>
                <el-table-column label="PRICE" prop="price">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.price > 1000 ? 'success' : 'danger'"
                        >{{scope.row.price}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="DATE" prop="date"></el-table-column>
                <el-table-column label="操作" prop>
                    <template slot-scope="scope">
                        <el-button @click="editUser(scope.row)" type="success" size="mini">编辑</el-button>
                        <el-button @click="removeUser(scope.row)" type="danger" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageInfo.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageTotal"
            ></el-pagination>
        </el-card>

        <!-- 添加用户dialog -->
        <AddUserDialog
            :dialogTitle="dialogsTitle"
            :userDatas="userData"
            :dialogVisible.sync="showAddUserDialog"
            :getUserLists="getUserData"
        ></AddUserDialog>
    </div>
</template>

<script>
import { getUserList, removeUserByID } from '@/api/user'
import AddUserDialog from './components/addUserDialog'
export default {
    components: {
        AddUserDialog
    },
    data () {
        return {
            loading: true,
            showAddUserDialog: false,
            userData: null,
            dialogsTitle: '',
            tableData: [],
            currentPage4: 1,
            pageInfo: {
                limit: 20,
                page: 1,
                name: ''
            },
            pageTotal: 0
        }
    },
    mounted () {
        this.getUserData()
    },
    methods: {
        getUserData () {
            let page = Object.assign({}, this.pageInfo)
            getUserList(page).then(res => {
                console.log(res)
                this.pageTotal = res.data.total
                this.tableData = res.data.userList
                this.loading = false
            })
        },
        handleSizeChange (limit) {
            this.pageInfo.limit = limit
            this.getUserData()
        },
        handleCurrentChange (page) {
            this.pageInfo.page = page
            this.getUserData()
        },
        editUser (row) {
            console.log({ ...row })
            this.dialogsTitle = '编辑'
            this.showAddUserDialog = true
            this.userData = { ...row }
        },
        addUser () {
            this.dialogsTitle = '添加用户'
            this.showAddUserDialog = true
        },
        removeUser (row) {
            removeUserByID({ ...row }).then(res => {
                this.$message.success('删除用户成功')
                this.getUserData()
            })
        }
    }
}
</script>

<style scoped>
.user_table_list {
    padding: 20px 15px;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.search_name {
    margin-bottom: 20px;
    padding: 10px 0;
}
</style>
