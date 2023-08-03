<template>
	<!-- 横向卡片 悬赏-->
	<view class=listItem v-if="tagItem==='悬赏'" @click="jump"> 
		<view class="listItemContent">猪猪不爱吃猪猪，猪猪不爱吃猪猪，猪猪不爱吃猪猪猪猪不爱吃猪猪猪猪不爱吃猪猪猪猪不爱吃猪猪，猪猪不爱吃猪猪，猪猪不爱吃猪猪</view>
		<view class="userInfo">
			<!-- 用户头像 -->
			<image class="userAvatar" src="../../../../../static/60155475_p0_master1200.jpg"></image>
			<!-- 用户名称 -->
			<view class="userName">猪猪不爱吃珠珠猪猪不爱吃</view>
			<!-- 价格 -->
			<view class="price">￥ 20</view>
    </view>
</view>
	<!-- 纵向卡片 书籍 -->	
	<view class="verListItem" v-else-if="tagItem==='书籍'" @click="jump">
		<view class="bookPhoto">
			<image src="../../../../../static/60155475_p0_master1200.jpg"></image>
		</view>
		<view class="listItemContent">
			<view class="price">￥ 20</view>
			<view class="listItemTitle">高等数学 第七版 上册 高等数学 </view>
			<!-- 描述信息 -->
			<view class="litsItemDec">
				<view>猪不爱吃珠珠猪</view>
				<view>猪猪不爱吃珠珠猪猪不爱吃猪猪猪</view>
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
				<image class="userAvatar" src="../../../../../static/60155475_p0_master1200.jpg"></image>
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
	background-color: #fff;
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
        }
    }
}
.listItem:first-child{
	margin-top: 15rpx;
}
.verListItem{
    display: inline-block;
    margin: 15rpx 14rpx;
    padding: 30rpx 5rpx;
    width: 45%;
    background-color: #fff;
     // box-sizing: border-box;
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
            font-size: large;
        }
        .listItemTitle{
            font-size: large;
            width: 90%;
            margin: 0 auto;
            box-sizing: border-box;
        }
        .litsItemDec{
            width: 90%;
            margin: 40rpx auto 0;
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
			}
		}
	}
}
.rowlistItem:first-child{
	margin-top: 15rpx;
}

</style>
