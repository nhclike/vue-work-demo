<template>
  <div>
    <search-tree :treeData="treeData"></search-tree>
    <button @click="addNode">动态增加节点</button>

  </div>
</template>

<script>
import SearchTree from '@/components/tree/searchTree';
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
        'icon': 'meh'
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
        'icon': 'meh'
    },
    'scopedSlots': {'title': 'title'}
}];
export default {
    components: {
        SearchTree
    },
    data() {
        return {
            treeData: []
        };
    },
    mounted() {
        this.treeData = treeData;
    },
    methods: {
        addNode() {
            console.log('动态增加节点');
            let newNode = {
                'title': '新增加的节点' + parseInt(Math.random() * 1000),
                'key': '0-' + parseInt(Math.random() * 1000),
                'scopedSlots': {'title': 'title'}
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
