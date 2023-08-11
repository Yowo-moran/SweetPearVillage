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
                <span>{{ selfInfo.nickName }}</span>
            </view>
            <!-- 文本和图片 -->
            <view class="content">
                <view class="text">
                    {{ selfInfo.content }}
                </view>
                <view class="pics">
                    <!-- <view class="pic" wx:for="{{ imageArr }}" wx:key="index"> -->
                        <!-- <image src="{{ item.image }}"></image> -->
                    <view class="pic"><img src="../../static/bochi.png" ></view>
                    <view class="pic"><img src="../../static/bochi.png" ></view>
                    <view class="pic"><img src="../../static/bochi.png" ></view>
                    <view class="pic"><img src="../../static/bochi.png" ></view>
                </view>
            </view>
            <!-- 时间、点赞、评论 -->
            <view class="info">
                <view class="time">{{ selfInfo.updateTime }}</view>
                <view class="star">
                    <view class="starNum">{{ selfInfo.praiseCnt }}</view>
                    <view class="icon1">
                        <img :src="praiseSrc" @click="like(selfInfo.id)">
                    </view>
                </view>
                <view class="comment">
                    <view class="commentNum">{{ selfInfo.commentCnt }}</view>
                    <view class="icon2">
                        <img src="../../static/评论.png" @click="jump(selfInfo.id)">
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props:["info" , "index"],
    data() {
        return {
            likeStatus:false,
        }
    },
    methods:{
        jump(id){
            uni.navigateTo({
                url:`topicDetail?id=${id}`
            })
        },
        async checkLikeStatus(pid){
            const url = `https://101.43.254.115:7115/post/like/${pid}`;
            const that = this;
            await wx.request({
                url: url,
                method: "GET",
                header: {
                    Authorization: wx.getStorageSync('token')
                },
                success(res) {
                    console.log(res.data);
                    if(res.data.message == "true"){
                        that.likeStatus = true;
                    } else {
                        that.likeStatus = false;
                    }
                    
                }
            });
        },
        async like(pid){
            const url = `https://101.43.254.115:7115/post/like/${pid}`;
            const that = this;
            await wx.request({
                url: url,
                method: "POST",
                header: {
                    Authorization: wx.getStorageSync('token')
                },
                success(res) {
                    console.log(res.data.message);
                    if (res.data.message == "点赞成功") {
                        that.selfInfo.praiseCnt += 1;
                    } else {
                        that.selfInfo.praiseCnt -= 1;
                    }
                    console.log("index:" , that.index);
                    // console.log(that.$store.state.wall.topicList[that.index]);
                    that.$store.state.wall.topicList[that.index] = that.info
                    that.checkLikeStatus(pid);
                }
            });
        }
    },
    computed:{
        selfInfo(){
            let val = this.info
            return val
        },
        imageArr(){
            let val = this.info.images;
            return val
        },
        praiseSrc(){
            if(this.likeStatus){
                return "../../static/已点赞.png"
            } else {
                return "../../static/未点赞.png"
            }
        }
    },  
    watch:{

    },
    onLoad(){
        console.log(imageArr);
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
                    width: 150rpx;
                    font-size: 25rpx;
                    color: #878864;
                }
                .star {
                    // border: 1px solid skyblue;
                    width: 100rpx;
                    height: 40rpx;
                    margin-left: 250rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .starNum {
                        color: #878864;
                        font-size: 25rpx;
                        margin-right: 10rpx;
                        // height: 40rpx;
                        // width: 50rpx;
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
                    margin-left: 5rpx;
                    margin-right: 5rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .commentNum {
                        color: #878864;
                        margin-bottom: 0rpx;
                        font-size: 25rpx;
                        margin-right: 10rpx;
                        // height: 40rpx;
                        // width: 50rpx;
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