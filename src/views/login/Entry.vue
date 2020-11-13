/* 登录 */
<template>
    <div class="entry">
        <div class="header clearfix">
            <p>
                <!-- <img src="@/assets/login-logo.png" />南北联合后台系统 -->
            </p>
        </div>

        <div class="main clearfix">
            <!-- <div class="left"></div> -->

            <div class="login-box">
                <!-- <div class="logo">
                    <span></span>
                </div>-->

                <div class="form">
                    <div class="title">欢迎登录后台系统</div>

                    <el-form
                        :model="ruleForm"
                        ref="ruleForm"
                        :rules="rules"
                        class="ruleForm"
                        label-position="top"
                    >
                        <el-form-item label prop="username">
                            <el-input
                                v-model="ruleForm.username"
                                placeholder="请输入手机号"
                                clearable
                                @keyup.enter.native="submit"
                            >
                                <i class="el-input__icon i-user" slot="prefix"></i>
                            </el-input>
                        </el-form-item>

                        <el-form-item label prop="password" :error="error">
                            <el-input
                                v-model="ruleForm.password"
                                placeholder="请输入密码"
                                :type="setType"
                                @keyup.enter.native="submit"
                            >
                                <i class="el-input__icon i-lock" slot="prefix"></i>
                            </el-input>
                        </el-form-item>

                        <!-- <el-form-item label>
                            <el-checkbox v-model="rememberPwd">记住密码</el-checkbox>
                        </el-form-item>-->
                    </el-form>

                    <div class="buttons">
                        <span @click="submit" :class="{disabled}">登录</span>

                        <span @click="register()">注册</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <h1 class="copyright">南北联合信息科技有限公司</h1>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import menuList from '@/assets/data/menuList';
// import {encrypt, decrypt} from '@/utils/crypt';
export default {
    components: {},
    inject: ['reload'],
    props: {},
    data() {
        return {
            userToken: null,
            rememberPwd: true, // 记住密码
            isShow: false, // 密码可见
            ruleForm: {
                username: '',
                password: ''
            }, // 表单
            rules: {
                // 表单验证
                username: [
                    {
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'change'
                    }
                    // { min: 11, max: 11, message: '长度为11位', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                    // {
                    //     min: 1,
                    //     max: 30,
                    //     message: '长度在 1 到 30 个字符',
                    //     trigger: 'change'
                    // }
                ]
            },
            error: ''
        };
    },
    computed: {
        ...mapState(['userInfo']),
        ...mapGetters(['userInfoGet']),

        // 输入框类型切换
        setType() {
            return this.isShow ? 'text' : 'password';
        },

        // 登录按钮是否可点击
        disabled() {
            return !(
                this.ruleForm.username &&
                this.ruleForm.username.length > 0 &&
                this.ruleForm.password &&
                this.ruleForm.password.length > 0 &&
                this.ruleForm.password.length < 31
            );
        }
    },
    watch: {
        // 监听-表单
        ruleForm: {
            handler() {
                this.error = '';
            },
            deep: true
        }
    },
    // created() {
    // },
    mounted() {
        this.init();
    },
    methods: {
        // 接口引入
        ...mapActions(['moduleLogin/eggLogin']),
        ...mapMutations(['isLoginMut', 'userInfoMut']),

        // 初始化
        init() {
            if (this.userInfo) {
                this.ruleForm.username = this.userInfo.username;
                this.ruleForm.password = this.userInfo.password;
            }
        },

        // 按钮点击-登录
        submit() {
            if (this.disabled) {
                return;
            }
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    let params = {
                        user_name: this.ruleForm.username,
                        user_password: this.ruleForm.password
                    };

                    // 请求接口 - 登录;
                    // this.postLoginVerify(params);
                    this.doLogin(params);
                }
            });
        },

        // 接口-登录
        postLoginVerify(params) {
            this.eggLogin(params).then(res => {
                console.log('eggLogin', res);
                if (res.code === 1) {
                    this.doLogin(params, res);
                } else {
                    this.error = '账号或密码错误，请重新输入';
                }
            });
        },

        doLogin(params, res) {
            let userInfo = {
                name: params.name,
                username: params.user_name,
                password: params.user_password,
                iconUrl: '',
                menuList: menuList
            };

            if (res && res.data && res.data.user_token) {
                userInfo.userToken = res.data.user_token;
            }
            this.isLoginMut(true);
            this.userInfoMut(userInfo);
            console.log('afterLogin', this.userInfo);
            console.log('userInfoGet', this.userInfoGet);

            if (this.$route.fullPath === '/login/entry') {
                this.$router.push('/home');
            } else {
                this.reload();
            }
        },

        // 按钮点击-组织申请
        register() {
            this.$router.push('/main');
        }
    }
};
</script>

