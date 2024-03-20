import request from '@/utils/request'


// 查询档案基本信息列表
export function getPregnancyInfo() {
	return request({
		url: '/myda/index/getPregnancyInfo',
		method: 'get'
	})
}

// 查询档案基本信息列表
export function getPregnancyWeekInfo(week) {
	return request({
		url: '/myda/index/getPregnancyWeekInfo/' + week,
		method: 'get'
	})
}