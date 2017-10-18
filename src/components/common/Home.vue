<template>
    <div class="wrapper">
        <v-head @authority='setAuthority'></v-head>
        <v-navbar ref='navbar'></v-navbar>
        <div class="content">
            <transition name="move" mode="out-in">
                    <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vNavbar from './Navbar.vue';
export default {
    components: {
        vHead, vNavbar
    },
    data(){
        return{

        }
    },
    methods:{
        setAuthority(){
            this.$refs.navbar.selectMenu()
        }
    }
}
</script>
