<template>
    <el-card class="map_container">
        <el-row :gutter="80">
            <el-col :span="4">
                <el-input v-model="searchName" size="mini" placeholder="请准确输入要搜索位置"></el-input>
            </el-col>
            <el-col :span="7">
                <el-button @click="searchMap('all')" size="mini">全图搜索</el-button>
                <el-button @click="searchMap('InBounds')" size="mini">当前地图搜索</el-button>
            </el-col>
        </el-row>
        <div id="allmap"></div>
    </el-card>
</template>

<script>
import { MP } from '@/utils/loadBMap.js'
import { Message } from 'element-ui'
var BMaps, map
export default {
    data () {
        return {
            searchName: ''
        }
    },
    mounted () {
        this.initMap()
    },
    methods: {
        initMap () {
            MP('zpilhVCb4bC4SWGyW3dOh5K07sqI7fYB').then(BMap => {
                BMaps = BMap
                map = new BMap.Map("allmap");
                var point = new BMap.Point(116.331398, 39.897445);
                map.centerAndZoom(point, 12);

                var opts = { offset: new BMap.Size(150, 500) }
                map.addControl(new BMap.MapTypeControl());
                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));
                map.addControl(new BMap.MapTypeControl());

                this.getCurrentPos(BMap)

            })
        },
        // 获取当前位置
        getCurrentPos (BMap) {
            var geolocation = new BMap.Geolocation();
            // 开启SDK辅助定位
            geolocation.enableSDKLocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var marker = new BMap.Marker(r.point);
                    map.addOverlay(marker);
                    map.panTo(r.point);
                    // alert('您的位置：' + r.address.city + r.point.lng + ',' + r.point.lat);
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    Message.success('已成功定位到您的位置' + r.address.province + '，' + r.address.city)
                }
                else {
                    alert('failed' + this.getStatus());
                }
            });
        },
        searchMap (type) {
            if (type == "all") {
                var local = new BMaps.LocalSearch(map, {
                    renderOptions: { map: map }
                });
                local.search(this.searchName);
            }
            if (type == 'InBounds') {
                var local = new BMaps.LocalSearch(map,
                    { renderOptions: { map: map } });
                local.searchInBounds(this.searchName, map.getBounds());
            }
        }
    }
}
</script>

<style scoped>
.map_container {
    width: 100%;
    height: 700px;
}
#allmap {
    width: 100%;
    height: 700px;
}
</style>