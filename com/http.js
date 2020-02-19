//封装api请求接口
var base ='https://api.it120.cc/zhangjianbao';//封装公共接口部分
function api(url,methods,data){
  //用promise函数才可以在页面接受到数据要加return返回值
  return new Promise((resolve,reject)=>{
    wx.request({
      url: base+url,
      method:methods,
      data:data,
      header:{
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res){
        if(res.data.code==2000){//检测token是否有效
          wx.showModal({
            title: '登录失效',
            content: '请重新登录！点击确定跳转至登录页',
            showCancel:false,//是否显示取消按钮
            success(res1){
             if(res1.confirm){//点击确定按钮
               wx.navigateTo({//跳转到登录页面
                 url: '/pages/login/login',
               })
             }
            }
          })
        }
        resolve(res);//成功返回数据
      },error(msg){
        reject(msg);//失败返回数据
      }
    })
  })
}
//登录接口
function login(data){
  return api('/user/wxapp/login','get',data);
}
//主页商品列表接口
function shop_list(data){
  return api('/shop/goods/list','get',data);
}
//加入购物车
function add(data){
  return api('/shopping-cart/add','post',data);
}
//获取商品价格
function price(data){
  return api('/shop/goods/price','get',data);
}
//获取商品详情
function detail(data){
  return api('/shop/goods/detail','get',data);
}
//加入购物车修改数量
function modifyNumber(data){
  return api('/shopping-cart/modifyNumber','post',data);
}
//删除购物车的某一项商品
function remove(data){
  return api('/shopping-cart/remove','post',data);
}
//获取商品加入购物车的数据
function info(data){
  return api('/shopping-cart/info','get',data);
}
//获取所有收货地址
function address_list(data){
  return api('/user/shipping-address/list','get',data);
}
//删除单个地址
function delate(data){
  return api('/user/shipping-address/delete','post',data);
}
//修改地址
function update(data){
  return api('/user/shipping-address/update','post',data);
}
//添加地址
function add_address(){
  return api('/user/shipping-address/add','post',data);
}
//获取地址详情
function  address_xiangQin(data){
  return api('/user/shipping-address/detail/v2','get',data);
}
//导出接口
module.exports={
  add:add,
  login:login,
  shop_list: shop_list,
  price:price,
  detail: detail,
  modifyNumber: modifyNumber,
  remove:remove,
  info:info,
  delate:delate,
  update:update,
  address_list: address_list,
  add_address:add_address,
  address_xiangQin:address_xiangQin
}