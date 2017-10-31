
<template>
    <div>
        <h1>来拖拽我吧</h1>
        <div style="height: 360px;">
            <ul id="olderList" class="draggable-list">
                <li v-for="(item, index) in olderList" :key="index" class="notwrap todolist-item" :data-index="index">
                    好吃的美食--{{ item.name }}
                </li>
            </ul>
        </div>
        <div style="float:left">
            <h2>默认</h2>
            <li v-for="(item, index) in olderList" :key="index" class="notwrap todolist-item" :data-index="index">
                好吃的美食--{{ item.name }}
            </li>
        </div>
        <div style="float:right">
            <h2>修改后</h2>
            <li v-for="(item, index) in newList" :key="index" class="notwrap todolist-item" :data-index="index">
                                    好吃的美食--{{ item.name }}
                            </li>
        </div>
    </div>
</template>

<script>
import Sortable from 'sortablejs';
export default {
    data() {
        return {
            todoArray: [
                {
                    content: '完成iview-admin基本开发'
                },
                {
                    content: '对iview-admin进行性能优化'
                },
                {
                    content: '对iview-admin的细节进行优化'
                },
                {
                    content: '完成iview-admin开发'
                },
                {
                    content: '解决发现的bug'
                },
                {
                    content: '添加更多组件'
                },
                {
                    content: '封装更多图表'
                },
                {
                    content: '增加更多人性化功能'
                }
            ],
            doArray: [],
            olderList: [
                { name: '香肠' },
                { name: '烤鸭' },
                { name: '烧鸡' },
                { name: '卤煮' },
                { name: '酱汁腊肉' },
                { name: '松花小肚' },
                { name: '白丸子' },
                { name: '红丸子' },
                { name: '汆丸子' },
                { name: '蒸熊掌' },
                { name: '蒸羊羔' },
                { name: '蒸鹿尾' },
                { name: '梅菜扣肉' },
                { name: '四喜丸子' },
                { name: '酒酿萝卜皮' },
                { name: '红烧胖大海' },
                { name: '连年有鱼' }
            ],
            newList:[
                { name: '香肠' },
                { name: '烤鸭' },
                { name: '烧鸡' },
                { name: '卤煮' },
                { name: '酱汁腊肉' },
                { name: '松花小肚' },
                { name: '白丸子' },
                { name: '红丸子' },
                { name: '汆丸子' },
                { name: '蒸熊掌' },
                { name: '蒸羊羔' },
                { name: '蒸鹿尾' },
                { name: '梅菜扣肉' },
                { name: '四喜丸子' },
                { name: '酒酿萝卜皮' },
                { name: '红烧胖大海' },
                { name: '连年有鱼' }
            ], 
        };
    },
    created() {
        this.getList()
    },
    mounted() {
        document.body.ondrop = function(event) {
            event.preventDefault();
            event.stopPropagation();
        };
    },
    methods: {
        getList() {
            this.$nextTick(() => {
                let olderList = document.getElementById('olderList');
                Sortable.create(olderList, {
                    animation: 120,
                    // onRemove(event) {
                    //     vm.newList.splice(event.newIndex, 0, vm.olderList[event.item.getAttribute('data-index')]);
                    // },
                    onEnd: evt => {                                  
                        const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
                        this.newList.splice(evt.newIndex, 0, tempIndex)
                    }
                });
            })
        },
    }
};
</script>
<style scoped>
.draggable-list li {
    padding: 9px;
    border: 1px solid #e7ebee;
    border-radius: 3px;
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
    transition: all .2s;
    list-style: none;
}

.draggable-list {
    height: 100%;
    overflow: auto;
}
</style>

