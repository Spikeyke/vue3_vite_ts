import request from "@/utils/request";

//品牌管理模块接口地址
enum API {
    //获取已有品牌接口
    TRADEMARK_URL = '/admin/product/baseTrademark/'
}

//获取已有品牌接口的方法
export const reqHasTrademark = (page: number, limit: number) => request.get<any,any>(API.TRADEMARK_URL + `${page}/${limit}`)
