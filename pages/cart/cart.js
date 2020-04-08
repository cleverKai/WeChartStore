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
  }
})