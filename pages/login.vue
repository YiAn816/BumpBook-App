<template>
	<view class="normal-login-container">
		<view class="logo-content align-center justify-center flex">
			<image style="width: 100rpx;height: 100rpx;" :src="globalConfig.appInfo.logo" mode="widthFix">
			</image>
			<text class="title">美孕档案</text>
		</view>
		<view class="login-form-content">
			<view class="action-btn">
				<button @click="wechatLogin" class="login-btn cu-btn block bg-blue lg round">一键登录</button>
			</view>
		</view>
		
		<view class="checkbox-wrapper xieyi">
			<checkbox-group @change="checkboxChange">
				<label>
					<checkbox class="checkbox" :checked="isChecked" color="#2979FF"></checkbox>
				</label>
			</checkbox-group>
		  <text @click="handleUserAgrement" class="text-blue">《用户协议》</text>
		  <text @click="handlePrivacy" class="text-blue">《隐私协议》</text>
		</view>
	</view>
</template>

<script>
	import {
		getCodeImg,
		getInfo
	} from '@/api/login'

	export default {
		data() {
			return {
				userInfo: {},
				hasUserInfo: false,
				canIUseGetUserProfile: false,
				codeUrl: "",
				captchaEnabled: true,
				globalConfig: getApp().globalData.config,
				loginForm: {
					nickName: "",
					avatarUrl: "",
					xcxCode: ""
				},
				isChecked: false
			}
		},
		created() {
			// this.getCode()
		},
		methods: {
			// 隐私协议
			handlePrivacy() {
				let site = this.globalConfig.appInfo.agreements[0]
				this.$tab.navigateTo(`/pages/common/xy/ysxy?title=${site.title}&url=${site.url}`)
			},
			// 用户协议
			handleUserAgrement() {
				let site = this.globalConfig.appInfo.agreements[1]
				this.$tab.navigateTo(`/pages/common/xy/yhxy?title=${site.title}&url=${site.url}`)
			},

			// 登录成功后，处理函数
			loginSuccess(result) {
				// 设置用户信息
				this.$store.dispatch('GetInfo').then(res => {
					if (this.$store.state.user.deptId == '') {
						this.$tab.reLaunch('/pages/mine/index')
					} else {
						this.$tab.reLaunch('/pages/index/index')
					}
				})
			},
			wechatLogin() {
				if(!this.isChecked){
					uni.showToast({
						title: '未勾选同意用户隐私协议！',
						icon: 'none'
					})
					return
				}
				wx.login({
					success: (res) => {
						if (res.code) {
							this.$store.dispatch('LoginForXcx', res.code).then(() => {
								this.$modal.closeLoading()
								this.loginSuccess()
							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
				// wx.login({
				// 	success: (res) => {
				// 		if (res.code) {
				// 			that.loginForm.xcxCode = res.code
				// 			that.$store.dispatch('LoginForXcx', that.loginForm).then(() => {
				// 				that.$modal.closeLoading()
				// 				this.loginSuccess()
				// 			})
				// 		} else {
				// 			console.log('登录失败！' + res.errMsg)
				// 		}
				// 	}
				// })
				// wx.getUserProfile({
				// 	desc: '需要经过您的授权', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				// 	success: (res) => {
				// 		that.loginForm.avatarUrl = res.userInfo.avatarUrl
				// 		that.loginForm.nickName = res.userInfo.nickName

				// 	}
				// })

			},
			checkboxChange(e) {
				this.isChecked = !this.isChecked
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.normal-login-container {
		width: 100%;

		.logo-content {
			width: 100%;
			font-size: 21px;
			text-align: center;
			padding-top: 15%;

			image {
				border-radius: 4px;
			}

			.title {
				margin-left: 10px;
			}
		}

		.login-form-content {
			text-align: center;
			margin: 20px auto;
			margin-top: 15%;
			width: 80%;

			.input-item {
				margin: 20px auto;
				background-color: #f5f6f7;
				height: 45px;
				border-radius: 20px;

				.icon {
					font-size: 38rpx;
					margin-left: 10px;
					color: #999;
				}

				.input {
					width: 100%;
					font-size: 14px;
					line-height: 20px;
					text-align: left;
					padding-left: 15px;
				}

			}

			.login-btn {
				margin-top: 40px;
				height: 45px;
			}

			.xieyi {
				color: #333;
				margin-top: 20px;
			}

			.login-code {
				height: 38px;
				float: right;

				.login-code-img {
					height: 38px;
					position: absolute;
					margin-left: 10px;
					width: 200rpx;
				}
			}
		}
	}
	
	.checkbox-wrapper {
	  display: flex;
	  align-items: center;
	  justify-content: center; /* 水平居中 */
	}
	
	.checkbox {
	  margin-right: 5px;
	}
	
	.text-blue {
	  color: #2979FF;
	}
</style>