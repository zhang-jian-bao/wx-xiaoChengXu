// pages/shop/shop.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list_gui:[],
    isLength:false,
    num:null
  },
  //点击减
  jian(e){
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var key = e.currentTarget.dataset.key;
    var num = that.data.list[index].number;
    if(num>1){
      num--;
    }
    // that.setData({
    //   num: num
    // })
    that.sl(key, num);
  },
  //点击+
  jia(e){
    console.log(e);
    // var num=e.currentTarget.dataset.num;
    var index = e.currentTarget.dataset.index;
    var key = e.currentTarget.dataset.key;
    var num=that.data.list[index].number;
    num++;
    // that.setData({
    //   num:num
    // })
    that.sl(key,num);
  },
  sl(a,b){
    wx.request({
      url: 'https://api.it120.cc/zhangjianbao/shopping-cart/modifyNumber',
      method:"POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        key:a,
        number:b,
        token:wx.getStorageSync('token')
      },
      success(res){
        console.log(res);
        that.list();//再次渲染到页面中
      }
    })
  },
  //点击删除按钮，删除当前数据
  del(e){
    console.log(e);
    var index=e.currentTarget.dataset.key;
    wx.request({
      url: 'https://api.it120.cc/zhangjianbao/shopping-cart/remove',
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        key:[ index],
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res);
        that.list();
      }
    })
  },
  //点击跳转到首页
  index(e){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    // that.list();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  list(){
    wx.request({
      url: 'https://api.it120.cc/zhangjianbao/shopping-cart/info',
      method: 'GET',
      data: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            list: res.data.data.items,
            list_gui: res.data.data.items.sku,
            isLength: true,
            num: res.data.data.items.number
          })
        }else if(res.data.code==700){
          that.setData({
            list: [],//当删除最后一天数据，让list数组为空，就没有数据渲染了
            isLength:false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // that = this;
    that.list();
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