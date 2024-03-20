<template>
  <view>
    <uni-card class="view-title" :title="title">
      <text class="uni-body view-content">
		  隐私协议
		  1. 信息收集和使用
		  本小程序可能会收集和使用用户的个人信息，用于提供服务和改善用户体验。用户使用本小程序即视为同意开发者收集和使用其个人信息。
		  开发者承诺不会将用户的个人信息泄露或提供给第三方，除非获得用户的明确同意或法律法规规定。
		  2. 信息保护
		  开发者将采取合理的安全措施保护用户的个人信息，防止信息泄露、损毁或丢失。
		  在用户自愿删除账号或停止使用本小程序时，开发者将停止收集和使用用户的个人信息，并尽快删除相关数据。
		  3. 其他条款
		  用户在使用本小程序时，应仔细阅读并同意本隐私协议的所有条款。
		  开发者有权根据需要随时修改本隐私协议的内容，修改后的协议内容将在本小程序上公布。用户应定期查阅协议内容，并及时了解最新条款。
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
