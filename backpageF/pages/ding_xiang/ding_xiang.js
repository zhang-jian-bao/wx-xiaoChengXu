// backpageF/pages/ding_xiang/ding_xiang.js
var that;
var http=require('../../../com/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//数据列表
    list_address:{}//默认地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
      var id=options.id;
      var num=options.num;
      that.xiang(id);
  },
  //订单详情
  async xiang(a){
    var aa=await http.ding_xiang({
      id:a,
      token:wx.getStorageSync('token')
    })
    console.log(aa);
    if(aa.data.code==0){
      that.setData({
        list:aa.data.data.goods
      })
    }
  },
  //获取默认地址接口
  mo_address() {
    wx.request({
      url: 'https://api.it120.cc/zhangjianbao/user/shipping-address/default/v2',
      method: 'GET',
      data: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            list_address: res.data.data.info
          })
        }
      }
    })
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
    that.mo_address();
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