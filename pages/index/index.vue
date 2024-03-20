<template>
	<view class="work-container">
		<view class="centered-content">
			<view class="left-column">
				<uni-title title="预产期" color="#027fff" type='h4' align='center' style="margin-top: 20px;"></uni-title>
				<uni-title :title="dueDate" color="#027fff" type='h1' align='center'></uni-title>
			</view>
			<view class="divider"></view>
			<view class="right-column,centered-right">
				<u-circle-progress active-color="#2979ff" :percent="80">
					<view class="u-progress-content">
						<view class="u-progress-dot"></view>
						<text class='u-progress-info'>{{pregnancyDesc}}</text>
					</view>
				</u-circle-progress>
				<text class="text-below">距离预产期{{days}}天</text>
			</view>

		</view>
		<view class='content-section'>
			<view>
				<uni-title type="h1" title="胎儿变化" color="#027fff"></uni-title>
			</view>
			<view>
				<text class="text-content">{{fetalChange}}</text>
			</view>
		</view>
		<view class='content-section'>
			<view>
				<uni-title type="h1" title="准妈妈本周情况" color="#027fff"></uni-title>
			</view>
			<view>
				<text class="text-content">{{maternalChange}}</text>
			</view>
		</view>
		<view class='content-section'>
			<view>
				<uni-title type="h1" title="心理变化" color="#027fff"></uni-title>
			</view>
			<view>
				<text class="text-content">{{psychologicalChange}}</text>
			</view>
		</view>
		<view class='content-section'>
			<view>
				<uni-title type="h1" title="关爱提醒" color="#027fff"></uni-title>
			</view>
			<view>
				<text class="text-content">{{careTip}}</text>
			</view>
		</view>
		<view class='content-section'>
			<view>
				<uni-title type="h1" title="饮食建议" color="#027fff"></uni-title>
			</view>
			<view>
				<text class="text-content">{{dietaryAdvice}}</text>
			</view>
		</view>
		<!-- 		<view>
			<view class='content-section'>
				<uni-title type="h1" title="常见问题" color="#027fff"></uni-title>
			</view>
			<view>
				<text class="text-content">{{commonQuestion}}</text>
			</view>
		</view> -->
		<view class='content-section'>
			<view>
				<uni-title type="h1" title="准爸爸能做什么" color="#027fff"></uni-title>
			</view>
			<view>
				<text class="text-content">{{remark}}</text>
			</view>
		</view>


	</view>
</template>


<script>
	import {
		getPregnancyInfo,
		getPregnancyWeekInfo
	} from '@/api/myda/index.js'
	export default {
		data() {
			return {
				current: 0,
				swiperDotIndex: 0,
				data: [{
						image: '/static/images/banner/banner01.jpg'
					},
					{
						image: '/static/images/banner/banner02.jpg'
					},
					{
						image: '/static/images/banner/banner03.jpg'
					}
				],
				fetalChange: '', //胎儿变化
				maternalChange: '', //准妈妈变化
				psychologicalChange: '', //心理变化
				careTip: '', //关爱提醒
				commonQuestion: '', //常见问题
				dietaryAdvice: '', //饮食建议
				remark: '', //准爸爸能做什么
				days: '',
				pregnancyDesc: '',
				dueDate: '',
			}
		},
		methods: {
			onShow() {
				if (this.$store.state.user.deptId == '') {
					this.$tab.reLaunch('/pages/mine/index')
				} else {
					getPregnancyInfo().then(res => {
						uni.setNavigationBarTitle({
							title: '孕' + res.data.weeks + '周',
						})
						this.dueDate = res.data.dueDate
						this.days = res.data.days
						if (res.data.pregnancyType === 0) {
							this.pregnancyDesc = '孕初期'
						} else if (res.data.pregnancyType === 1) {
							this.pregnancyDesc = '孕中期'
						} else if (res.data.pregnancyType === 2) {
							this.pregnancyDesc = '孕晚期'
						}
						getPregnancyWeekInfo(res.data.weeks).then(res => {
							if (res.data != null) {
								this.fetalChange = res.data.fetalChange === null ? '' : res.data
									.fetalChange //胎儿变化
								this.maternalChange = res.data.maternalChange === null ? '' : res.data
									.maternalChange //准妈妈变化
								this.psychologicalChange = res.data.psychologicalChange === null ? '' : res
									.data.psychologicalChange //心理变化
								this.careTip = res.data.careTip === null ? '' : res.data.careTip //关爱提醒
								this.commonQuestion = res.data.commonQuestion === null ? '' : res.data
									.commonQuestion //常见问题
								this.dietaryAdvice = res.data.dietaryAdvice === null ? '' : res.data
									.dietaryAdvice //饮食建议
								this.remark = res.data.remark === null ? '' : res.data.remark //准爸爸能做什么
							}
						})
					})
				}
			},
			clickBannerItem(item) {},
			changeSwiper(e) {
				this.current = e.detail.current
			},
			changeGrid(e) {
				this.$modal.showToast('模块建设中~')
			}
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	/* #endif */

	.text {
		text-align: center;
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
		;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-box {
		height: 150px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		height: 300rpx;
		line-height: 300rpx;
	}

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			/* #ifndef APP-NVUE */
			margin: 0 auto;
			/* #endif */
			margin-top: 8px;
		}

		.image {
			width: 100%;
		}
	}

	.centered-content {
		display: flex;
		// flex-direction: column;
		align-items: stretch;
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */
		height: 20vh;
		/* 填充整个屏幕高度 */
		text-align: center;
		/* 文字水平居中 */
		margin-top: 30px;
	}

	.centered-right {
		display: flex;
		flex-direction: column;
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */
		height: 20vh;
		/* 填充整个屏幕高度 */
		text-align: center;
		/* 文字水平居中 */
		margin-top: 0px;
	}

	.left-column,
	.right-column {
		flex: 1;
		/* 自动填充剩余空间 */
	}

	.divider {
		width: 1px;
		/* 竖线宽度 */
		background-color: #000;
		/* 竖线颜色 */
		margin: 0 10px;
		/* 竖线左右间距 */
	}

	.u-progress-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.u-progress-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background-color: #fb9126;
	}

	.u-progress-info {
		font-size: 28rpx;
		padding-left: 16rpx;
		letter-spacing: 2rpx
	}

	.text-below {
		margin-top: 10px;
		/* 设置文本与圆形进度条之间的间距 */
	}

	.text-content {
		font-size: 16px;
		color: #333;
		letter-spacing: 2px;
	}

	.content-section {
		margin-top: 15px;
		margin-left: 20px;
		margin-right: 20px;
	}
</style>