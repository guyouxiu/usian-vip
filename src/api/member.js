import request from '../utils/requist'

// 获取会员列表接口与分页
export const getMemberListApi=(page,size,data)=>{
    return request ({
        url:`member/list/search/${page}/${size}`,
        method:'POST',
        data
    })
}

// 删除会员接口

export const deleteMember =(id)=>{
    return request ({
        url:   `member/${id}`,
        method:'DELETE'
    })
}

// 添加会员接口

export const AddMember=()=>{
    return request ({
        url:'member',
        method:'POST'
    })
}


// 编辑会员接口
export const EditMember=(id,data={})=>{
    return request ({
        url:`member/${id}`,
        method:'PUT',
        data
    })
}

// 查询单个会员接口

export const FindMember=(id)=>{
    return request ({
        url:`member/${id}`,
        method:`GET`,
    })
}
