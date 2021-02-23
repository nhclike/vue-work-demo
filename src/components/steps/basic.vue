/*
 * @Author: nihc
 * @Date: 2021-01-19 16:04:41
 * @Last Modified by: nihc
 * @Last Modified time: 2021-01-19 16:05:30
 */
 <template>
   <div>
     <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
   </div>
 </template>

<script>
export default {
    data() {
        return {
            active: 0
        };
    },

    methods: {
        next() {
            if (this.active++ > 2) { this.active = 0 }
        }
    }
};
</script>

 <style>

 </style>
