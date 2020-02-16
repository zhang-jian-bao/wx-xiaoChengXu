// pages/xinZengAddress/xinZengAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    userName: " ",
    cityName: "",
    countyName: "",
    detailInfo: "",
    telNumber: "",
    address:'',
    list:[]
  },
  //点击保存
  baoCun(e){
    let that=this;
    var userName = this.data.userName;
    var mobile = this.data.telNumber;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var name = /^[u4E00-u9FA5]+$/;
    if (userName == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'succes',
        duration: 1000,
        mask: true
      })

      return false
    } else if (mobile == '') {
      wx.showToast({
        title: '手机号不能为空',
      })

      return false
    }
    else if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var nn = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;
    // if (!nn.test(userName)) {
    //   wx.showToast({
    //     title: '用户名错误！',
    //     icon: 'success',
    //     duration: 1500
    //   })
    //   return false;
    // }else 
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }else{
      let obj = {
        userName: userName,
        telNumber: mobile,
        address: this.data.address
      };
      let arr = [];
      arr.push(obj);
      console.log(obj);
      console.log(arr);
      that.setData({
        list:arr
      })
     wx.setStorageSync('address', arr);
      // 路由返回上一级
      wx.navigateBack({});
    }
    
    return true;
  },
  //详细地址
  address(e){
    this.setData({
      address: e.detail.value
    })
  },
  //输入手机号
  number(e){
    this.setData({
      telNumber: e.detail.value
    })
  },
  //输入姓名
  name(e){
    console.log(e);
    this.setData({
      userName:e.detail.value
    })
  },
  //点击获取微信地址
  wx_address(){
    let that=this;
    wx.getSetting({
      success(res) {
        console.log("vres.authSetting['scope.address']：", res.authSetting['scope.address'])
        if (res.authSetting['scope.address']) {
          console.log("111")
          wx.chooseAddress({
            success(res) {
              console.log(res.userName)
              console.log(res.postalCode)
              console.log(res.provinceName)
              console.log(res.cityName)
              console.log(res.countyName)
              console.log(res.detailInfo)
              console.log(res.nationalCode)
              console.log(res.telNumber)
              that.setData({
                userName:res.userName,
                cityName:res.cityName,
                countyName:res.countyName,
                detailInfo:res.detailInfo,
                telNumber:res.telNumber
              })
            }
          })
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问

        } else {
          if (res.authSetting['scope.address'] == false) {
            console.log("222")
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)

              }
            })
          } else {
            console.log("eee")
            wx.chooseAddress({
              success(res) {
                console.log(res.userName)
                console.log(res.postalCode)
                console.log(res.provinceName)
                console.log(res.cityName)
                console.log(res.countyName)
                console.log(res.detailInfo)
                console.log(res.nationalCode)
                console.log(res.telNumber)
                that.setData({
                  userName: res.userName,
                  cityName: res.cityName,
                  countyName: res.countyName,
                  detailInfo: res.detailInfo,
                  telNumber: res.telNumber
                })
              }
            })
          }
        }
      }
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
    let userName=options.userName;
    let telNumber=options.telNumber;
    let address=options.address;
    this.setData({
      userName:userName,
      telNumber:telNumber,
      address:address
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