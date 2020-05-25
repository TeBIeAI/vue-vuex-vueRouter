<template>
    <el-card class="table_card el-scrollbar">
        <el-table class :data="tableData" stripe style="width: 100%">
            <el-table-column
                prop="username"
                label="USERNAME"
                class-name="salesUsername"
                width="180"
            >
                <template slot-scope="scope">
                    <img class="userImg" :src="userImg" alt="tuxiang" />
                    {{(scope.row.username).substring(0,12)}}
                </template>
            </el-table-column>
            <el-table-column class-name="salesUserprice" prop="price" label="PRICE" width="180"></el-table-column>
            <el-table-column class-name="salesUserdate" prop="date" label="DATE">
                <template slot-scope="scope">{{scope.row.date}}</template>
            </el-table-column>
            <el-table-column class-name="salesUserstatus" prop="status" label="STATUS"></el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import { getSalesTableList } from '@/api/user'
import userImg from '@/assets/img/avatar-3.png'

export default {
    data() {
        return {
            tableData: [],
            userImg: userImg
        }
    },
    mounted() {
        this.initTable()
    },
    methods: {
        initTable() {
            getSalesTableList({}).then(res => {
                console.log(res)
                this.tableData = res.data.list
            })
        }
    }
}
</script>

<style scope lang="less">
.table_card {
    height: 362px;
    overflow-y: scroll;
}
.userImg {
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;
}
.salesUsername .cell {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
</style>