import request from '../utils/request'

const module = '/product'

export default{
    add(data){
        return request({
            url: `${module}/add`,
            method: 'POST',
            data,
        })
    },

    delete(id){
        return request({
            url: `${module}/delete/${id}`,
            method: 'DELETE',
        })
    },

    update(data){
        return request({
            url: `${module}/update`,
            method: 'PUT',
            data,
        })
    },

    getAllInfo(){
        return request({
            url: `${module}/getAllInfo`,
            method: 'GET',
        })
    },


    getInfoByCondition(queryData){
        return request({
            url: `${module}/getInfoByCondition`,
            method: 'POST',
            data:queryData
        })
    },

    getPageOfInfoByCondition(currentPage,pageSize,queryData){
        return request({
            url: `${module}/getPageOfInfo/${currentPage}/${pageSize}`,
            method: 'POST',
            data:queryData
        })
    }

}