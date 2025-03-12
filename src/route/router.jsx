import Layout from "../layout/Layout";
import AuthForm from "../auth/AuthForm"


const ROUTES = [
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<AuthForm/>
            },
        ]
    }


]

export default ROUTES