<template>
    <view class="list">
        <!-- 报错不用管 -->
        <topic v-for="item in 6"></topic>
    </view>
</template>

<script>
import topic from './topic.vue';
export default {
    components: { topic }
}
</script>

<style>

</style>