// pages/products/products.js
import { Product } from './products-model.js';
import { Cart } from '../cart/cart-model.js';
var product = new Product();
var cart = new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    countsArray:[1,2,3,4,5,6,7,8,9,10],
    productCounts:1,
    currentTabsIndex:0,
    product:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.data.id = id;
    // console.log(id);
    this._loadData();
  },
  onReady(){
    wx.setNavigationBarTitle({
      title: '商品详情',
    });
  },
  _loadData(){
    product.getDetailInfo(this.data.id,(data)=>{
      // console.log(data);
      this.data.product = data;
      this.setData({
        'cartTotalCounts': cart.getCartTotalCounts(),
        'product':data
      });
    });
  },
  bindPickerChange(event){
    var index = event.detail.value;
    var selected = this.data.countsArray[index];
    this.setData({
      'productCounts': selected
    });
  },
  onTabsItemTap(event){
    var index = product.getDataSet(event, 'index');
    this.setData({
      'currentTabsIndex':index
    });
  },
  //添加购物车
  onAddingToCartTap(event){
    this.addToCart();
  },
  addToCart(){
    var productObj = {};
    var keys = ['id','name','main_img_url','price'];
    for(var key in this.data.product){
      if(keys.indexOf(key)>=0){
        productObj[key] = this.data.product[key];
      }
    }
    cart.add(productObj, this.data.productCounts)
  }

})