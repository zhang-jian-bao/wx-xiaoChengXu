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
  //点击待付款跳转到订单详情
  dingXiang(){
    var id='',num='';
    this.data.list.forEach(v=>{
      id=v.id;
      num = v.orderNumber;
    })
    wx.navigateTo({
      url: '/backpageF/pages/ding_xiang/ding_xiang?id='+id,
    })
  },
  //取消订单
  async quXiao(){
    var id='';
    that.data.list.forEach(v=>{
       id= v.id;
    })
    console.log(id);
    var a = await http.delate_ding({
      orderId:id,
      token:wx.getStorageSync('token')
    })
    if(a.data.code==0){
      this.dingList();//调用，重新页面渲染
    }
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
    this.dingList(e.target.dataset.current);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    //接受点击代发货传递过来的参数
    // let num=options.num;
    // this.setData({
    //   num:num
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
    this.dingList(0);
  },
  async dingList(a){
    var list = await http.ding_list({
      token:wx.getStorageSync('token'),
      status:a
    });
    console.log(list);
    if(list.data.code==0){
      var a = ''
      list.data.data.orderList.forEach(v => {
        a = v.status
      })
      //当几分钟后，未支付，自动删除订单
      //有点问题，要点击一下取消订单才可以
      if (a != 0) {
        that.quXiao();
        this.setData({
          list: list.data.data.orderList,
          list_one: list.data.data.goodsMap,
          height: 100
        })
      }
      this.setData({
        list: list.data.data.orderList,
        list_one: list.data.data.goodsMap,
        height: (list.data.data.orderList.length)*46
      })
    } else if (list.data.code == 700) {
      this.setData({
        list: [],
        list_one: [],
        height:100
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