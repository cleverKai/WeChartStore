// pages/cart/cart.js
import {Cart} from './cart-model.js';
var cart = new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var cartData = cart.getCartDataFromLocal();
    // var countsInfo = cart.getCartTotalCounts(true);
    var calcData = this._calcTotalAccountAndCounts(cartData);
    this.setData({
      //选中商品的数量
      selectedCounts:calcData.selectedCounts,
      selectedTypeCounts:calcData.selectedTypeCounts,
      account:calcData.account,
      //购物车里面所有商品的数量
      cartData:cartData
    });
  },
  _calcTotalAccountAndCounts:function(data){
      var len = data.length;
      // 计算出来的总价格，但是要排除未选中的商品
      var account = 0;
      // 购买商品的总个数，但是要排斥未选中的商品
      var selectedCounts = 0;
      // 购买商品种类的数目
      var selectedTypeCounts = 0;
      let multiple = 100;
      //计算总价格
      for(let i=0;i<len;i++){
        if(data[i].selectStatus){
          account += data[i].counts*multiple*Number(data[i].price)*multiple;
          selectedCounts += data[i].counts;
          selectedTypeCounts++;
        }
      }
      return {
        selectedCounts:selectedCounts,
        selectedTypeCounts:selectedTypeCounts,
        account:account/(multiple*multiple)
      }
  },
  toggleSelect:function(event){
    // console.log(this.data.cartData);
    // 获取当前缓存中商品的id和选择状态
    var id = cart.getDataSet(event,'id');
    var status = cart.getDataSet(event,'status');
    var index = this._getProductIndexById(id);
    // 当点击checkbox时，将该商品的选择状态取反
    this.data.cartData[index].selectStatus = !status;
    this._resetCartData();
  },
  //重置购物车数据
  _resetCartData:function(){
    //重新计算总金额和商品总数
    var newData = this._calcTotalAccountAndCounts(this.data.cartData);
    // 重新进行页面数据的绑定
    this.setData({
      account:newData.account,
      selectedCounts:newData.selectedCounts,
      selectedTypeCounts:newData.selectedTypeCounts,
      cartData:this.data.cartData
    });
  },
  toggleSelectAll:function(event){
    // console.log("cart");
    let status = cart.getDataSet(event,'status') == 'true';
    let data = this.data.cartData;
    let len = data.length;
    for(let i=0;i<len;i++){
      data[i].selectStatus = !status;
    }
    this._resetCartData();
  },
  //根据商品id得到商品所在下标
  _getProductIndexById:function(id){
    var data = this.data.cartData;
    var len = data.length;
    for(let i=0;i<len;i++){
      if(data[i].id == id ){
        return i;
      }
    }
  },
  //商品数量减1
  changeCounts:function(event){
   let id = cart.getDataSet(event,'id');
   let type = cart.getDataSet(event,'type');
   let index = this._getProductIndexById(id);
   let counts = 1;
   if(type == "add"){
      cart.addCounts(id);
   } else{
     counts = -1;
     cart.cutCounts(id);
   }
   this.data.cartData[index].counts += counts;
   this._resetCartData();
  },
  // 删除购物车商品
  delete:function (event) {
    let id = cart.getDataSet(event,'id');
    let index = this._getProductIndexById(id);
    this.data.cartData.splice(index,1);
    this._resetCartData();
    cart.delete(id);//删除缓存里面的商品信息
    
  }
})