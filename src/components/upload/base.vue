/*
 * @Author: nihc
 * @Date: 2021-01-19 14:19:05
 * @Last Modified by:   nihc
 * @Last Modified time: 2021-01-19 14:19:05
 */

<template>
  <a-upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :default-file-list="defaultFileList"
  >
    <a-button> <a-icon type="upload" /> Upload </a-button>
  </a-upload>
</template>
<script>
export default {
    data() {
        return {
            defaultFileList: [
                {
                    uid: '1',
                    name: 'xxx.png',
                    status: 'done',
                    response: 'Server Error 500', // custom error message to show
                    url: 'http://www.baidu.com/xxx.png'
                },
                {
                    uid: '2',
                    name: 'yyy.png',
                    status: 'done',
                    url: 'http://www.baidu.com/yyy.png'
                },
                {
                    uid: '3',
                    name: 'zzz.png',
                    status: 'error',
                    response: 'Server Error 500', // custom error message to show
                    url: 'http://www.baidu.com/zzz.png'
                }
            ]
        };
    },
    methods: {
        handleChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        }
    }
};
</script>