<style scoped lang='less'>
.entry {
    width: 100%;
    height: 100%;
    // background: url('../../assets/login_bg.png') no-repeat top center;
    // background-size: 100% 100%;

    .header {
        padding: 40px 0 0 40px;
        line-height: 80px;
        color: #ffffff;

        img {
            position: absolute;
            left: 0;
            height: 80px;
            width: 88px;
        }
        p {
            left: 0;
            padding-left: 88px;
            position: relative;
            font-size: 60px;
        }
    }

    .main {
        .left {
            position: fixed;
            top: 50%;
            margin-top: -320px;
            width: 896px;
            height: 778px;
            left: 130px;
            background-size: 100% 100%;
        }

        .login-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            top: 50%;
            width: 630px;
            background: #ffffff;
            text-align: center;

            .logo {
                position: absolute;
                top: -80px;
                left: 235px;
                height: 160px;
                width: 160px;
                border-radius: @border_radius_large;
                background-color: #ffffff;

                span {
                    height: 160px;
                    width: 160px;
                    display: block;
                    background: url('../../assets/images/login/login_icon_logo.png')
                        no-repeat center center;
                    background-size: 88px 80px;
                }
            }

            .form {
                padding: 80px 60px 90px 60px;
                font-size: 38px;
                width: 630px;
                height: 630px;

                .title {
                    line-height: 60px;
                    margin-bottom: 40px;
                }

                /deep/.el-form {
                    .el-form-item {
                        height: 75px;
                        line-height: 75px;
                        margin-bottom: 35px;
                        text-align: left;

                        .el-form-item__content {
                            font-size: @font20px;
                            height: 75px;
                            line-height: 75px;

                            .el-input {
                                font-size: @font20px;

                                .el-input__inner {
                                    padding-left: 70px;
                                    height: 75px;
                                    line-height: 75px;
                                }

                                .el-input__prefix {
                                    left: 20px;

                                    .el-input__icon {
                                        font-size: 32px;
                                        height: 75px;
                                        line-height: 75px;
                                    }

                                    .i-user {
                                        background: url('../../assets/images/icon/icon_username.png')
                                            no-repeat center center;
                                        background-size: 100% 100%;
                                        width: 42px;
                                        height: 42px;
                                        display: inline-block;
                                        vertical-align: middle;
                                    }

                                    .i-lock {
                                        background: url('../../assets/images/icon/icon_password.png')
                                            no-repeat center center;
                                        background-size: 100% 100%;
                                        width: 42px;
                                        height: 42px;
                                        display: inline-block;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .el-checkbox {
                                color: #858585;
                                margin-right: 140px;

                                .el-checkbox__label {
                                    font-size: @font20px;
                                }

                                .el-checkbox__input {
                                    .el-checkbox__inner {
                                        width: 30px;
                                        height: 30px;
                                        // background: #fff;
                                    }

                                    .el-checkbox__inner::after {
                                        height: 18px;
                                        width: 8px;
                                        left: 10px;
                                    }
                                }
                            }
                        }
                    }
                }

                .buttons {
                    text-align: center;
                    width: 100%;
                    margin: 0 auto;

                    span {
                        cursor: pointer;
                        display: inline-block;
                        width: 150px;
                        height: 70px;
                        line-height: 70px;
                        border-radius: @border_radius_middle;
                        background: #159cfe;
                        color: #ffffff;
                        font-size: @font24px;
                        font-weight: 300;

                        &:not(:last-child) {
                            margin-right: 28px;
                        }

                        &.disabled {
                            opacity: 0.5;
                        }
                    }
                }
            }
        }
    }

    .footer {
        .copyright {
            width: 100%;
            position: fixed;
            bottom: 20px;
            color: #ffffff;
            height: 30px;
            line-height: 30px;
            font-size: @font24px;
            font-weight: 300;
            text-align: center;
        }
    }
}
</style>
