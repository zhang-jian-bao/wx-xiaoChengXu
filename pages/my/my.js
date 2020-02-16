// pages/my/my.js
var _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    encry: '',
    iv: '',
    user: "",
    openid: '',
    token: '',
    uis: '',
    userInfo:'',
    isLog:false,
    isHide_one:false
  },
  //退出登录
  tui(){
    // wx.request({
    //   url: 'https://api.it120.cc/zhangjianbao/user/loginout',
    //   data:{
    //     token:wx.getStorageSync('token');
    //   },
    //   success(res){
    //     console.log(res);
    //     wx.navigateTo({
    //       url: '/pages/start/start',
    //     })
    //   }
    // })
    wx.clearStorageSync('token');
    wx.clearStorageSync('userInfo');
    wx.clearStorageSync('openid');
    wx.clearStorageSync('uid');
    wx.navigateTo({
          url: '/pages/start/start',
        })
  },
  aa(e) {
    console.log(e)
    if (!e.detail.iv) {
      wx.showLoading({
        title: '取消登录',
      })
      setTimeout(function () {
        wx.hideLoading();
      }, 500)
    } else {
     
      console.log(e.detail.userInfo)
      wx.setStorageSync('userInfo', e.detail.userInfo)
      _self.setData({
        encry: e.detail.encryptedData,
        iv: e.detail.iv,
        userInfo:e.detail.userInfo,
        isLog:true
      })
      _self.myLogin();

    }

  },
  // 获取用户信息后登陆
  myLogin() {
    wx.login({
      success(res) {
        console.log(res.code)
        wx.request({
          url: 'https://api.it120.cc/zhangjianbao/user/wxapp/login',
          data: {
            code: res.code
          },
          success(res) {
            console.log(res)
            if (res.data.code == 10000) {
              //  去注册
              _self.register();
              return false;
            } else if (res.data.code == 0) {
              wx.setStorageSync('openid', res.data.data.openid)
              wx.setStorageSync('token', res.data.data.token)
              wx.setStorageSync('uid', res.data.data.uid)
              wx.showLoading({
                title: '授权成功',
              })
              setTimeout(function () {
                wx.hideLoading();
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }, 500)
              _self.setData({
                isHide:true
              })
            }
          }
        })
      }
    })
  },
  // 注册
  register() {
    wx.login({
      success(res) {
        console.log(res.code)
        console.log(_self.data.encry)
        console.log(_self.data.iv);
        // 注册接口
        wx.request({
          url: 'https://api.it120.cc/zhangjianbao/user/wxapp/register/complex',
          data: {
            code: res.code,
            encryptedData: _self.data.encry,
            iv: _self.data.iv,
          },
          success(res) {
            console.log(res)
            _self.myLogin()
          }
        })
      }
    })
  },
  //点击收货地址，跳转
  shouHuo(e){
    wx.navigateTo({
      url: '/backpageD/pages/shouHuoAddress/shouHuoAddress',
    })
  },
  //点击暂不登录
  stop:function(e){
    wx.switchTab({
      url: '/pages/index/index',
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
      url: "/backpageC/pages/linJuan/linJuan",
    })
  },
  //点击积分兑换
  jiFenDuiHuan:function(e){
    wx.navigateTo({
      url: "/backpageC/pages/jiFenDuiHuan/jiFenDuiHuan",
    })
  },
  //点击每日签到
  qianDao:function(e){
    wx.navigateTo({
      url: '/backpageC/pages/qianDao/qianDao',
    })
  },
  //点击优惠买单
  you:function(e){
    wx.navigateTo({
      url: '/backpageC/pages/youHui/youHui',
    })
  },
  //点击开票记录
  faPiaoJiLu:function(e){
    wx.navigateTo({
      url:"/backpageC/pages/faPiaoJiLu/faPiaoJiLu",
    })
  },
  //点击发票申请
  faPiao:function(e){
    wx.navigateTo({
      url: '/backpageB/pages/faPiao/faPiao',
    })
  },
  //点击分销商跳转
  fenXiaoShang:function(e){
    wx.navigateTo({
      url: '/backpageB/pages/fenXiaoShang/fenXiaoShang',
    })
  },
  //点击退款/售后
  kuan:function(e){
    wx.navigateTo({
      url: '/backpageB/pages/tui/tui',
    })
  },
  //点击待评价
  ping:function(e){
    wx.navigateTo({
      url: '/backpageA/pages/dingDan/dingDan?num=3',
    })
  },
  //点击待收货
  shou:function(e){
    wx.navigateTo({
      url: '/backpageA/pages/dingDan/dingDan?num=2',
    })
  },
  //点击代发货
  fa:function(e){
    let num=1;
    wx.navigateTo({
      url: '/backpageA/pages/dingDan/dingDan?num=1',
    })
  },
  //点击我的订单和待付款
  ding:function(e){
    wx.navigateTo({
      url: '/backpageA/pages/dingDan/dingDan',
    })
  },
  //点击积分
  jiFen:function(e){
  wx.navigateTo({
    url: '/backpageA/pages/jiFen/jiFen',
  })
  },
  // 点击余额
  yu:function(e){
    wx.navigateTo({
      url: '/backpageA/pages/zi/zi',
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
  yunXu(){//允许
    var userInfo = wx.getStorageSync('userInfo');
    _self.setData({
      isLog: true,
      userInfo: userInfo,
      isHide: true
    })
  },
  onLoad: function (options) {
    _self = this;
    var token = wx.getStorageSync('token');
    var userInfo = wx.getStorageSync('userInfo');     
         if(!token){
           wx.showToast({
             title: '请先登录',
           })
         }else{
           _self.setData({
             isLog: true,
             userInfo: userInfo,
             isHide:true
           })
         }
    // wx.showModal({
    //   title: '提示',
    //   content: '是否需要登录微信',
    //   success(res) {
    //     if (res.confirm) {
    //       var token = wx.getStorageSync('token');
    //       var userInfo = wx.getStorageSync('userInfo')
    //       _self.setData({
    //         isLog: true,
    //         userInfo: userInfo
    //       })
    //     } else if (res.cancel) {
    //       _self.setData({
    //         isLog: false
    //       })
    //     }
    //   }
    // })
 
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