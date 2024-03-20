<template>
  <view>
    <uni-card class="view-title" :title="title">
      <text class="uni-body view-content">
		  用户协议
		  1. 介绍
		  欢迎使用孕妇档案小程序！本协议是您（下称“用户”）与我们（下称“开发者”）之间就使用孕妇档案小程序所达成的协议。在使用本小程序之前，请仔细阅读本协议的所有条款。
		  
		  2. 使用规则
		  用户应遵守国家法律法规和本协议的约定，不得利用本小程序从事违法或其他损害开发者或第三方权益的行为。
		  用户应妥善保管自己的账号信息，不得将账号转让、出借或分享给他人。
		  用户在使用本小程序时，应遵守相关的社区规范和公约。
		  3. 免责声明
		  用户应自行承担使用本小程序的风险，开发者不对用户因使用本小程序而导致的任何损失或损害承担责任。
		  开发者不对用户在本小程序中发布的内容进行审查，但用户发布的内容不得违反法律法规和社区规范。
		  4. 其他条款
		  本协议的解释权归开发者所有。
		  开发者有权根据需要随时修改本协议的内容，修改后的协议内容将在本小程序上公布。用户应定期查阅协议内容，并及时了解最新条款。
	  </text>
    </uni-card>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        content: ''
      }
    },
    onLoad(options) {
      this.title = options.title
      this.content = options.content
      uni.setNavigationBarTitle({
        title: options.title
      })
    }
  }
</script>

<style scoped>
  page {
    background-color: #ffffff;
  }

  .view-title {
    font-weight: bold;
  }

  .view-content {
    font-size: 26rpx;
    padding: 12px 5px 0;
    color: #333;
    line-height: 24px;
    font-weight: normal;
  }
</style>
