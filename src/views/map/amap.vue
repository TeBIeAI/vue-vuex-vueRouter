<template>
    <el-card class="amap_card">
        <div id="container" class="amap"></div>
    </el-card>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
var map, _self, AMaps, marker

export default {
    data() {
        return {
            currentPos: []
        }
    },
    computed: {
        currentPosition() {
            return this.currentPos
        }
    },
    mounted() {
        _self = this
        this.initAmpMap()
    },
    methods: {
        initAmpMap() {
            AMapLoader.load({
                key: '2403b3c230fcc513f0e34f78f922dec9', // 申请好的Web端开发者Key，首次调用 load 时必填
                version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.PlaceSearch'] //插件列表
            })
                .then(AMap => {
                    AMaps = AMap
                    map = new AMap.Map('container', {
                        zoom: 11 //级别
                    })
                    this.getCurrentPos()
                })
                .catch(e => {
                    console.log(e)
                })
        },
        getCurrentPos() {
            AMap.plugin('AMap.Geolocation', function() {
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: false,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    //  定位按钮的排放位置,  RB表示右下
                    buttonPosition: 'RB'
                })

                geolocation.getCurrentPosition(function(status, result) {
                    if (status == 'complete') {
                        onComplete(result)
                    } else {
                        onError(result)
                    }
                })

                function onComplete(data) {
                    // data是具体的定位信息
                    let arr = [data.position.lng, data.position.lat]
                    _self.currentPos = arr
                    console.log('___________成功', _self.currentPos)
                    _self.initPiont()
                }

                function onError(data) {
                    // 定位出错
                    console.log('___________失败', this.currentPos)
                    // console.log(data)
                }
            })
        },
        initPiont() {
            marker = new AMaps.Marker({
                position: _self.currentPos // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            })
            map.add(marker)

            AMaps.service('AMap.PlaceSearch', function() {
                //回调函数
                //实例化PlaceSearch
                placeSearch = new AMaps.PlaceSearch({
                    pageSize: 5, //每页显示多少行
                    pageIndex: 1, //显示的下标从那个开始
                    type: '餐饮服务', //类别，可以以|后面加其他类
                    city: '010', //城市
                    map: map, //显示地图
                    panel: 'result' //服务显示的面板
                })
                //TODO: 使用placeSearch对象调用关键字搜索的功能
                placeSearch.search('公园', function(status, result) {
                    console.log(result)
                })
            })
        }
    }
}
</script>

<style scoped>
.amap_card {
    width: 100%;
    height: 700px;
}
.amap {
    width: 100%;
    height: 100%;
}
</style>
