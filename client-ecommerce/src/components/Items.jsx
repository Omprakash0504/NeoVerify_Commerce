import React from "react";
import { Button } from "antd";
import axios from "axios";
import useUser from "../store/user";
import pincode from "pincode-distance";
import useGeneralStore from "../store/generalStore";
const Pincode = new pincode();

const Items = ({ item }) => {
  const { user, setUser } = useUser();
  const {isAuthenticated} = useGeneralStore()

  const addToWishList = () => {
    if (!isAuthenticated) {
      alert("Login First");
      return;
    }
    axios
      .post(
        "http://localhost:5000/api/user/wish/create",
        {
          wishlistItem: item._id,
        },
        { withCredentials: true }
      )
      .then((data) => {
        setUser(data.data);
        alert("Added To WishList");
      });
  };

  const addToCart = () => {
    if (!isAuthenticated){
      alert("Login First")
      return
    }
      axios
        .post(
          "http://localhost:5000/api/user/cart/create",
          {
            cartItem: item._id,
          },
          { withCredentials: true }
        )
        .then((data) => {
          setUser(data.data);
          alert("Added To Cart");
        });
  };

  const handleCartDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/user/cart/delete/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setUser(data.data);
      });
  };

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    console.log(result)
    return result;
  }

  const handleBuy = (id, price) => {
    if (!isAuthenticated) {
      alert("Login First");
      return;
    }
    var deli_date = Math.abs(Pincode.getDistance("766002", "756047"));
    
    var time_to_delivery = 1;
    if (deli_date < 50) time_to_delivery = 1;
    else if (deli_date > 50 && deli_date < 100) time_to_delivery = 2;
    else if (deli_date > 100 && deli_date < 200) time_to_delivery = 4;
    else if (deli_date > 200 && deli_date < 300) time_to_delivery = 6;
    else time_to_delivery = 10
    console.log(time_to_delivery)
    axios
      .post(
        "http://localhost:5000/api/user/order/create",
        {
          userId: user._id,
          product_id: id,
          quantity: 1,
          totalPrice: price,
          address: "756047",
          delivery_date: addDays(Date.now(), time_to_delivery),
        },
        { withCredentials: true }
      )
      .then((data) => {
        user.cart.map((ele) => {
          handleCartDelete(ele);
        });
        alert("Order Successful");
      });
  };

  return (
    <div className="item_card rounded-2xl shadow-xl w-[300px] min-h-[350px] border-[.5px] overflow-hidden p-7 flex flex-col relative">
      <div
        className="wish rounded-bl-full top-0 right-0 flex items-center justify-center w-[50px] aspect-square overflow-hidden absolute bg-black/40 p-2"
        onClick={addToWishList}
      >
        <img
          src="/icons/heart.png"
          className="mb-1 ml-1 w-[75%] aspect-square"
          alt=""
        />
      </div>
      <img
        src={"/public/" + item.category + "/" + item.image[0].filename}
        className="w-full h-[70%]"
        alt=""
      />
      <br />
      <div className="details flex justify-between items-center">
        <div className="item_name font-medium text-lg text-clip">
          {item.name}
        </div>
        <div className="price  font-medium text-xl">₹ {item.price}</div>
      </div>
      <div className="desc text-xs">{item.description}</div>
      <br className="h-[10px]" />
      <div className="btns flex gap-2 items-center justify-center">
        <div
          className="buy w-full h-[33px] rounded-md flex items-center justify-center py-2 px-4 font-semibold bg-[#ffe26e] cursor-pointer"
          onClick={() => {
            handleBuy(item._id, item.price);
          }}
        >
          Buy Now
        </div>
        <Button
          className="w-[50px] border-[#ffe26e] border-2 aspect-square"
          onClick={addToCart}
        >
          <img
            src="/icons/trolley-cart.png"
            alt=""
            className="aspect-square w-full"
          />
        </Button>
      </div>
    </div>
  );
};

export default Items;
