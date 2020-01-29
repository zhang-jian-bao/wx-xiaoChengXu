// pages/linJuan/linJuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    show:false,
    list:[
      {name:"一人一份",price:1,text:"满0元使用",text_one:"领取7天内有效"},
      {name:"新店优惠",price: 40,text: "满3000元使用",text_one: "领取15天内有效" },
      {name:"新店优惠",price: 25,text: "满2000元使用",text_one: "领取15天内有效" },
    ],
    list_con:[
      { name: "一人一份", price: 1, text: "满0元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 40, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 1, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 1, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 1, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 40, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 1, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 1, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 1, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 40, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 1, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 1, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" },
      { name: "新店优惠", price: 1, text: "满3000元使用", text_one: "2020-02-02 00:00:00 到期" }
    ]
  },
  //点击首页跳转
  index: function (e) {
    wx.switchTab({//跳转到某个页面
      url: '/pages/index/index',
    })
  },
  //点击分类跳转
  fen: function (e) {
    wx.switchTab({
      url: '/pages/fen/fen',
    })
  },
  //点击购物车跳转
  shop: function (e) {
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  },
  //点击我的跳转
  my: function (e) {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  //点击导航，显示或隐藏
  show: function (e) {
    this.setData({
      show: !this.data.show
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({//将num的值绑定到下标。根据下标切换
      num: e.detail.current
    })
  },
  //点击可领劵
  check: function (e) {
    let that = this;

    if (that.data.num === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        num: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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