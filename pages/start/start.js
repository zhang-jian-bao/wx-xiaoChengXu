// pages/start/start.js
var _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {}
  },
  go:function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
    console.log(111)
  },
  aa(){
    let userInfo = wx.getStorageSync('token')
    console.log(userInfo)
    if (!userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      _self.setData({
        user: userInfo
      })
      console.log(_self.data.user)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this;
    let Token = wx.getStorageSync('token')
    let _this = this;
    wx.request({
      url: 'https://api.it120.cc/zhangjianbao/user/detail',
      data: {
        token: Token
      },
      success: (res) => {
        console.log(res.data.data.base)
        _self.setData({
          data: res.data.data.base
        })
        console.log(_self.data.data)
      }
    })

  },
  onShow(){

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