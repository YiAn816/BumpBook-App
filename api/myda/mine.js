import upload from '@/utils/upload'
import request from '@/utils/request'


// 校验当前用户是否已经加入家庭
export function checkHomeStatus() {
	return request({
		url: '/myda/mine/checkHomeStatus',
		method: 'get',
	})
}

// 查询用户列表
export function getUserList() {
	return request({
		url: '/myda/mine/getUserList',
		method: 'get'
	})
}

// 修改预产期
export function updateYcDateInfo(ycDate) {
	return request({
		url: '/myda/mine/updateYcDateInfo/' + ycDate,
		method: 'post',
	})
}

export function addHomeInfo(homeName) {
	return request({
		url: '/myda/mine/addHomeInfo/' + homeName,
		method: 'post',
	})
}

export function applyJoinDept(homeId, remark) {
	let data = {
		deptId: homeId,
		remark: remark
	}
	return request({
		url: '/myda/mine/applyJoinDept',
		method: 'post',
		params: data
	})
}

export function queryDeptApplyInfoList() {
	return request({
		url: '/myda/mine/queryDeptApplyInfoList',
		method: 'get',
	})
}

export function updateApplyStatus(id, applyStatus) {
	let data = {
		id: id,
		applyStatus: applyStatus
	}
	return request({
		url: '/myda/mine/updateApplyStatus',
		method: 'post',
		params: data
	})
}