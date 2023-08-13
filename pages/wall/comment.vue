<template>
    <!-- 单条评论结构 -->
    <view class="main">
        <!-- 昵称 -->
        <view class="userName">
            {{ info.commentUser }}:
        </view>
        <!-- 评论内容 -->
        <view class="content">
            {{ info.comment }}
        </view>
    </view>
</template>

<script>
export default {
    props:["info"],
    data() {
        return {
            
        }
    },
    onLoad(){
        console.log("aaa");
        console.log(this.info);
    }
}
</script>

<style lang="scss" scoped>
    .main {
        border: 2px solid #c5c870;
        padding: 10rpx;
        width: 600rpx;
        display: flex;
        margin-bottom: 10rpx;
        border-radius: 10rpx;
        .userName {
            // width: 130rpx;
            height: 30rpx;
            color: #757805;
            white-space:wrap;
            margin-right: 20rpx;
        }
        .content {
            width: 450rpx;
            color: #5d5d56;
        }
    }
</style>