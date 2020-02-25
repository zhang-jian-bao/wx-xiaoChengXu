// pages/dingDan/dingDan.js
var http=require('../../../com/http.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    show:false,
    list:[],
    list_one:{},
    height:100+'%'
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
  //点击资金明细
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
    that=this;
    //接受点击代发货传递过来的参数
    let num=options.num;
    this.setData({
      num:num
    })
   
  
  },
  // onPageScroll(e) {
  //   console.log(e);
  //   wx.getSystemInfo({
  //     success(res) {
  //       console.log(res.windowHeight);
  //       var a = res.windowHeight;
  //       var b=100;
  //       that.setData({
  //         //获取当前实时高度-->如果大于当前的页面，高度auto，小于的话，就减去
  //         //上面的高度。得出当前的高度
  //         height: e.scrollTop > res.windowHeight-40?
  //           res.windowHeight+100+'%' : res.windowHeight - 40 + 'px'
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.dingList();
  },
  async dingList(){
    var list = await http.ding_list({
      token:wx.getStorageSync('token')
    });
    console.log(list);
    if(list.data.code==0){
      this.setData({
        list: list.data.data.orderList,
        list_one: list.data.data.goodsMap,
        height: (list.data.data.orderList.length)*46
      })
    }
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