 <template>
    <div>
       <div>home</div>
    </div>
</template>

<script>
export default {
    data: () => ({
        activeIndex: '',
    }),
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created(){
        this.activeIndex = this.$route.path;
        console.log(window.serverPath.casUrl,'window.casUrl')
    }
}
</script>

<style scoped>
/* 左侧导航菜单样式 */
.container{
    overflow: hidden;
}
</style>
