// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false

  },
  //点击暂不登录
  stop:function(e){
    this.setData({
      isHide:false
    })
  },
  //点击授权登录，隐藏/显示模态框
  login:function(e){
    this.setData({
      isHide: !this.data.isHide
    })
  },
  //点击关于我们
  guanYu:function(e){
    wx.showModal({
      title: '关于我们',
      content: '本系统基于开源小程序商城系统https://github.com/EastWorld/wechat-app-mall搭建，祝大家使用愉快',
      confirmText:"确定",
      showCancel:false
    })
  },
  //点击领劵中心
  linJuan:function(e){
    wx.navigateTo({
      url: "/pages/linJuan/linJuan",
    })
  },
  //点击积分兑换
  jiFenDuiHuan:function(e){
    wx.navigateTo({
      url: "/pages/jiFenDuiHuan/jiFenDuiHuan",
    })
  },
  //点击每日签到
  qianDao:function(e){
    wx.navigateTo({
      url: '/pages/qianDao/qianDao',
    })
  },
  //点击优惠买单
  you:function(e){
    wx.navigateTo({
      url: '/pages/youHui/youHui',
    })
  },
  //点击开票记录
  faPiaoJiLu:function(e){
    wx.navigateTo({
      url:"/pages/faPiaoJiLu/faPiaoJiLu",
    })
  },
  //点击发票申请
  faPiao:function(e){
    wx.navigateTo({
      url: '/pages/faPiao/faPiao',
    })
  },
  //点击分销商跳转
  fenXiaoShang:function(e){
    wx.navigateTo({
      url: '/pages/fenXiaoShang/fenXiaoShang',
    })
  },
  //点击退款/售后
  kuan:function(e){
    wx.navigateTo({
      url: '/pages/tui/tui',
    })
  },
  //点击待评价
  ping:function(e){
    wx.navigateTo({
      url: '/pages/dingDan/dingDan?num=3',
    })
  },
  //点击待收货
  shou:function(e){
    wx.navigateTo({
      url: '/pages/dingDan/dingDan?num=2',
    })
  },
  //点击代发货
  fa:function(e){
    let num=1;
    wx.navigateTo({
      url: '/pages/dingDan/dingDan?num=1',
    })
  },
  //点击我的订单和待付款
  ding:function(e){
    wx.navigateTo({
      url: '/pages/dingDan/dingDan',
    })
  },
  //点击积分
  jiFen:function(e){
  wx.navigateTo({
    url: '/pages/jiFen/jiFen',
  })
  },
  // 点击余额
  yu:function(e){
    wx.navigateTo({
      url: '/pages/zi/zi',
    })
  },
  //授权登录
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  // wx.request({
                  //     // 自行补上自己的 APPID 和 SECRET
                  //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                  //     success: res => {
                  //         // 获取到用户的 openid
                  //         console.log("用户的openid:" + res.data.openid);
                  //     }
                  // });
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})