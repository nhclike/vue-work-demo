# mixins 文件夹

存放一些混入的方法,混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能,通过以下方法来调用

```javascript
import { userInfoMixin } from '@/mixins/userInfoMixin';
import Area from '@/assets/data/location.json';

export default {
    name: 'AddressSelect',
    components: {
        Area
    },
    mixins: [userInfoMixin],
    watch: {
        // 重置
        isReset() {
            // this.selectedLabel = [];
            // this.selectedValue = [];
            this.setPermission(this.userInfoMixin_userInfo.areaCode);
            if (this.selectedDefault.length) {
                this.selectedValue = this.selectedDefault;
            }
            // 父组件用 `:isReset.sync="isReset"` 实现双向绑定
            this.$emit('update:isReset', false);
        },
        // 监听父级传值，进行赋值
        selectedDefault(val) {
            this.selectedValue = val;
        }
    },
    created() {
        this.setPermission(this.userInfoMixin_userInfo.areaCode);
        this.getAddressList();
    }
};
```
