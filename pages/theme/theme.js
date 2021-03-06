// pages/theme/theme.js
import { Theme } from './theme-model.js';
var theme = new Theme();
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
    var id = options.id;
    var name = options.name;
    this.data.id = id;
    this.data.name = name;
    // 动态改变头部标题
    // wx.setNavigationBarTitle({
    //   title: name
    // });
    this._loadData();
  },
  onReady(){
    wx.setNavigationBarTitle({
      title: this.data.name,
    });
  },
  _loadData(){
    theme.getProductsData(this.data.id,(data) =>{
      this.setData({
        "themeInfo":data
      });
      console.log(data);
    });
  }

})