// pages/login/login.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iv:'',
    encryptedData:''
  },
  aa(e){
    console.log(e);
    if (e.detail.iv==""){
      console.log("用户拒绝授权");
      wx.showToast({
        title: '登陆失败',
      });
      wx.navigateBack({});//返回上一页
      return false;
    }else {
        that.setData({
          iv:e.detail.iv,
          encryptedData: e.detail.encryptedData,
        });
          wx.setStorageSync('userInfo',e.detail.userInfo);
          this.login();
    }
  },
  login(){//登录
    wx.login({
      success(res){
        console.log(res);
        wx.request({
          url: 'https://api.it120.cc/zhangjianbao/user/wxapp/login',
          data:{
            code:res.code
          },
          success(res1){
            console.log(res1);
            if(res1.data.code==10000){
              this.zhuCe();
              return false;
            }else if(res1.data.code==0){
              wx.setStorageSync('uid',res1.data.data.uid);
              wx.setStorageSync('openid', res1.data.data.openid);
              wx.setStorageSync('token', res1.data.data.token);
              wx.showToast({
                title: '登录成功',
                icon:"success"
              })
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          }
        })
      }
    })
  },
  zhuCe(){
    wx.login({
      success(res){
        wx.request({
          url: 'https://api.it120.cc/zhangjianbao/user/wxapp/register/complex',
          data:{
            iv:that.data.iv,
            encryptedData: that.data.encryptedData,
            code:res.code
          },
          success(res1){
            console.log(res1);
            console.log("注册成功");
            this.login();//在调用登录接口，登录页面
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that=this;
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