<template>
    <div class="container_index">
        <!-- 头部数据展示 -->
        <el-row class="container_row" :gutter="15">
            <el-col :span="8">
                <el-card class="card_top">
                    <div class="rflex cflex">
                        <el-col class="userBkColor" :span="12">列表显示</el-col>
                        <el-col class="userInfoBkColor" :span="12">列表显示</el-col>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="card_top">
                    <div class="rflex cflex">
                        <el-col class="moneyBkColor" :span="11">列表显示</el-col>
                        <el-col class="moneyInfoBkColor" :span="11">列表显示</el-col>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="card_top">
                    <div class="rflex cflex">
                        <el-col class="surplusBkColor" :span="11">列表显示</el-col>
                        <el-col class="surplusInfoBkColor" :span="11">列表显示</el-col>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 项目日志 -->
        <div class="data_list container_row">
            <el-row :gutter="20">
                <el-col class="log_pro" :span="8">
                    <el-card class="log_list">
                        <!-- 日志列表 -->
                        <div>
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>项目更新日志：</span>
                                </div>
                                <div class="el-scrollbar">
                                    <div
                                        v-for="(item, index) in DevelopmentLog"
                                        :key="index"
                                        class="text log_body"
                                    >
                                        <div class="log_item">
                                            日期：
                                            <span class="log_time">{{item.date}}</span>
                                        </div>
                                        <div class="log_body">更新内容：</div>
                                        <div v-for="(items, i) in item.content" :key="i">
                                            <div style="text-indent:2em">
                                                <span></span>
                                                {{items.text}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="16">
                    <el-card>
                        <userEcharts></userEcharts>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <!-- 用户分类 -->
        <div class="user_money">
            <el-row :gutter="20">
                <el-col :span="12">
                    <userHobby />
                </el-col>
                <el-col :span="12">
                    <userList />
                </el-col>
            </el-row>
        </div>
        <!-- 用户状态 -->
        <div class="user_status"></div>
    </div>
</template>

<script>
import userEcharts from 'cpt/echarts/userEcharts'
import DevelopmentLog from './datas/deveLog.js'
import userHobby from './components/userHobby'
import userList from './components/userList'
export default {
    components: {
        userEcharts,
        userHobby,
        userList
    },
    data () {
        return {
            DevelopmentLog: DevelopmentLog
        }
    }
}
</script>

<style lang="less" scoped>
.container_index {
    padding: 10px;
    .container_row {
        margin-bottom: 20px;
    }
    .card_top {
        box-sizing: border-box;
        height: 90px;
        .rflex {
            height: 100%;
            .el-col {
                width: 49%;
            }
        }
    }
    .data_list.container_row {
        .log_pro {
            .log_list {
                height: 100%;
            }
        }
    }
}
.userBkColor {
    background: #ffa3a1;
}
.userInfoBkColor {
    background: #84d9d2;
}
.moneyBkColor {
    background-color: #87de75;
}
.moneyInfoBkColor {
    background-color: #a5e7f0;
}
.surplusBkColor {
    background-color: #93b7e3;
}
.surplusInfoBkColor {
    background-color: #edafda;
}

// 更新日志
.log_container {
    overflow-y: auto;
}
.data_list {
    .log_body {
        font-size: 14.5px;
        padding: 10px 5px 10px 5px;
    }
    .log_body.text {
        border-bottom: 1px solid #ebeef5;
    }
    .log_time {
        color: #87de75;
    }
    .el-scrollbar {
        height: 269px;
        overflow: auto;
    }
}
</style>
