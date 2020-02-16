// pages/xiangQin/xiangQin.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pingTuan: false,
    kanJia:false,
    list:{},
    list_one:[],
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
    num_two:null,
    text:'',
    text_one:'',
    shop_one:false,
    arr:'',
    arr_one:'',
    arr_two:'',
    index:'',
    index_one:'',
    index_two:'',
    shopId:'',
    good_id:''
  },
  //点击立即购买
  mai:function(e){
    if (that.data.arr == "" || that.data.arr_one == "" || that.data.arr_two == "") {
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
        url: '/backpageD/pages/queRenDingDan/queRenDingDan',
      })
    }
  },
  //点击规格
  guiGe(e) {
    console.log(e);
    // var arr = [];
    var id = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    // that.data.num_two=index;
    // arr.push(id);
    this.setData({ arr_two: id, index_two: index ,num_two:index})
    console.log(index);
    console.log(id);
  },
  //点击尺寸
  chiCun(e){
    console.log(e);
    var id = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    // that.data.num_one = index;
    this.setData({ arr_one: id, index_one: index, num_one: index})
    console.log(index);
    console.log(id);
  },
  //点击选择规格
  yanse(e){
    console.log(e);
    var id=e.currentTarget.id;
    var index=e.currentTarget.dataset.index;
    // that.data.num= index;

    this.setData({ arr: id, index: index, num: index})
    console.log(index);
    console.log(id);
  } ,
   //点击加入购物车
  jiaRu:function(e){
    if(that.data.list_one!=undefined){
      if (that.data.arr == "" || that.data.arr_one == "" || that.data.arr_two == "") {
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          duration: 1500
        })
      } else {
        wx.request({
          url: 'https://api.it120.cc/zhangjianbao/shopping-cart/add',
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            goodsId: that.data.shopId,
            number: that.data.shu,
            sku: JSON.stringify(
              [
                { "optionId": '24003', "optionValueId": that.data.arr },
                { "optionId": '24004', "optionValueId": that.data.arr_one },
                { "optionId": '24006', "optionValueId": that.data.arr_two }
              ]
            ),
            token: wx.getStorageSync('token')
          },
          success(res) {
            console.log(res);
          }
        })
        // }
        wx.showToast({
          title: '加入购物车！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        });
        this.setData({
          shop: false
        })


      }
    } else{
 wx.request({
        url: 'https://api.it120.cc/zhangjianbao/shopping-cart/add',
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          goodsId: that.data.shopId,
          number: that.data.shu,
          token: wx.getStorageSync('token')
        },
        success(res) {
          console.log(res);
          wx.showToast({
            title: '加入购物车！', // 标题
            icon: 'success',  // 图标类型，默认success
            duration: 1500  // 提示窗停留时间，默认1500ms
          });
          that.setData({
            shop: false
          })
        }
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
    that = this;
    //获取点击商品传递过来的id的值
    let id=options.id;
  
    wx.request({
      url: 'https://api.it120.cc/zhangjianbao/shop/goods/detail',
      data:{
        id:id,
        token:wx.getStorageSync('token')
      },
      success:function(res){
        console.log(res);
   
         that.setData({
           good_id: res.data.data.basicInfo.id,
           shopId:id,
           list: res.data.data.basicInfo,
           list_one: res.data.data.properties
         })
   
      }
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
      return {
        title: '天使童装',
        path: '/backpageF/page/xiangQin/xiangQin?name='+this.data.name,
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