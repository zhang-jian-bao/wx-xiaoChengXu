// pages/shouHuoAddress/shouHuoAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    userName:'',
    telNumber:'',
    address:'',
    list:[]
  },
  //点击编辑进入添加地址页面
  page(){
    wx.navigateTo({
      url: '/pages/xinZengAddress/xinZengAddress?userName='+this.data.userName+'&telNumber'+this.data.telNumber+'&address'+this.data.address,
    })
  },
  //点击返回上一页
  black(e){
    wx.navigateBack({})
  },
  //点击新增收货地址，跳转编辑地址页面
  xinZengAddress(e){
    wx.navigateTo({
      url: '/pages/xinZengAddress/xinZengAddress',
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    // wx.getStorage({
    //   key: 'address',
    //   success: function(res) {
    //     console.log(res)
    //     that.setData({
    //       list:res.data.list
    //     })
    //   },
    // })
    wx.getStorage({
      key: 'address',
      success: function(res) {
        console.log(res);
        that.setData({
          list: res.data
        })
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