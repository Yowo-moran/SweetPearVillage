<template>
    <!-- 单条评论结构 -->
    <view class="main">
        <!-- 昵称 -->
        <view class="userName">
            阿为喵：
        </view>
        <!-- 评论内容 -->
        <view class="content">
            呜呜呜呜呜，我的外卖，刚接到电话就下楼了，结果还是晚到了一步，我的蛋糕啊~~！
        </view>
    </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .main {
        border: 2px solid #c5c870;
        padding: 10rpx;
        width: 600rpx;
        // height: 100rpx;
        display: flex;
        margin-bottom: 10rpx;
        border-radius: 10rpx;
        .userName {
            // border: 2px solid orange;
            width: 130rpx;
            height: 30rpx;
            color: #757805;
            white-space:nowrap;
        }
        .content {
            // border: 2px solid orange;
            width: 450rpx;
            color: #5d5d56;
        }
    }
</style>