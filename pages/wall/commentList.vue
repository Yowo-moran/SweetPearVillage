<template>
    <view class="main">
        <!-- 报错不用管 -->
        <comment v-for="item in 8"></comment>
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

}
</script>

<style>

</style>