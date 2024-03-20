<template>
	<view class="mine-container" :style="{height: `${windowHeight}px`}">
		<!--顶部个人信息栏-->
		<view class="header-section">
			<view class="flex padding justify-between">
				<view class="flex align-center">
					<view v-if="!avatar" class="cu-avatar xl round bg-white">
						<view class="iconfont icon-people text-gray icon"></view>
					</view>
					<image v-if="avatar" @click="handleToAvatar" :src="avatar" class="cu-avatar xl round"
						mode="widthFix">
					</image>
					<view v-if="!name" @click="handleToLogin" class="login-tip">
						点击登录
					</view>
					<view v-if="name" class="user-info">
						<view class="u_title" v-if="!editNickName">
							用户名：{{ nickname }}
						</view>
						<view>
							<u-input v-model="editName" placeholder="请输入用户名" maxlength='10'
								v-if='editNickName'></u-input>
						</view>
						<view @longpress="copyDeptId">
							家庭号码：{{deptId}}
							<!-- <uni-icons type="calendar" size="20"></uni-icons> -->
						</view>
					</view>
				</view>
				<view @click="handleToEditInfo" class="flex align-center">
					<u-icon size="40" name="edit-pen" v-if="!editNickName"></u-icon>
					<u-icon size="40" name="checkmark" v-if='editNickName'></u-icon>
				</view>
			</view>
		</view>

		<view class="content-section">
			<view class="mine-actions grid col-4 text-center">
				<view class="action-item" @click="homeHandle">
					<view class="iconfont icon-friendfill text-pink icon"></view>
					<text class="text">我的e家</text>
				</view>
				<view class="action-item" @click="ycqHandle">
					<view class="iconfont icon-service text-blue icon"></view>
					<text class="text">预产期</text>
				</view>
				<view class="action-item" @click="msgHandle">
					<view class="iconfont icon-community text-mauve icon"></view>
					<text class="text">消息</text>
				</view>
				<view class="action-item" @click="downHandle">
					<view class="iconfont icon-xiazai text-green icon"></view>
					<text class="text">下载所有档案资料</text>
				</view>
			</view>
		</view>
		<view v-if="name" class="content-list">
			<view class="content-person" v-if="!homeStatus">
				<view class="centered-content">
					<u-button class="add-button" plain :type="!checked===true?'primary':'default'" :disabled="true"
						style="margin: 0 10px;">新增家庭</u-button>
					<u-switch v-model="checked" active-color="#2979ff" inactive-color='#2979ff'></u-switch>
					<u-button class="add-button" plain :type="checked===true?'primary':'default'" :disabled="true"
						style="margin: 0 10px;">加入家庭</u-button>
				</view>
				<view class="centered-content">
					<u-field v-if='!checked' v-model="homeName" label="家庭名称" placeholder="请输入家庭名称" required trim
						@confirm='submitForm'></u-field>
					<u-field v-if='checked' v-model="homeId" label="家庭号码" placeholder="请输入家庭号码" required trim
						@confirm='submitForm'></u-field>
				</view>
				<u-button type="primary" @click="submitForm">确定</u-button>
			</view>
			<view class="button-container" v-if="homeStatus">
				<u-button type="primary" size="mini" :ripple="true" :plain="true"
					@click="dissolveFamily">解散家庭</u-button>
			</view>
			<view class="content-person" v-if="homeStatus">
				<u-grid :col="3" :border='false'>
					<u-grid-item v-for="item in homePersonList" :key='item.id' :index="item.id">
						<u-avatar :src="item.avatar" size="150"></u-avatar>
						<view class="grid-text">{{item.nickName}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>

		<view>
			<uni-calendar ref="calendar" :insert="false" :lunar="false" :selected='calendarSelected'
				@confirm="calendarChange" />
		</view>
		<view class="button-kf">
			  <button class="round-button" open-type="contact">
			    <img src="@/static/images/kf.png" alt="客服">
			  </button>
		</view>
	</view>

</template>

<script>
	import storage from '@/utils/storage'
	import {
		checkHomeStatus,
		addHomeInfo,
		getUserList,
		updateYcDateInfo,
		applyJoinDept,
	} from '@/api/myda/mine.js'
	import {
		updateUserProfile
	} from '@/api/system/user.js'

	export default {
		data() {
			return {
				name: this.$store.state.user.name,
				nickname: this.$store.state.user.nickname,
				version: getApp().globalData.config.appInfo.version,
				deptId: this.$store.state.user.deptId,
				calendarSelected: [],
				homePersonList: [],
				text: '无头像',
				homeStatus: false,
				checked: false,
				homeName: '',
				homeId: '',
				editNickName: false,
				editName: ''
			}
		},
		computed: {
			avatar() {
				return this.$store.state.user.avatar
			},
			windowHeight() {
				return uni.getSystemInfoSync().windowHeight - 50
			}
		},
		onLoad() {
			this.homeHandle()
		},
		methods: {
			onShow() {
				if (this.$store.state.user.deptId == '') {
					this.$modal.showToast('请先创建或加入家庭!')
				}
			},
			handleToInfo() {
				this.$tab.navigateTo('/pages/mine/info/index')
			},
			handleToEditInfo() {
				this.editNickName = !this.editNickName
				if (!this.editNickName) {
					if (this.editName == '') {
						uni.showToast({
							title: '昵称不能为空！',
							icon: 'error'
						})
						return
					}
					let data = {
						nickName: this.editName
					}
					updateUserProfile(data).then(res => {
						if (res.code == 200 && res.msg == '操作成功') {
							this.$modal.showToast('操作成功！')
							this.$store.commit('SET_NICKNAME', this.editName)
							this.nickname = this.$store.state.user.nickname
							this.homeHandle()
						}

					})
				}
			},
			handleToSetting() {
				this.$tab.navigateTo('/pages/mine/setting/index')
			},
			handleToLogin() {
				this.$tab.reLaunch('/pages/login')
			},
			handleToAvatar() {
				this.$tab.navigateTo('/pages/mine/avatar/index')
			},
			handleLogout() {
				this.$modal.confirm('确定注销并退出系统吗？').then(() => {
					this.$store.dispatch('LogOut').then(() => {
						this.$tab.reLaunch('/pages/index/login')
					})
				})
			},
			ycqHandle() {
				this.$refs.calendar.open();
			},
			calendarChange(e) {
				updateYcDateInfo(e.fulldate).then(res => {
					if (res.code === 200 && res.msg == '操作成功') {
						this.$modal.showToast('修改预产期成功！')
					}
				})
			},
			homeHandle() {
				if (this.deptId == '') {
					this.homeStatus = false
				} else {
					//我的e家
					this.homeStatus = true
					getUserList().then(res => {
						this.homePersonList = res.data
					})
				}
				// checkHomeStatus().then(res => {
				// 	if (res.code === 200 && res.data === true) {
				// 		//我的e家
				// 		this.homeStatus = true
				// 		getUserList().then(res => {
				// 			this.homePersonList = res.data
				// 		})
				// 	} else {
				// 		this.homeStatus = false
				// 	}
				// })
			},
			msgHandle() {
				this.$tab.navigateTo('/pages/mine/apply/index')
			},
			downHandle() {
				console.log('downHandle')
				this.$modal.showToast('模块建设中~')
			},
			submitForm() {
				if (this.checked) {
					//加入家庭
					applyJoinDept(this.homeId, '').then(res => {
						if (res.code === 200 && res.msg == '操作成功') {
							this.$modal.showToast('申请加入成功，等待管理员审批！')
						}
					})

				} else {
					addHomeInfo(this.homeName).then(res => {
						this.$modal.showToast('新增家庭信息成功！')
						if (res.code === 200 && res.data != null) {
							// 设置用户信息
							this.$store.dispatch('GetInfo').then(res => {
								this.deptId = this.$store.state.user.deptId
								this.homeHandle()
							})
						}

					})
				}
			},
			dissolveFamily() {
				console.log("dissolveFamily")
			},
			copyDeptId() {
				uni.setClipboardData({
					data: String(this.deptId),
					success: () => {
						uni.showToast({
							title: '复制家庭号码成功',
							icon: 'success'
						});
					},
					fail: () => {
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f6f7;
	}

	.mine-container {
		width: 100%;
		height: 100%;


		.header-section {
			padding: 15px 15px 45px 15px;
			background-color: #3c96f3;
			color: white;

			.login-tip {
				font-size: 18px;
				margin-left: 10px;
			}

			.cu-avatar {
				border: 2px solid #eaeaea;

				.icon {
					font-size: 40px;
				}
			}

			.user-info {
				margin-left: 15px;

				.u_title {
					font-size: 18px;
					line-height: 30px;
				}
			}
		}

		.content-section {
			position: relative;
			top: -50px;

			.mine-actions {
				margin: 15px 15px;
				padding: 20px 0px;
				border-radius: 8px;
				background-color: white;

				.action-item {
					.icon {
						font-size: 28px;
					}

					.text {
						display: block;
						font-size: 13px;
						margin: 8px 0px;
					}
				}
			}

			.grid-item-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100%;
				/* 保证内容区域填满整个 grid-item */
			}

			.center-image {
				max-width: 100%;
				max-height: 100%;
				font-size: 40px;
			}

			.person-avatar {
				border: 2px solid #eaeaea;

				.icon {
					font-size: 40px;
				}
			}
		}

		.content-list {
			position: relative;
			top: -50px;

			.content-person {
				position: relative;
				top: 0px;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.centered-content {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin-bottom: 10px;
			}

			.button-container {
				position: relative;
				top: 0px;
				display: flex;
				justify-content: flex-start;
				margin-left: 5px;
				margin-bottom: 10px;
			}
		}
		.button-kf {
		  position: fixed;
		  bottom: 30px; /* 距离底部的距离 */
		  right: 40px; /* 水平居中 */
		  transform: translateX(50%); /* 将按钮向左移动自身宽度的一半 */
		}
		.round-button {
		  width: 60px; /* 按钮的宽度 */
		  height: 60px; /* 按钮的高度 */
		  border-radius: 50%; /* 将按钮的边框半径设置为按钮宽度的一半，实现圆形 */
		  background-color: transparent; /* 按钮的背景颜色 */
		  border: none; /* 可以去除按钮的边框 */
		  padding: 0; /* 可以去除按钮的内边距 */
		  display: flex;
		  justify-content: center;
		  align-items: center;
		}
		
		.round-button img {
		  width: 30px; /* 图片的宽度 */
		  height: 30px; /* 图片的高度 */
		}

	}
</style>