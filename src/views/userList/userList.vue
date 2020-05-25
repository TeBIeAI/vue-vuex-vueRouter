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
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-table :data="tableData" style="width: 100%" stripe>
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
                <el-table-column label="PRICE" prop="price"></el-table-column>
                <el-table-column label="DATE" prop="date"></el-table-column>
                <el-table-column label="操作" prop>
                    <template slot-scope="scope">
                        <el-button @click="editUser(scope)" type="success" size="mini">编辑</el-button>
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
    </div>
</template>

<script>
import { getUserList, removeUserByID } from '@/api/user'
export default {
    data () {
        return {
            tableData: [
                {
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                },
                {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                },
                {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                },
                {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }
            ],
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
            })
        },
        handleSizeChange (limit) {
            this.pageInfo.limit = limit;
            this.getUserData()
        },
        handleCurrentChange (page) {
            this.pageInfo.page = page;
            this.getUserData()
        },
        editUser (row) {
            console.log(row);
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
