// pages/xiangQin/xiangQin.js
var that;
const http=require('../../../com/http.js');
// const regeneratorRuntime=require('../../../utils/regenerator-runtime/runtime.js');
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
    good_id:'',
    cid:''
  },
  //点击立即购买
  async mai(e){

    var arr = that.data.list_one;

    if (arr) {
      var num = [];

      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].childsCurGoods.length; j++) {

          if (arr[i].childsCurGoods[j].active == true) {
         
            num.push(arr[i].childsCurGoods[j])
          }
        }


      }

      //判断  定义存储  当前选中的数组  跟原规格的数组长度是否相等   不相等提示和return  退出  
      if (num.length != arr.length) {
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          duration: 2000
        })

        return
      }
      var a = JSON.stringify(num);
      wx.navigateTo({
        url: '/backpageD/pages/queRenDingDan/queRenDingDan?id=' + that.data.cid + '&a=' + a + '&shu=' + that.data.shu
      })
      //加入购物车的接口
        that.setData({
          shop: false
        })
    } else {
        that.setData({
          shop: false
        })
      wx.navigateTo({
        url: '/backpageD/pages/queRenDingDan/queRenDingDan?id=' + that.data.cid+'&shu='+that.data.shu
      })
    }
   
   
  },
  //点击选择规格
  yanse(e){
    console.log(e);
    var id=e.currentTarget.id;
    var index=e.currentTarget.dataset.index;
    var fid = e.currentTarget.dataset.fid;
    var arr=that.data.list_one;
    //通过id找到对应的下标
    var i=arr.findIndex((v)=>{
      return v.id==fid;
    })
    arr[i].childsCurGoods.forEach((v)=>{
     if(v.id==id){
       if (v.active) {
         v.active = false;
       } else {
         v.active = true;
       }
     }else{
       v.active = false;
     }
    })
    console.log(arr);
    that.setData({
      list_one:arr
    })
  } ,
   //点击加入购物车
  async jiaRu(e){
    var arr=that.data.list_one;

    if(arr){
      var num = [];
      var str='';
      for(var i=0;i<arr.length;i++){
        for (var j = 0; j < arr[i].childsCurGoods.length;j++){

          if (arr[i].childsCurGoods[j].active == true) {
            var obj = { 'optionId': arr[i].childsCurGoods[j].propertyId, 'optionValueId': arr[i].childsCurGoods[j].id };
            num.push(obj);
            str += arr[i].childsCurGoods[j].propertyId + ':' + arr[i].childsCurGoods[j].id + ','
          }
        }
        
      
      }
    
      //判断  定义存储  当前选中的数组  跟原规格的数组长度是否相等   不相等提示和return  退出  
      // console.log(arr.length);
      // console.log(num.length)
      if (num.length != arr.length) {
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          duration: 2000
        })

        return
      }
  
        //加入购物车的接口
      var add=await http.add({
        goodsId: that.data.shopId,
        number: that.data.shu,
        sku: JSON.stringify(num),
        token: wx.getStorageSync('token')
      });
      console.log(add);
      if (add.data.code == 0) {
             wx.showToast({
               title: '加入购物车！', // 标题
               icon: 'success',  // 图标类型，默认success
               duration: 1500  // 提示窗停留时间，默认1500ms
             });
             that.setData({
               shop: false
             })
           }
    
        // // 获取价格的接口
        var price=await http.price({
              goodsId: that.data.shopId,
              propertyChildIds:str
        })
        console.log(price);
      if (price.data.code == 0) {
          
              console.log('获取价格成功')
            }
    }else{

      //加入购物车的接口
      var add = await http.add({
        goodsId: that.data.shopId,
        number: that.data.shu,
        token: wx.getStorageSync('token')
      });
      console.log(add);
      if (add.data.code == 0) {
        wx.showToast({
          title: '加入购物车！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        });
        that.setData({
          shop: false
        })
      }

      // // 获取价格的接口
      var price = await http.price({
        goodsId: that.data.shopId
      })
      console.log(price);
      if (price.data.code == 0) {

        console.log('获取价格成功')
      }
    }  
    
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
        // 给里面加一个active属性来判断
        for(var i=0;i<res.data.data.length;i++){
          res.data.data[i].childsCurGoods.forEach((v)=>{
             v.active=false;
          })
        }
         that.setData({
           good_id: res.data.data.basicInfo.id,
           shopId:id,
           list: res.data.data.basicInfo,
           list_one: res.data.data.properties,
           cid:id
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