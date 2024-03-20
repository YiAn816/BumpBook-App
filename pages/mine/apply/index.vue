<template>
	<view>
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" border stripe type="" emptyText="暂无更多数据">
				<uni-tr>
					<uni-th width="70" align="center">姓名</uni-th>
					<uni-th width="150" align="center">申请时间</uni-th>
					<uni-th width="70" align="center">申请状态</uni-th>
					<uni-th width="150" align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in tableData" :key="index">
					<uni-td>
						<view class="name">{{ item.name }}</view>
					</uni-td>
					<uni-td>
						<view class="applyTime">{{ item.applyTime }}</view>
					</uni-td>
					<uni-td>
						<view class="applyStatus">{{ item.applyStatus === 0 ? '申请中' : (item.applyStatus === 1 ? '已同意' : '已拒绝') }}</view>
					</uni-td>
					<uni-td>
						<view class="uni-group" v-if="item.applyStatus === 0">
							<button class="uni-button" size="mini" type="primary" @click="agree(item)">同意</button>
							<button class="uni-button" size="mini" type="warn" @click="refuse(item)">拒绝</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>
<script>
	import {
		queryDeptApplyInfoList,
		updateApplyStatus
	} from '@/api/myda/mine.js'
	export default {
		data() {
			return {
				tableData: [],
				loading: false
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			// 搜索
			search() {
				this.getData()
			},
			// 获取数据
			getData() {
				this.loading = true
				queryDeptApplyInfoList().then(res => {
					this.tableData = res.data
					this.loading = false
				})
			},
			agree(e) {
				updateApplyStatus(e.id, 1).then(res => {
					if (res.code === 200 && res.msg == '操作成功') {
						this.getData()
					}
				})
			},
			refuse(e) {
				updateApplyStatus(e.id, 2).then(res => {
					if (res.code === 200 && res.msg == '操作成功') {
						this.getData()
					}
				})
			}

		}
	}
</script>
<style>
	/* #ifndef H5 */
	/* page {
	padding-top: 85px;
} */
	/* #endif */
	.uni-group {
		display: flex;
		align-items: center;
	}
</style>