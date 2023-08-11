<template>
    <view class="main">
        <topic :info="info"></topic>
        <view class="commentArea">
            <comment-list></comment-list>
        </view>
    </view>
</template>

<script>
import commentList from './commentList.vue';
import topic from './topic.vue';
import { mapState , mapActions } from 'vuex'
export default {
    components:{ topic , commentList },
    data() {
        return {
            id:0,
        }
    },
    methods:{
        ...mapActions("wall" , ['getTopicDetail' , 'getCommentList']),
    },
    computed:{
        ...mapState("wall" , ['info'])
    },
    onLoad(options) {
        this.id = options.id;
        console.log(this.id);
        this.getTopicDetail(this.id);
        this.getCommentList(this.id);
    },
}
</script>

<style lang="scss" scoped>
    .main {
        margin: 0 auto;
        // border: 2px solid red;
        width: 740rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        .commentArea {
            // border: 2px solid blue;
            background-color: #E9E9C4;
            border-radius: 15rpx;
            width: 650rpx;
            // height: 500rpx;
            display: flex;
            align-items: center;
            justify-content:space-around;
            padding-top: 20rpx;
        }
    }
</style>