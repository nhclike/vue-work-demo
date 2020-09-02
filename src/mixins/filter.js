const vfilter = {
    moduleName: function(type) {
        return {
            '1': '首页'
        }[type] || '';
    },
    homeModule: function(type) {
        return {
            'solution': '解决方案',
            'productCase': '应用案例',
            'news': '动态新闻',
            'supports': '服务与支持',
            'aboutUs': '关于我们',
            'cooperativeEnterprise': '生态合作'
        }[type] || '';
    },
    filterDemandCategory: function(type) {
        return {
            '1': '销售咨询',
            '2': '咨询留言',
            '3': '合作咨询',
            '4': '客服电话',
            '5': '其他咨询'
        }[type] || '';
    },
    formatEmpty: function(type) {
        return type ? type : '暂无';
    }
};
export default vfilter;
