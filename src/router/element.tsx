import {lazy,Suspense} from 'react'
import KeepAlive from 'react-activation'
import Index from '../views/Index'
import Login from '../views/Login'
import Home from '../views/Home'

let elements = [
    {  
        path:'/index',
        element:<Index/>,
        author:false,
        children:[
            {
                path:'home',
                element:<KeepAlive id='home'><Home/></KeepAlive>,
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
        element:<Index/>,
        author:false,
    },
]

export default elements;