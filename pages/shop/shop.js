// pages/shop/shop.js
var that;
const http=require('../../com/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list_gui:[],
    isLength:false,
    num:null,
    startX:0,
    index:'',
    sj:''
  },
  tu_one(e){//点击多选框图片，显示空白
    if (this.data.list[e.currentTarget.dataset.index].active) {
      this.data.list[e.currentTarget.dataset.index].active = false;
    } else {
      this.data.list[e.currentTarget.dataset.index].active = true;
    }
    this.setData({
      list: this.data.list
    })
  },
  tu(e){//点击多选框,显示图片
  console.log(e);
  console.log(this.data.list)
    if (this.data.list[e.currentTarget.dataset.index].active){
      this.data.list[e.currentTarget.dataset.index].active=false;
    }else{
      this.data.list[e.currentTarget.dataset.index].active=true;
    }
    this.setData({
      list:this.data.list
    })
    this.data.sj = this.data.list[e.currentTarget.dataset.index];
  },
  sub(){//点击结算
  var num=[];
    this.data.list.forEach(v=>{
      if(v.active){
        num.push(this.data.sj);
        wx.setStorageSync('sj', num);
        wx.navigateTo({
          url: '/backpageD/pages/queRenDingDan/queRenDingDan',
        })
      }
    })
  },
  s(e){//移动开始
    console.log(e);
    this.data.index=e.currentTarget.dataset.index;//下标
    this.data.startX=e.touches[0].clientX;//x坐标
  },
  m(e){//移动过程
    console.log(e);
    var move = e.touches[0].clientX;//移动坐标
    var a=this.data.startX-move;
    console.log(a);
    if(a>0){//向左滑动
    this.data.list[this.data.index].left=-a;
        if(a>180){
          this.data.list[this.data.index].left = -180;
        }
    }
    this.setData({
      list:this.data.list
    })
  },
  e(e){//移动结束
    console.log(e);
    var end = e.changedTouches[0].clientX;//结束X坐标
    var b=this.data.startX-end;
    if(b>60){
      this.data.list[this.data.index].left = -180;
    }else{
      this.data.list[this.data.index].left = 0;
    }
    this.setData({
      list: this.data.list
    })
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
  async sl(a,b){
    var sl = await http.modifyNumber({
      key: a,
      number: b,
      token: wx.getStorageSync('token')
    })
    console.log(sl);
    if(sl.data.code==0){
      that.list();//再次渲染到页面中
    }
    // wx.request({
    //   url: 'https://api.it120.cc/zhangjianbao/shopping-cart/modifyNumber',
    //   method:"POST",
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   data:{
    //     key:a,
    //     number:b,
    //     token:wx.getStorageSync('token')
    //   },
    //   success(res){
    //     console.log(res);
    //     that.list();//再次渲染到页面中
    //   }
    // })
  },
  //点击删除按钮，删除当前数据
  async del(e){
    console.log(e);
    var index=e.currentTarget.dataset.key;
    var delate=await http.remove({
      key: [index],
      token: wx.getStorageSync('token')
    })
    console.log(delate);
    if(delate.data.code==0){
      that.list();
    }
    // wx.request({
    //   url: 'https://api.it120.cc/zhangjianbao/shopping-cart/remove',
    //   method: 'POST',
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   data: {
    //     key:[ index],
    //     token: wx.getStorageSync('token')
    //   },
    //   success(res) {
    //     console.log(res);
    //     that.list();
    //   }
    // })
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
  async list(){
    var info=await http.info({
      token: wx.getStorageSync('token')
    });
    console.log(info);
    if (info.data.code == 0) {
      info.data.data.items.forEach(v=>{
        v.active=false;//给数据里加一个变量，判断多选框状态
      })
      that.setData({
        list: info.data.data.items,
        list_gui: info.data.data.items.sku,
        isLength: true,
        num: info.data.data.items.number
      })
    } else if (info.data.code == 700) {
      that.setData({
        list: [],//当删除最后一天数据，让list数组为空，就没有数据渲染了
        isLength: false
      })
    }
    // wx.request({
    //   url: 'https://api.it120.cc/zhangjianbao/shopping-cart/info',
    //   method: 'GET',
    //   data: {
    //     token: wx.getStorageSync('token')
    //   },
    //   success(res) {
    //     console.log(res);
    //     if (res.data.code == 0) {
    //       that.setData({
    //         list: res.data.data.items,
    //         list_gui: res.data.data.items.sku,
    //         isLength: true,
    //         num: res.data.data.items.number
    //       })
    //     }else if(res.data.code==700){
    //       that.setData({
    //         list: [],//当删除最后一天数据，让list数组为空，就没有数据渲染了
    //         isLength:false
    //       })
    //     }
    //   }
    // })
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