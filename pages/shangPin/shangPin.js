// pages/shangPin/shangPin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Flag:true,
    keyWord:[],
    inputValue:"",
    num:0,
    show_one: false,
    show: false,
    list:[],
    list_one:[]
  },
  //点击商品，跳转到上商品详情页
  gou:function(e){
    console.log(e);
    let name = e.currentTarget.dataset.aa.name;
    wx.navigateTo({
      url: '/pages/xiangQin/xiangQin?name='+name,
    })
  },
  //搜索框的数据
  inputValue: function (e) {
    var value = e.detail.value;
    this.setData({
      inputValue: value,
    });
  },
  //回车搜索
  sou:function(e){
    let that = this;
    wx.request({
      url: 'https://api.it120.cc/Andydd/shop/goods/list',
      data: {
        nameLike: this.data.inputValue
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          keyWord: res.data.data
        })
      }
    });
    //点击价格有低到高
    wx.request({
      url: 'https://api.it120.cc/Andydd/shop/goods/list',
      data: {
        nameLike: this.data.inputValue
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        let aa = res.data.data.sort(function (a, b) {
          return a.minPrice - b.minPrice
        })
        that.setData({
          list_one: aa
        })
      }
    });
    //点击销量多到少
    wx.request({
      url: 'https://api.it120.cc/Andydd/shop/goods/list',
      data: {
        nameLike: this.data.inputValue
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        let aa = res.data.data.sort(function (a, b) {
          return b.pingtuanPrice - a.pingtuanPrice
        })
        that.setData({
          list_two: aa
        })
      }
    });
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
  //点击搜索框，右边的图标
  tuBiao:function(e){
    let that=this;
    that.setData({
      show_one:!this.data.show_one
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;//改变this的指向
    //接受index传递过来的input的value值
    // let keyWord = JSON.parse(options.keyWord);
    // console.log(keyWord);
    let inputValue=options.value;
    let id=options.id;
    wx.request({
      url: 'https://api.it120.cc/Andydd/shop/goods/list',
      data: {
        nameLike: inputValue
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          keyWord: res.data.data
        })
      }
    });
    wx.request({
      url: 'https://api.it120.cc/Andydd/shop/goods/list',
      data: {
        nameLike: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          keyWord: res.data.data
        })
      }
    });
    that.setData({
      inputValue:inputValue
    });
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