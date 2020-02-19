//app.js
App({
  data:{
    Flag:false
  },

  onLaunch: function () {
    // 展示本地存储能力
    wx.request({//检测token是否有效
      url: 'https://api.it120.cc/zhangjianbao/user/check-token',
      data:{
        token:wx.getStorageSync('token')
      },
      success(res){
        console.log(res);
        if(res.data.code==0){
          console.log("登录成功")
        }else if(res.data.code==2000){
          wx.showModal({
            title: '登录过期',
            content: '登录已过期，请重新登录',
            showCancel:false,//是否显示取消按钮
            success(res){
              if(res.confirm){
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            }
          })
        }
      }
    })
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // http:require('../com/http.js'),//全局注册
    // regeneratorRuntime:require('../utils/regenerator-runtime/runtime.js')
  }
})