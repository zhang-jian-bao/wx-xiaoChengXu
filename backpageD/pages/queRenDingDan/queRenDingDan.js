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
    shu:'',
    show:false,
    radioShow:false,
    address:"",
    userName:'',
    telNumber:"",
    address_show:false,
    arr:[]
  },
  //点击收货地址，跳转到编辑地址界面
  shouHuo(e){
    wx.navigateTo({
      url: '/pages/shouHuoAddress/shouHuoAddress',
    })
  },
  //点击添加收货地址
  add:function(e){
    wx.navigateTo({
      url: "/pages/xinZengAddress/xinZengAddress",
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
  //radio点击事件
  radioChange: function (e) {
    this.setData({
      radioShow: !this.data.radioShow
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    //获取本地的商品数据
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
    });
    // 获取添加到本地的地址
    wx.getStorage({
      key: 'address',
      success: function(res) {
        console.log(res);
        that.setData({
          arr:res.data,
          address_show:true
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