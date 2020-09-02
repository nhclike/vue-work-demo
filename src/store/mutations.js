/* mutation处理总入口 */
export default {
    isLoginMut(state, isLogin) {
        state.isLogin = isLogin;
        localStorage.setItem('state', JSON.stringify(state));

    },
    userInfoMut(state, userInfo) {
        state.userInfo = userInfo;
        localStorage.setItem('state', JSON.stringify(state));
    }
};
