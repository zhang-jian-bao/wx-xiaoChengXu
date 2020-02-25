// pages/shouHuoAddress/shouHuoAddress.js
var that;
const http=require('../../../com/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    userName:'',
    telNumber:'',
    address:'',
    list:[],//数据
    isMo:false,//默认状态
    aa:{}
  },
  
  // page(){
  //   wx.navigateTo({
  //     url: '/backpageD/pages/xinZengAddress/xinZengAddress?userName='+this.data.userName+'&telNumber'+this.data.telNumber+'&address'+this.data.address,
  //   })
  // },
//点击编辑进入添加地址页面
  black(e){
    console.log(e);
    var that=this;
      wx.navigateTo({
        url: '/backpageD/pages/xinZengAddress/xinZengAddress?id='+ 
        e.currentTarget.id,
      })
    // }else{
    //   console.log('错误')
    // }
  
  },
  //点击新增收货地址，跳转编辑地址页面
  xinZengAddress(e){
    wx.navigateTo({
      url: '/backpageD/pages/xinZengAddress/xinZengAddress',
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
 async mo(e){//设置默认地址
  console.log(e);
    var edit = await http.update({
      id: e.currentTarget.id,
      isDefault:true,
      token: wx.getStorageSync('token')
    });
    console.log(edit)
    if(edit.data.code==0){
      this.so()
    }
    // wx.request({
    //   url: 'https://api.it120.cc/zhangjianbao/user/shipping-address/default/v2',
    //   method: 'GET',
    //   data: {
    //     token: wx.getStorageSync('token')
    //   },
    //   success(res) {
    //     console.log(res);
    //     if (res.data.code == 0) {
    //       // res.data.data.info.isDefault = false;
    //       res.data.data.info.isDefault = true;
    //       that.setData({
    //         aa: res.data.data,
    //         // isMo: res.data.data.info.aa
    //       })
    //     }
    //   }
    // })
  },
  async so() { //获取所有的收货地址
    var list = await http.address_list({
      token: wx.getStorageSync('token')
    })
    console.log(list);
    if (list.data.code == 0) {
      that.setData({
        list: list.data.data
      })
    }
  },
  onLoad: function (options) {
     that=this;
    //获取所有的收货地址
     that.so();
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
    that.so();
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