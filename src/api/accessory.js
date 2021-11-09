import request from '../utils/request'

const module = '/accessory'

export default{

    getInfoByProductId(productId){
        return request({
            url: `${module}/getAccessoriesByProductId/${productId}`,
            method: 'GET',
        })
    },


}