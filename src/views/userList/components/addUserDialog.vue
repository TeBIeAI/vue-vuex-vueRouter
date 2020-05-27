<template>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
        <el-form :model="assgins" ref="editRef">
            <el-input v-model="assgins.username"></el-input>
            <el-input v-model="assgins.price"></el-input>
            <el-input v-model="assgins.date"></el-input>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button @click="submitEdit('editRef')" type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { undateUserInfo, createUser } from '@/api/user'
export default {
    props: {
        dialogVisible: false,
        userDatas: Object,
        dialogTitle: String,
        getUserLists: Function,
        undateUserInfo: undateUserInfo
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
    methods: {
        handleClose() {
            let obj = {
                username: '',
                price: '',
                date: ''
            }
            this.userInfo = Object.assign(this.userInfo, obj)
            this.$emit('update:dialogVisible', false)
        },
        submitEdit(formName) {
            var _self = this
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (_self.dialogTitle === '添加用户') {
                        createUser(_self.assgins).then(res => {
                            _self.handleClose()
                            _self.getUserLists()
                        })
                    } else {
                        undateUserInfo(_self.assgins).then(res => {
                            _self.handleClose()
                            _self.getUserLists()
                        })
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style>
</style>