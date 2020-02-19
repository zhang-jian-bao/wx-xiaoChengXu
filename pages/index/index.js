//index.js
//获取应用实例
var that;//申明全局this为that，在onload中写一下
const app = getApp()//全局
const http=require('../../com/http.js');//引入全局封装的http.js接口
Page({
    data: {
      page:1,
      sl:'上拉加载。。。',
      keyWord:[],
      searchValue:"",
      gao:"",
      arr:[],
      list: [],
      url:[],
      img: "../images/a_02.jpg",
      img1: "../images/a_05.jpg",
      indicatorDots: true,  //小点
      autoplay: true,  //是否自动轮播
    },
    //上拉加载

    //点击拼团，跳转商品详情页
    pingTuan:function(e){
      console.log(e);
      let a = e.currentTarget.dataset.ping.id;
      wx.navigateTo({
        url: '/backpageF/pages/xiangQin/xiangQin?id=' + a,
      })
    },
    //点击砍价，跳转商品详情页
    kan:function(e){
      console.log(e);
      let a = e.currentTarget.dataset.kan.id;
      wx.navigateTo({
        url: '/backpageF/pages/xiangQin/xiangQin?id='+a,
      })
    },
    //点击商品跳转到商品详情页
    xiangQin:function(e){
      console.log(e);
      let id = e.currentTarget.dataset.aa.id
      wx.navigateTo({
        url: "/backpageF/pages/xiangQin/xiangQin?id="+id,
      })
    },
    //搜索框的数据
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });  
  },
  //点击回车，跳转到商品列表页面，并把input的value的值传递过去
  huiChe:function(e){ 
    let that=this;
    let keyWord=JSON.stringify(this.data.keyWord);
     wx.navigateTo({//路由传参
       url: '/backpageE/pages/shangPin/shangPin?value='+that.data.searchValue,
    })
  },
    //点击固定定位礼物跳转领劵中心
    linJuan:function(e){
      wx.navigateTo({
        url: "/backpageC/pages/linJuan/linJuan",
      })
    },
    //点击公告
    gongGao:function(e){
      wx.navigateTo({
        url: "/backpageE/pages/gongGao/gongGao",
      })
    },
    //点击上装。。。跳转到商品列表
    shangPin:function(e){
      console.log(e);
      let id = e.currentTarget.dataset.item.id;
      console.log(id);
      let that = this;
      // let keyWord = JSON.stringify(this.data.keyWord);
      wx.navigateTo({
        url: '/backpageE/pages/shangPin/shangPin?id='+id,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async bb(){
      var aa = await http.shop_list();
      console.log(aa);
      this.setData({ list: aa.data.data })
    },
    onLoad: function (options) {
      let _this = this;//--->改变this的指向
      // 商品列表
      http.shop_list().then(res=>{
        console.log(res);
      })
     _this.bb();
      // wx.request({
      //   url: 'https://api.it120.cc/zhangjianbao/shop/goods/list',
      //   success: function (res) {
      //     console.log(res);
      //     _this.setData({ list: res.data.data })
      //   }
      // });
      // 轮播图数据
      wx.request({
        url: 'https://api.it120.cc/Andydd/banner/list',
        success:function(res){
          // console.log(res);
          _this.setData({
            url:res.data.data
          })
        }
      });
      //分类
      wx.request({
        url: 'https://api.it120.cc/Andydd/shop/goods/category/all',
        success:function(res){
          // console.log(res);
          _this.setData({
            arr:res.data.data
          })
        }
      });
      // 公告数据
      wx.request({
        url: 'https://api.it120.cc/Andydd/notice/list',
        success:function(res){
          // console.log(res);
          _this.setData({
            gao:res.data.data.dataList[0].title
          })
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
      that=this;
     
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
      that.setData({
        sl: '加载中。。。'
      });
      setTimeout(function () {
        wx.request({
          url: 'https://api.it120.cc/Andydd/shop/goods/list',
          data: {
            page: that.data.page,
            pageSize: 10
          },
          success(res) {
            console.log(res);
            if(res.data.code==0){
              wx.pageScrollTo({
                scrollTop: 1300
              })
              that.setData({
                list: res.data.data
              })
              that.setData({
                sl: '上拉加载。。。。'
              });
            }else if(res.data.code==700){
              that.setData({
                sl: '朕是有底线的~'
              });
              return false;
            }
            that.data.page++;
          }
        })
      }, 500)

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  

})
