// pages/products/products.js
import { Product } from './products-model.js'
var product = new Product();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    countsArray:[1,2,3,4,5,6,7,8,9,10],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.data.id = id;
    console.log(id);
    this._loadData();
  },
  onReady(){
    wx.setNavigationBarTitle({
      title: '商品详情',
    });
  },
  _loadData(){
    product.getDetailInfo(this.data.id,(data)=>{
      console.log(data);
      this.setData({
        'product':data
      });
    });
  }

})