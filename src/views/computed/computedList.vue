<template>
    <div>
        <el-card>
            <div id="socketEcharts" style="width: 1000px;height:350px;"></div>
        </el-card>
    </div>
</template>

<script>
import echarts from 'echarts'
import echartsThemes from 'cpt/echarts/theme/westeros.json'
import { socketsEcharts } from '@/api/echarts'
var dom, timer
export default {
    data() {
        return {
            options: {
                title: {
                    text: '折线图堆叠'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [
                        '邮件营销',
                        '联盟广告',
                        '视频广告',
                        '直接访问',
                        '搜索引擎'
                    ]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [
                        '周一',
                        '周二',
                        '周三',
                        '周四',
                        '周五',
                        '周六',
                        '周日'
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        data: [120, 1574, 1546, 2654, 1584, 2458, 1485]
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        data: [220, 1548, 1487, 2164, 2184, 1487, 1345]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        data: [1501, 2484, 1548, 1698, 1948, 2468, 2954]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        data: [320, 1548, 3214, 1348, 1754, 2154, 2481]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        data: [1820, 1548, 847, 1648, 2547, 2684, 2145]
                    }
                ]
            }
        }
    },
    mounted() {
        this.initEcharts()
    },
    methods: {
        initEcharts() {
            echarts.registerTheme('wonderland', echartsThemes)
            dom = echarts.init(
                document.getElementById('socketEcharts'),
                'wonderland'
            )
            dom.setOption(this.options)

            this.socketData()
        },
        socketData() {
            timer = setInterval(() => {
                socketsEcharts({}).then(res => {
                    this.updateData(res.userList)
                })
            }, 2000)
        },
        updateData(res) {
            this.options.series.filter((item, index) => {
                res.filter((u, ci) => {
                    if (u.name === item.name) {
                        if (item.data.length < 7) {
                            item.data.push(u.price)
                        } else {
                            item.data = item.data.slice(1)
                            item.data.push(u.price)
                        }
                    }
                })
                console.log(item.data)
            })
            dom.setOption(this.options)
        },
        cleanParams(datas) {
            var v_data = {}
            for (var a in datas) {
                if (datas[a] != null && datas[a] instanceof Array) {
                    v_data[a] = []
                } else {
                    v_data[a] = null
                }
            }
            return v_data
        }
    },
    beforeDestroy() {
        this.cleanParams(this.options)
        clearInterval(timer)
    }
}
</script>

<style>
</style>