<template>
    <div class="login_img">
        <div class="login_Form">
            <div class="login_title">用户登录</div>
            <el-form
                :model="userInfo"
                :rules="loginRules"
                ref="loginRef"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="userInfo.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userInfo.password"></el-input>
                </el-form-item>
                <el-button class="submitLogin" type="primary" @click="submitForm('loginRef')">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import { setToken } from '@/utils/auth'
import { login } from '@/api/user'
export default {
    data() {
        return {
            userInfo: {
                userName: 'admin',
                password: '12345'
            },
            loginRules: {
                userName: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let userInfo = this.userInfo
                    login(userInfo)
                        .then(res => {
                            setToken('token', res.userList.token)
                            this.$router.push('/')
                        })
                        .catch(err => {
                            this.$Message.error(err.msg)
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_title {
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
}
.login_Form {
    width: 400px;
    height: 350px;
    background-color: #fff;
    position: absolute;
    box-sizing: border-box;
    padding: 20px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .el-form-item {
        width: 90%;
    }
    .el-button {
        color: #fff !important;
        width: 80%;
        background: #ff7c1a;
        border: none;
    }
}
.login_img {
    background: url('../assets/img/timg.jpg');
    width: 100%;
    background-size: 100% 100%;
    height: 100%;
}
</style>
