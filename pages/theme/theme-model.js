import {Base} from '../../utils/base.js';
class Theme  extends Base{
  constructor(){
    super();
  }
  // 获取主题下的商品列表
  getProductsData(id,callBack){
    var param = {
      url : 'theme/' + id ,
      sCallBack(data){
        callBack && callBack(data);
      }
    };
    this.request(param);
  }
}

export { Theme };