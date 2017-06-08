<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-navmenu></v-navmenu>
        <div>
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vNavmenu from './Navmenu.vue';
     import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vHead,vNavmenu
        }
    }
</script>
