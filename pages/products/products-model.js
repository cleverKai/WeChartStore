import { Base } from '../../utils/base.js'

class Product extends Base{
  constructor(){
    super();
  }
  getDetailInfo(id, callBack){
    var params = {
      url: 'product/' + id,
      sCallBack(data){
        callBack && callBack(data);
      }
    };
    this.request(params);
  }

}

export { Product };