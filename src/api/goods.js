import request from '../utils/requist'

// 获取供应商列表接口与分页
export const getMemberListApi=(page,size,data)=>{
    return request ({
        url:`goods/list/search/${page}/${size}`,
        method:'POST',
        data
    })
    
}

// 获取供应商列表接口与分页
export const getMemberListApi2=(page,size,data)=>{
    return request ({
        url:`supplier/list/search/${page}/${size}`,
        method:'POST',
        data
    })
    
}

// 删除供应商接口

export const deleteMember =(id)=>{
    return request ({
        url:   `goods/${id}`,
        method:'DELETE'
    })
}

// 添加供应商接口

export const AddMember=()=>{
    return request ({
        url:'goods',
        method:'POST'
    })
}


// 编辑供应商接口
export const EditMember=(id,data={})=>{
    return request ({
        url:`goods/${id}`,
        method:'PUT',
        data
    })
}

// 查询供应商会员接口

export const FindMember=(id)=>{
    return request ({
        url:`goods/${id}`,
        method:`GET`,
    })
}
