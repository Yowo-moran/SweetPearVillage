<template>
	<!-- 添加左右滑动区 一定要设置高度为100% -->
	<!-- 注册滑动事件 -->
	<swiper style="height:100%" @change="skipChange" :current="activeIndex" >
		<swiper-item style="height: 100%;" v-for="item,index in 3" @touchmove.stop>
			<swiperCard :tagName="tagName"></swiperCard>
		</swiper-item>
	</swiper>
	
	
</template>
<script>
	import swiperCard from './swiperCard/swiperCard.vue';
	export default {
		components:{swiperCard},
		props:{
				activeIndex:{
					type:Number,
					default:0
				},
				tagName:{
					type:String,
					default:'悬赏'
				}
		},
		data() {
			return {
			
			}
		},
		methods: {
			skipChange(e){
				const {current}=e.detail
				this.activeIndex=current
			}
		}
	}
</script>

<style>
	

</style>
