<template>
    <el-dialog
        :title="userDatas ? '编辑' : '添加'"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
        <el-form :model="assgins">
            <el-input v-model="assgins.username"></el-input>
            <el-input v-model="assgins.price"></el-input>
            <el-input v-model="assgins.date"></el-input>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        dialogVisible: false,
        userDatas: Object
    },
    computed: {
        assgins() {
            return Object.assign(this.userInfo, this.userDatas)
        }
    },
    data() {
        return {
            userInfo: {
                username: '1',
                price: 0,
                date: ''
            }
        }
    },
    onLoad() {
        console.log(this.userInfo)

        console.log(this.userInfo)
    },
    methods: {
        handleClose() {
            let obj = {
                username: '',
                price: '',
                date: ''
            }
            this.userInfo = Object.assign(this.userInfo, obj)
            this.userDatas = null
            this.$emit('update:dialogVisible', false)
        }
    }
}
</script>

<style>
</style>