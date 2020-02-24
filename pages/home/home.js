// pages/home/home.js
import {Home} from './home-model.js'
var home = new Home();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 页面初始化周期函数
  onLoad:function(){
    this._loadData();
  },
  //处理具体的业务
  _loadData:function(){
    var id = 1;
    home.getBannerData(id,(res)=>{
      // console.log(res);
      // 数据绑定
      this.setData({
        'bannerArr':res
      });
    });
    // 获取主题数据
    home.getThemeData((res) =>{
      this.setData({
        'themeArr': res
      });
    });
    // 获取首页商品数据
    home.getProductsData((res) =>{
      console.log(res);
      this.setData({
        'productsArr':res
      });
    });
  },


})