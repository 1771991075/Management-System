import {lazy,Suspense} from 'react'
import KeepAlive from 'react-activation'
import Index from '../views/Index'
import Login from '../views/Login'
import Home from '../views/Home'
let User = lazy(()=>import('../views/User'))

let elements = [
    {  
        path:'/index',
        element:<Index/>,
        author:false,
        children:[
            {
                path:'home',
                element:<Home/>,
                author:false,
            },
            {
                path:'user',
                element:<Suspense fallback={'Loading...'}><User/></Suspense>,
                author:false,
            },
        ]
    },
    {  
        path:'/login',
        element:<Login/>,
        author:false,
    },
    {  
        path:'/',
        element:<Login/>,
        author:false,
    },
]

export default elements;