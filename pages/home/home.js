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
    var data = home.getBannerData(id,(res)=>{
      console.log(res);
    });
  },
  // callBack:function(res){
  //   console.log(res);
  // }


})