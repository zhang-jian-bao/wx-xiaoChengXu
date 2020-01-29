// pages/xiangQin/xiangQin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pingTuan: false,
    kanJia:false,
    list:[],
    flg:false,
    flg_one:false,
    flg_two:false,
    flg_three:false,
    flg_four:false,
    show:false,
    name:"",
    hai:false,
    shop:false,
    shu:1,
    background:'disable',
    bg:"gray",
    num:null,
    num_one:null,
    text:'',
    text_one:'',
    shop_one:false
  },
  //点击立即购买
  mai:function(e){
    if (this.data.text == "" || this.data.text_one == "") {
      wx.showToast({
        title: '请选择规格',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.setStorage({
        key: 'key',
        data: {
          list: this.data.list,
          text: this.data.text,
          text_one: this.data.text_one,
          shu: this.data.shu
        },
      })
      wx.navigateTo({
        url: '/pages/queRenDingDan/queRenDingDan',
      })
    }
  },
  //点击加入购物车
  jiaRu:function(e){
    if(this.data.text==""||this.data.text_one==""){
      wx.showToast({
        title: '请选择规格',
        icon: 'none',
        duration: 1500
      })
    }else{
      wx.showToast({
        title: '加入购物车！', // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 1500  // 提示窗停留时间，默认1500ms
      });
      this.setData({
        shop:false
      })
      wx.setStorage({
        key: 'key',
        data: {
          list:this.data.list,
          text:this.data.text,
          text_one:this.data.text_one,
          shu:this.data.shu
        },
      })
    }
  },
  //点击花色
  check: function (e) {
    let that = this;
    console.log(e);
    let text = e.target.dataset.text
      this.setData({
        num: e.target.dataset.current,
        text:text
      })

  },
  check_one: function (e) {
    let that = this;
    let text = e.target.dataset.text_one
      this.setData({
        num_one: e.target.dataset.current,
        text_one: text
      })
    
  },
  //点击隐藏购物车
  hidd:function(e){
    this.setData({
      shop: false,
      shop_one:false
    })
  },
  //点击input框输入数字
  huo:function(e){
    console.log(e);
    var num = e.detail.value;
    let background = num > 1 ? 'normal' : 'disable';
    this.setData({
      shu: num,
      background: background
    })
  },
  //点击减-
  jian:function(e){
    let num=this.data.shu;
    if(num>1){
      num--
    }
    let background=num>1?'normal':'disable'
    this.setData({
      shu:num,
      background: background
    })
  },
  //点击加
  jia:function(e){
    let num = this.data.shu;
    num++;
    let background = num > 1 ? 'normal' : 'disable'
    this.setData({
      shu:num,
      background: background
    })
  },
  //点击立即购买显示页面
  gou_one:function(e){
    this.setData({
      shop_one:!this.data.shop_one
    })
  },
  //点击选择颜色、加入购物车
  gou:function(e){
    this.setData({
      shop:!this.data.shop,
      num:null,
      num_one:null
    })
  },
  //点击购物车
  shop:function(e){
    wx.navigateTo({
      url: '/pages/shop/shop',
    })
  },
  //点击关闭海报
  hai_bi:function(e){
    this.setData({
      hai:false
    })
  },
  //点击生成海报
  hai:function(e){
    this.setData({
      hai:!this.data.hai
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
    //获取点击商品传递过来的id的值
    let name=options.name;
    let that=this;
    wx.request({
      url: 'https://api.it120.cc/Andydd/shop/goods/list',
      data:{
        nameLike:name
      },
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      success:function(res){
        console.log(res);
        that.setData({
          list:res.data.data
        })
      }
    });
    if (name == "罗马仕") {
      that.setData({ flg: true ,pingTuan:true})
    } else if (name == "小米9") {
      that.setData({ flg_one: true })
    } else if (name == "电饭煲") {
      that.setData({ flg_two: true })
    } else if (name == "睡衣") {
      that.setData({ flg_three: true })
    } else if(name=="iPhone 8 Plus"){
      that.setData({ kanJia: true, flg: true })
    }else {
      that.setData({ flg_four: true, kanJia: false })
    }
    that.setData({
      name:name
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
      return {
        title: '天使童装',
        path: '/page/xiangQin/xiangQin?name='+this.data.name,
        desc:this.data.name,
        success: function (res) {
          console.log(res.shareTickets)
          // console.log
          wx.getShareInfo({
            shareTicket: res.shareTickets,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) }
          })
        },
        fail: function (res) {
          // 分享失败
          console.log(res)
        }
      }
    }
 
 
})