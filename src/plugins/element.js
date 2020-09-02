import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element);

Vue.prototype.$messageError = function(msg) {
    this.$message({
        type: 'error',
        message: msg,
        center: true,
        offset: 90
    });
};

Vue.prototype.$messageInfo = function(msg) {
    this.$message({
        type: 'info',
        message: msg,
        center: true,
        offset: 90
    });
};


Vue.prototype.$messageSuccess = function(msg) {
    this.$message({
        type: 'success',
        message: msg,
        center: true,
        offset: 90
    });
};

Vue.prototype.$messageWarning = function(msg) {
    this.$message({
        type: 'warning',
        message: msg,
        center: true,
        offset: 90
    });
};

