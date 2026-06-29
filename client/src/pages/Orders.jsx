import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
console.log("LOCAL STORAGE USER:", user);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const url = user?.isAdmin
          ? "/orders"
          : "/orders/my-orders";


        console.log("CALLING:", url);


        const res = await api.get(url);
        console.log("RESPONSE LENGTH:", res.data.length);


        console.log("API ORDERS:", res.data);


        setOrders(res.data);


      } catch(err) {

        console.log(err);

      }

    };


    fetchOrders();

  }, []);



  console.log("RENDERING ORDERS:", orders.length);



  return (

    <div className="orders-page">

      <h1>
        {user?.isAdmin ? "All Orders" : "My Orders"}
      </h1>


      <h2>
        Total displayed: {orders.length}
      </h2>


      {
        orders.map(order => (

          <div 
            key={order._id}
            className="order-card"
          >

            <h3>
              Order #{order._id.slice(-6)}
            </h3>


            <p>
              Customer: {order.user?.name}
            </p>


            <p>
              Total: R {order.total}
            </p>


            {
              order.items.map((item,index)=>(

                <div key={index}>

                  {item.name} × {item.qty || 1}

                </div>

              ))
            }


          </div>

        ))
      }


    </div>

  );

}