<template>
	<!-- 横向卡片 悬赏-->
	<view class=listItem v-if="tagItem==='悬赏'" @click="jump"> 
		<view class="listItemContent">猪猪不爱吃猪猪，猪猪不爱吃猪猪，猪猪不爱吃猪猪猪猪不爱吃猪猪猪猪不爱吃猪猪猪猪不爱吃猪猪，猪猪不爱吃猪猪，猪猪不爱吃猪猪</view>
		<view class="userInfo">
			<!-- 用户头像 -->
			<image class="userAvatar" src="../../../../../static/bochi.png"></image>
			<!-- 用户名称 -->
			<view class="userName">猪猪不爱吃珠珠猪猪不爱吃</view>
			<!-- 价格 -->
			<view class="price">￥ 20</view>
    </view>
</view>
	<!-- 纵向卡片 书籍 -->	
	<view class="verListItem" v-else-if="tagItem==='书籍'" @click="jump">
		<view class="bookPhoto">
			<image src="../../../../../static/111.jpg"></image>
		</view>
		<view class="listItemContent">
			<view class="price">￥ 20</view>
			<view class="listItemTitle">高等数学 第七版 上册 高等数学 </view>
			<!-- 描述信息 -->
			<view class="litsItemDec">
				<view class="college"><view style="width: 30%">学院：</view><view style="width: 70%;">集成电路与工程学院</view></view>
				<view class="majority"><view  style="width: 30%;">专业：</view><view style="width: 70%;">电子信息工程</view></view>
			</view>
		</view>
	</view>
	<!-- 横向卡片 闲置 -->
	<view class="rowlistItem" v-else-if="tagItem==='闲置'" @click="jump">
		<view class="listItemImage">
			<image src="../../../../../static/111.jpg"></image>
		</view>
		<view class="listContent">
			<view class="listDes">珠珠就爱就爱就爱吃猪猪珠珠就爱吃猪猪珠珠就爱吃猪猪</view>
			<view class="user">
				<image class="userAvatar" src="../../../../../static/bochi.png"></image>
				<text class="userName">珠珠就爱吃猪猪</text>
				<text class="price">￥ 20</text>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
	props:{
		tagName:{
			type:String,
			default:'悬赏'
		}
	},
		data() {
			return {
				tagItem:'悬赏'
			}
		},
		methods: {
			jump(){
				uni.navigateTo({
					url:'/pages/massage/chat/chat'
				})
			}
		},
		watch:{
			tagName(value){
				// console.log('收到了',value);
				this.tagItem=value
			}
		}
	}
</script>

<style lang="scss">	
.listItem{
    display: flex;
    flex-direction: column;
    height: 200rpx;
    // width: 100%;
	background-color: #F3F3EA;
    margin: 30rpx 10rpx;
    border-radius: 15rpx;
    padding: 20rpx 40rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    .listItemContent{
        height: 45%;
        width: 65%;
        overflow: hidden;
        /* 溢出用省略号隐藏 */
        text-overflow: ellipsis;
        display: -webkit-box;
        /* 显示的行 */
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .userInfo{
        display: flex;
        align-items: center;
        padding: 40rpx 20rpx 0 0;
        height: 50%;
        width: 100%;
        // background-color: green;
        box-sizing: border-box;
        image{
            width: 40rpx;
            height: 40rpx;
        }
        .userName{
            margin-left: 20rpx;
            width: 70%;
            overflow: hidden;
            /* 溢出用省略号隐藏 */
            text-overflow: ellipsis;
            display: -webkit-box;
            /* 显示的行 */
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .price{
            margin-right: 10rpx;
			font-size: 40rpx;
			color: #b38f8f;
        }
    }
}
.listItem:first-child{
	margin-top: 15rpx;
}
.verListItem{
    display: inline-block;
    margin: 15rpx 18.75rpx;
    padding: 30rpx 5rpx;
    width: 45%;
    background-color: #F3F3EA;
    box-sizing: border-box;
    .bookPhoto{
        width: 75%;
        margin: 0 auto;
        height: 230rpx;
        overflow: hidden;
        image{
			width: 100%;
            height: 100%;
        }
    }
    .listItemContent{
        margin-top: 40rpx;
        width: 100%;
        .price{
            text-align: center;
           font-size: 40rpx;
           color: #b38f8f;
        }
        .listItemTitle{
			font-size: 32rpx;
			font-weight: bold;
            width: 90%;
            margin: 0 auto;
            box-sizing: border-box;
        }
        .litsItemDec{
			font-size: 26rpx;
            width: 90%;
            margin: 40rpx auto 0;
			.college{
				display: flex;
				margin-bottom: 20rpx;
			}
			.majority{
				display: flex;
			}
        }
    }
}
.rowlistItem{
	display: flex;
	justify-content: space-around;
	height: 180rpx;
	margin: 20rpx;
	padding: 15rpx 30rpx;
	border-radius: 10rpx;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .32), 0 0 6px rgba(0, 0, 0, .20);
	box-sizing: border-box;
	.listItemImage{
		margin-top: 15rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 40rpx;
		image{
			border-radius: 40rpx;
			width: 100%;
			height: 100%;
		}
	}
	.listContent{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 70%;
		height: 100%;
		font-size: 32rpx;
		.listDes{
			height:55%;
			width: 80%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			/* 显示的行 */
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.user{
			height: 20%;
			margin-bottom: 10rpx;
			.userAvatar{
				height: 100%;
				width: 30rpx;
				border-radius: 10rpx;
				background-color: blueviolet;
			}
			.userName{
				margin:0 20rpx;
				font-size: 30rpx;
			}
			.price{
				margin-left: 60rpx;
				font-size: 40rpx;
				color: #b38f8f;
			}
		}
	}
}
.rowlistItem:first-child{
	margin-top: 15rpx;
}

</style>
