<template>
    <view class="main">
        <!-- 左侧头像 -->
        <view class="left">
            <view class="portrait">
                <img src="../../static/portrait.png">
            </view>
        </view>
        <!-- 右侧（昵称+文本内容+点赞评论） -->
        <view class="right">
            <view class="userName">
                <span>Awayer</span>
            </view>
            <!-- 文本和图片 -->
            <view class="content">
                <view class="text">
                    家人们，谁懂啊？怎么总有虾头男偷外卖，我真的是一个大无语，这种人能不能似一似啊!
                </view>
                <view class="pics">
                    <view class="pic"><img src="../../static/bochi.png" ></view>
                    <view class="pic"><img src="../../static/bochi.png" ></view>
                    <view class="pic"><img src="../../static/bochi.png" ></view>
                    <view class="pic"><img src="../../static/bochi.png" ></view>
                </view>
            </view>
            <!-- 时间、点赞、评论 -->
            <view class="info">
                <view class="time">今天 11:54</view>
                <view class="star">
                    <view class="starNum">{{ starNum }}</view>
                    <view class="icon1">
                        <img src="../../static/点赞.png" @click="addStar()">
                    </view>
                </view>
                <view class="comment">
                    <view class="commentNum">{{ commentNum }}</view>
                    <view class="icon2">
                        <img src="../../static/评论.png" @click="jump()">
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

export default {

    data() {
        return {
            starNum:233,
            commentNum:233
        }
    },
    methods:{
        addStar() {
            this.starNum++;
        },
        jump(){
            uni.navigateTo({
                url:"topicDetail"
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .main {
        background-color:#f2f2e5;
        // border: 2px solid blue;
        width:710rpx;
        height: 540rpx;
        margin-bottom: 20rpx;
        padding-top: 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8rpx;
        .left {
            // border: 2px solid green;
            width: 90rpx;
            padding-top: 7rpx;
            height: 533rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            .portrait {
                width: 90rpx;
                height: 90rpx;
                img{
                    border-radius: 10rpx;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
            }
        }
        .right {
            // border: 2px solid green;
            width: 590rpx;
            height: 540rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            // justify-content: space-between;
            .userName {
                // border: 2px solid orange;
                width: 570rpx;
                // height: 40rpx;
                padding-left: 10rpx;
                span {
                    color: #878864;
                }                
            }
            .content {
                // border: 2px solid orange;
                width: 580rpx;
                height: 430rpx;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                .text {
                    // border: 2px solid skyblue;
                    width: 570rpx;
                    // height: 100rpx;
                    padding-left: 10rpx;
                    font-size: 29rpx;
                }
                .pics {
                    // border: 2px solid skyblue;
                    width: 570rpx;
                    // height: 310rpx;
                    padding-left: 10rpx;
                    display: grid;
                    grid-template-columns: 165rpx 165rpx ;
                    grid-template-rows: 165rpx 165rpx ;
                    .pic {
                        width: 160rpx;
                        height: 160rpx;
                        // background-color: pink;
                        // border: 1px solid palevioletred;
                        img{
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                        }
                    }
                }
            }
            .info {
                // border: 2px solid orange;
                width: 570rpx;
                // height: 60rpx;
                padding-left: 10rpx;
                display: flex;
                align-items: center;
                margin-bottom: 10rpx;
                .time {
                    width: 200rpx;
                    font-size: 25rpx;
                    color: #878864;
                }
                .star {
                    // border: 1px solid skyblue;
                    width: 100rpx;
                    height: 40rpx;
                    margin-left: 220rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .starNum {
                        color: #878864;
                        font-size: 25rpx;
                        // height: 40rpx;
                        width: 50rpx;
                        margin-top: 7rpx;
                    }
                    .icon1 {
                        height: 45rpx;
                        width: 45rpx;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .comment {
                    // border: 1px solid skyblue;
                    width: 100rpx;
                    height: 40rpx;
                    margin-left: 20rpx;
                    margin-right: 5rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .commentNum {
                        color: #878864;
                        margin-bottom: 0rpx;
                        font-size: 25rpx;
                        // height: 40rpx;
                        width: 50rpx;
                    }
                    .icon2 {
                        height: 35rpx;
                        width: 35rpx;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }
</style>