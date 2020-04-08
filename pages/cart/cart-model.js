import { Base } from '../../utils/base.js';
class Cart  extends Base{
  constructor(){
    super();
    this._storageKeyName = 'cart';
  }
  // 添加购物车方法
  /*
   * 加入购物车
   * 如果之前没有这样的商品，则直接添加一条新的记录，数量记为counts
   * 如果有，则只将相应数量+ counts
   * @params
   * item - {obj}
   * counts - {int}
  */ 
  add(item, counts){
    var cartData = this.getCartDataFromLocal();
    var isHasInfo = this._isHasThatOne(item.id,cartData);
    if(isHasInfo.index === -1){
      item.counts = counts;
      item.selectStatus = true;//定义购物车内的商品是否是选中状态
      cartData.push(item);
    }else{
      cartData[isHasInfo.index].counts += counts;
    }
    wx.setStorageSync(this._storageKeyName, cartData);
  }
  /*
  *从缓存中读取购物车数据
  */
  getCartDataFromLocal(){
    var res = wx.getStorageSync(this._storageKeyName);
    if(!res){
      res = [];
    }
    return res; 
  }
  // 获取购物车里面所有商品的数量
  /**
   * flag 为true 考虑商品的选择状态
   * 
   */
  getCartTotalCounts(flag){
    var data = this.getCartDataFromLocal();
    var cartCounts = 0;
    for(let i=0; i<data.length;i++){
      if(flag){
        if(data[i].selectStatus){
          cartCounts += data[i].counts;
        }
      }else{
        cartCounts += data[i].counts;
      }
    }
    return cartCounts;
  }
   /*
   *判断某个商品是否已经添加到购物车中，并且返回这个商品的数据，以及所在数组中的位置
   */ 
  _isHasThatOne(id,arr){
    var item;
    var result = { index:-1 };
    for(let i=0; i<arr.length;i++){
      item = arr[i];
      if(item.id === id){
        result ={ index:i,data:item }
      };
      break;
    }
    return result;
  }
}

export { Cart };