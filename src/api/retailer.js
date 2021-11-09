import request from "../utils/request";

const module = '/retailer'

export default{


    delete(id){
        return request({
            url:`${module}/delete/${id}`,
            method:'DELETE',
        })
    },

    update(retailerEditInfo){
        return request({
            url: `${module}/update`,
            method: 'PUT',
            data: retailerEditInfo,
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