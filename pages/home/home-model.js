import {Base} from '../../utils/base.js'
class Home extends Base{
  constructor(){
    super();
  }
  getBannerData(id,callBack){
    var params = {
      url: 'banner/'+id,
      sCallBack:function(res){
        callBack && callBack(res.items);
      }
    };
    this.request(params);
   
  }
  //获取首页主题数据
  getThemeData(callBack){
    var params = {
      url: 'theme?ids=1,2,3',
      sCallBack:function(data){
        callBack && callBack(data); 
      }
    };
    this.request(params);
  }
  // 获取首页商品数据
  getProductsData(callBack){
    var params = {
      url: 'product/recent',
      sCallBack:function(data){
        callBack && callBack(data)
      }
    };
    this.request(params);
  }
}

export {Home};