<template>
    <view class="list">
        <!-- <topic v-for="item in list" :key="item.id" :pid="item.id"></topic> -->
        <topic v-for="(item,index) in list" :key="item.id" :info="item" :index="index"></topic>
    </view>
</template>

<script>

import topic from './topic.vue';
// import { mapState } from 'vuex'
export default {
    components: { topic },
    data() {
        return {
            
        }
    },
    computed:{
        list(){
            return this.$store.state.wall.topicList
        }
    },    
    // computed:mapState([
    //     'topicList'
    // ])
}
</script>

<style>

</style>