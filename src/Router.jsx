import { createBrowserRouter ,Navigate } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Homechild from "./Components/Home/Homechild"
import FlowerChild from "./Components/Flower/FlowerChild"
import  PlantChild from "./Components/Plant/PlantChild"
import Loginchild from "./Google_Login/Loginchild"
import CartChild from "./Components/Cart/CartChild"
import CheckoutChild from "./Components/Checkout/CheckoutChild"
import TicketChild from "./Components/Ticket/TicketChild"
import Aichild from "./Components/AI/AiChild"

const Router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Navigate to={"/home"}/>
            },
            Homechild(),
            FlowerChild(),
            PlantChild(),
            Loginchild(),
            CartChild(),
            CheckoutChild(),
            TicketChild(),
            Aichild()
        ]
    }

])

export default Router