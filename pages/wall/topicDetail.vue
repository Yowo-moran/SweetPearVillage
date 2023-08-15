<template>
    <view class="main">
        <topic :info="info"></topic>
        <view class="commentArea">
            <comment-list></comment-list>
        </view>
        <view class="foot" @click="changeShow">
            <view class="comment" v-if="stauts == 0">
                <view class="icon"><img src="../../static/写评论.png"></view>
                <span>写评论</span>
            </view>
            <view class="input" v-if="stauts == 1">
                <input type="text" v-model="text">
                <button @click="submit">发送</button>
            </view>  
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
            stauts:0,
            text:""
        }
    },
    methods:{
        ...mapActions("wall" , ['getTopicDetail' , 'getCommentList' , 'addComment']),
        changeShow(){
            this.stauts = 1;
        },
        submit(){
            // console.log(this.text);
            this.addComment(this.commentInfo);
            this.getCommentList(this.id);
            this.text = "";
        }
    },
    computed:{
        ...mapState("wall" , ['info']),
        commentInfo(){
            let val = {
                postId:this.id,
                comment:this.text,
                nickName:this.info.nickName
            }
            return val;
        }
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
            margin-bottom: 130rpx;
        }
        .foot {
            bottom: 0;
            width: 100%;
            height: 120rpx;
            background-color: #d6d689;
            margin-bottom:0;
            position: fixed;
            display: flex;
            justify-content:center;
            align-items: center;
            .comment{
                // border: 2px solid green;
                height: 60rpx;
                width: 200rpx;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .icon {
                    width: 50rpx;
                    height: 50rpx;
                    img{
                        height: 100%;
                        width: 100%;
                    }
                }
                span{
                    color:#878864;
                    font-size: 35rpx;
                }
            }
            .input {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 65rpx;
                width: 80%;
                input {
                    width: 80%;
                    height: 90%;
                    background-color: #f2f2e5;
                    border: 2px solid #c7c981;
                    border-right: 0px;
                    border-radius: 10rpx 0rpx 0rpx 10rpx;
                    padding-left: 20rpx;
                }
                button{
                    border: 2px solid #b3b350;
                    height: 100%;
                    width: 20%;
                    background-color: #e1e154;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 27rpx;
                    color: #878864;
                }
                margin-bottom: 5rpx;
            }
        }
    }
</style>