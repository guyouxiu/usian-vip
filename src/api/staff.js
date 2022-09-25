import request from '../utils/requist'

// 获取员工列表接口与分页
export const getMemberListApi=(page,size,data)=>{
    return request ({
        url:`staff/list/search/${page}/${size}`,
        method:'POST',
        data
    })
    
}

// 删除员工接口

export const deleteMember =(id)=>{
    return request ({
        url:   `staff/${id}`,
        method:'DELETE'
    })
}

// 添加员工接口

export const AddMember=()=>{
    return request ({
        url:'staff',
        method:'POST'
    })
}


// 编辑员工接口
export const EditMember=(id,data={})=>{
    return request ({
        url:`staff/${id}`,
        method:'PUT',
        data
    })
}

// 查询员工接口

export const FindMember=(id)=>{
    return request ({
        url:`staff/${id}`,
        method:`GET`,
    })
}