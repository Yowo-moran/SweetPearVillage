<template>
    <view class="main">
        <!-- 报错不用管 -->
        <comment v-for="item in list" :key="item.id" :info="item"></comment>
    </view>
</template>

<script>
import comment from './comment.vue';
export default {
    components:{ comment },
    data() {
        return {

        }
    },
    computed:{
        list(){
            return this.$store.state.wall.commentList
        }
    }
}
</script>

<style>

</style>