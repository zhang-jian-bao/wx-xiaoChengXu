// pages/xinZengAddress/xinZengAddress.js
const http=require("../../../com/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    userName: " ",
    telNumber: "",
    address:'',
    list:[],
    region: ['请选择省', '请选择市', '请选择县'],
    customItem:'请选择地区',
    code:[],
    edit:false,
    userId:''
  },
  //删除地址
  async del(){
    var that=this;
    var delate=await http.delate({
      id: that.data.userId,
      token: wx.getStorageSync('token')
    });
    console.log(delate);
    if (delate.data.code == 0) {
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      });
     wx.navigateBack({
       
     })
    }
    // wx.request({
    //   url: 'https://api.it120.cc/zhangjianbao/user/shipping-address/delete',
    //   method: 'POST',
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   data:{
    //     id:that.data.userId,
    //     token:wx.getStorageSync('token')
    //   },
    //   success(res){
    //     console.log(res);
    //     if(res.data.code==0){
    //       wx.showToast({
    //         title: '删除成功',
    //         icon:'success'
    //       });
    //       wx.navigateBack({})
    //     }
    //   }
    // })
  },
  //修改地址
  async edit(){
    var that=this;
    var edit = await http.update({
      address: that.data.address,
      linkMan: that.data.userName,
      mobile: that.data.telNumber,
      id: that.data.userId,
      provinceId: that.data.code[1],
      cityId: that.data.code[0],
      token: wx.getStorageSync('token')
    });
    console.log(edit);
    if (edit.data.code == 0) {
          wx.showToast({
            title: '修改成功',
            icon:'success'
          });
          wx.navigateBack({});
        }
  //   wx.request({
  //     url: 'https://api.it120.cc/zhangjianbao/user/shipping-address/update',
  //     method: 'POST',
  //     header: {
  //       "content-type": "application/x-www-form-urlencoded"
  //     },
  //     data:{
  //       address: that.data.address,
  //       linkMan: that.data.userName,
  //       mobile: that.data.telNumber,
  //       id:that.data.userId,
  //       provinceId: that.data.code[1],
  //       cityId: that.data.code[0],
  //       token: wx.getStorageSync('token')
  //     },
  //     success(res){
  //       console.log(res);
  //       if(res.data.code==0){
  //         wx.showToast({
  //           title: '修改成功',
  //           icon:'success'
  //         });
  //         wx.navigateBack({});
  //       }
  //     }
  //   })
  },
  //选择地区
  bindRegionChange: function (e) {
    console.log(e)
    this.setData({
      region: e.detail.value,
      code:e.detail.code
    })
  },
  //点击保存
  async baoCun(e){
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
      // var bao = await http.add_address({
      //   address: that.data.address,
      //     linkMan: userName,
      //     mobile: mobile,
      //     provinceId:that.data.code[1],
      //     cityId:that.data.code[0],
      //     token:wx.getStorageSync('token')
      // });
      // console.log(bao);
      // if(bao.data.code==0){
      //   wx.navigateBack({});
      // }
      wx.request({
        url: 'https://api.it120.cc/zhangjianbao/user/shipping-address/add',
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data:{
          address: that.data.address,
          linkMan: userName,
          mobile: mobile,
          provinceId:that.data.code[1],
          cityId:that.data.code[0],
          token:wx.getStorageSync('token'),
          isDefault:true
        },
        success(res){
          console.log(res);
          // 路由返回上一级
          wx.navigateBack({});
        }
      })
      // let arr = [];
      // arr.push(obj);
      // console.log(obj);
      // console.log(arr);
      // that.setData({
      //   list:arr
      // })
    //  wx.setStorageSync('address', arr);
     
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
  async onLoad(options) {
    var that=this;
    var id=options.id
    console.log(id);
    var xq = await http.address_xiangQin({
          id: id,
          token:wx.getStorageSync('token')
    });
    console.log(xq);
    if (xq.data.code == 0) {
         that.setData({
           userName: xq.data.data.info.linkMan,
           telNumber: xq.data.data.info.mobile,
           address: xq.data.data.info.address,
           region: ['请选择省','请选择市','请选择县'],
           edit:true,
           userId: xq.data.data.info.id
         })
        }
    // wx.request({
      // url: 'https://api.it120.cc/zhangjianbao/user/shipping-address/detail/v2',
      // data:{
      //     id:id,
      //     token:wx.getStorageSync('token')
      // },
      // success(res){
      //   console.log(res);
    //     if(res.data.code==0){
    //      that.setData({
    //        userName: res.data.data.info.linkMan,
    //        telNumber: res.data.data.info.mobile,
    //        address: res.data.data.info.address,
    //        region: [],
    //        edit:true,
    //        userId: res.data.data.info.id
    //      })
    //     }
    //   }
    // })
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
    this.del();
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