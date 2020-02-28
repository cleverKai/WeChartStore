import { Base } from '../../utils/base.js';

class Category extends Base{
  constructor(){
    super();
  }
// 获取所有分类名称
  getCategoryType(callBack){
    var param = {
      url: 'category/all',
      sCallBack(data){
        callBack  && callBack(data);
      }
    };
    this.request(param);
  }

  //获得某种分类的商品
  getProductsByCategory(id, callBack){
    var param = {
      url: 'product/by_category?id='+ id,
      sCallBack(data) {
        callBack && callBack(data);
      }
    };
    this.request(param);
  }
}

export { Category};