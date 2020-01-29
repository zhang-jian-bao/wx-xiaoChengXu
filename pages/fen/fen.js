// pages/fen/fen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list_one:[],
    searchValue: "",
    num:0,
    shop:false
  },
  //点击右侧的商品，进入商品详情页
  right:function(e){
    let name = e.currentTarget.dataset.item.name;
    wx.navigateTo({
      url: '/pages/xiangQin/xiangQin?name='+name,
    })
  },
  //点击左侧导航栏
  dianJi:function(e){
    console.log(e);
    let that=this;
    let index = e.currentTarget.dataset.index;
    let name = e.currentTarget.dataset.item.name;
    wx.request({
      url: 'https://api.it120.cc/Andydd/shop/goods/list',
      data: {
        nameLike: name
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if(res.data.code==0){
          that.setData({
            num: index,
            list_one: res.data.data,
            shop:true
          })
        }else{
          that.setData({
            num: index,
            list_one: res.data.data,
            shop:false
          })
        }
       
      }
    });
  },
  //搜索框的数据
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },
  //点击回车，跳转到商品列表页面，并把input的value的值传递过去
  huiChe: function (e) {
    let that = this;
    let keyWord = JSON.stringify(this.data.keyWord);
    wx.navigateTo({//路由传参
      url: '/pages/shangPin/shangPin?value=' + this.data.searchValue,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this;
      wx.request({
        url: 'https://api.it120.cc/Andydd/shop/goods/category/all',
        success:function(res){
          console.log(res);
          _this.setData({list:res.data.data})
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