<template>
  <div>
    <search-tree :treeData="treeData" :isSearch="isSearch"></search-tree>
    <button @click="addNode">动态增加节点</button>
    <icon-tree></icon-tree>
    <define-tree></define-tree>
  </div>
</template>

<script>
import SearchTree from '@/components/tree/searchTree';
import IconTree from '@/components/tree/iconTree';
import defineTree from '@/components/tree/defineTree';
let treeData = [{
    'title': '电子卷宗',
    'key': 'dzjz',
    'slots': {
        'icon': 'smile'
    },
    'scopedSlots': {'title': 'title'},
    'children': [{'title': '庭审图片', 'key': 'tstp', 'scopedSlots': {'title': 'title'}, 'children': [{'title': '0-0-0-0', 'key': '0-0-0-0', 'scopedSlots': {'title': 'title'}}, {'title': '0-0-0-1', 'key': '0-0-0-1', 'scopedSlots': {'title': 'title'}}, {'title': '0-0-0-2', 'key': '0-0-0-2', 'scopedSlots': {'title': 'title'}}]}, {'title': '0-0-1', 'key': '0-0-1', 'scopedSlots': {'title': 'title'}, 'children': [{'title': '0-0-1-0', 'key': '0-0-1-0', 'scopedSlots': {'title': 'title'}}, {'title': '0-0-1-1', 'key': '0-0-1-1', 'scopedSlots': {'title': 'title'}}, {'title': '0-0-1-2', 'key': '0-0-1-2', 'scopedSlots': {'title': 'title'}}]}, {'title': '0-0-2', 'key': '0-0-2', 'scopedSlots': {'title': 'title'}}]
},
{
    'title': '0-1',
    'key': '0-1',
    'slots': {
        'icon': 'smile'
    },
    'scopedSlots': {'title': 'title'},
    'children': [
        {
            'title': '0-1-0',
            'key': '0-1-0',
            'scopedSlots': {'title': 'title'},
            'children': [{'title': '0-1-0-0', 'key': '0-1-0-0', 'scopedSlots': {'title': 'title'}}, {'title': '0-1-0-1', 'key': '0-1-0-1', 'scopedSlots': {'title': 'title'}}, {'title': '0-1-0-2', 'key': '0-1-0-2', 'scopedSlots': {'title': 'title'}}]
        },
        {
            'title': '0-1-1',
            'key': '0-1-1',
            'scopedSlots': {'title': 'title'},
            'children': [{'title': '0-1-1-0', 'key': '0-1-1-0', 'scopedSlots': {'title': 'title'}}, {'title': '0-1-1-1', 'key': '0-1-1-1', 'scopedSlots': {'title': 'title'}}, {'title': '0-1-1-2', 'key': '0-1-1-2', 'scopedSlots': {'title': 'title'}}]
        },
        {
            'title': '0-1-2',
            'key': '0-1-2',
            'scopedSlots': {'title': 'title'}
        }]
}, {
    'title': '0-2',
    'key': '0-2',
    'slots': {
        'icon': 'switcherIcon'
    },
    'scopedSlots': {'title': 'title'}
}];
export default {
    components: {
        SearchTree,
        IconTree,
        defineTree
    },
    data() {
        return {
            treeData: [],
            isSearch: false
        };
    },
    mounted() {
        this.treeData = treeData;
    },
    methods: {
        addNode() {
            console.log('动态增加节点');
            // eslint-disable-next-line radix
            let randomNum = parseInt(Math.random() * 1000);
            let newNode = {
                title: '新增加的节点' + randomNum,
                key: '0-' + randomNum,
                scopedSlots: {'title': 'title'},
                slots: {
                    switcherIcon: 'smile'
                }
            };
            let newTreeData = treeData.push(newNode);
            console.log(newTreeData, treeData);
            this.treeData = treeData;
        }
    }
};
</script>

<style>

</style>
