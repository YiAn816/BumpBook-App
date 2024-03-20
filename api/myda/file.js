import upload from '@/utils/upload'
import request from '@/utils/request'


// 查询档案基本信息列表
export function getDataList() {
	return request({
		url: '/myda/bp/queryList',
		method: 'get'
	})
}

// 修改用户个人信息
export function addBpBaseInfo(data) {
	return request({
		url: '/myda/bp/addBpBaseInfo',
		method: 'post',
		data: data
	})
}

//上传档案文件
export function uploadFile(data) {
	return upload({
		url: '/myda/bp/upload',
		name: data.name,
		filePath: data.filePath,
		formData: data.formData
	})
}

//删除档案详细信息
export function deleteBpBaseInfo(id) {
	return request({
		url: '/myda/bp/deleteBpBaseInfo/' + id,
		method: 'post'
	})
}

//删除档案详细信息
export function deleteBpBaseDetailInfo(id) {
	return request({
		url: '/myda/bp/deleteBpBaseDetailInfo/' + id,
		method: 'post'
	})
}