import React,{lazy} from "react"
import { Navigate,RouteObject, createHashRouter} from "react-router-dom"
import Page404 from "@/page/common/route404"
const Index = lazy(()=> import("@/page/index"))

const route404={
    path:'*',
    element:<Page404 />,
}
const routes:RouteObject[] = [{
    path:'/',
    element:<Navigate to='/index' />
}
    ,{
    path:'/index',
    element:<Index />
},
route404]

export default routes

export const router = createHashRouter(routes as any)