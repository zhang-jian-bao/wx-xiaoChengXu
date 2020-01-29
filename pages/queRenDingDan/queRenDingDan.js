// pages/queRenDingDan/queRenDingDan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {name:"kuaidi",value:"快递",checked:"true"},
      {name:"daodiaoziqu",value:"到店自取"}
    ],
    list:[],
    text:'',
    text_one:'',
    shu:''
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.getStorage({
      key: 'key',
      success: function(res) {
        console.log(res);
        that.setData({
          list:res.data.list,
          text:res.data.text,
          text_one:res.data.text_one,
          shu:res.data.shu
        })
      },
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