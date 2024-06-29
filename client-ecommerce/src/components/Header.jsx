import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Select } from "antd";
import axios from "axios";
import useGeneralStore from "../store/generalStore";
import useUser from "../store/user";
import Link from "next/link";
import useItem from "../store/item";
import { useRouter } from "next/navigation";
import pincode from "pincode-distance";
const Pincode = new pincode();

const Header = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [login, setLogin] = useState(true);

  const [wishOpen, setWishOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    email: "",
    role: "user",
    address:""
  });

  const { isAuthenticated, setIsAuthenticated } = useGeneralStore();
  const { user, setUser } = useUser();
  const { item, setItem } = useItem();

  const handleSignUp = () => {
    axios
      .post("http://localhost:5000/api/user/register", signupData, {
        withCredentials: true,
      })
      .then((data) => {
        setUser(data.data);
        setIsAuthenticated(true);
        setAuthOpen(false);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/api/user/login", loginData, {
        withCredentials: true,
      })
      .then((data) => {
        setUser(data.data);
        setIsAuthenticated(true);
        setAuthOpen(false);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWishListDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/user/wish/delete/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setUser(data.data);
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
    return result;
  }

  const handleCartBuy = () => {
    var deli_date = Math.abs(Pincode.getDistance("766002", "756047"));
    var time_to_delivery=1;
    if (deli_date < 50) time_to_delivery = 1;
    else if (deli_date > 50 && deli_date < 100) time_to_delivery = 2;
    else if (deli_date > 100 && deli_date < 200) time_to_delivery = 4;
    else if (deli_date > 200 && deli_date < 300) time_to_delivery = 6;
    else time_to_delivery = 10
    axios
      .post(
        "http://localhost:5000/api/user/order/create",
        {
          userId: user._id,
          product_id: user.cart,
          quantity: user.cart.length,
          totalPrice: "430",
          address: "756047",
          delivery_date: addDays(Date.now(), time_to_delivery),
        },
        { withCredentials: true }
      )
      .then((data) => {
        // user.cart.map((ele) => {
        //   handleCartDelete(ele);
        // });
        alert("Order Successful");
      });
  };

  useEffect(() => {
    if (!isAuthenticated)
      axios
        .get("http://localhost:5000/api/user/", {
          withCredentials: true,
        })
        .then((data) => {
          setUser(data.data);
          console.log(data.data);
          setIsAuthenticated(true);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  useEffect(() => {
    if (!item.length)
      axios.get("http://localhost:5000/api/items").then((data) => {
        setItem(data.data);
      }).catch(err=>console.log(err));
  }, []);

  return (
    <>
      {/* Auth Systems */}
      <Modal
        open={authOpen}
        onCancel={() => {
          setAuthOpen(false);
        }}
        footer=""
        centered
        className="p-6"
      >
        {login ? (
          <div className="flex items-center justify-center gap-5 flex-col">
            <div className="header font-medium text-xl">Log In</div>
            <Input
              size="large"
              value={loginData.username}
              placeholder="User Name"
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            ></Input>
            <Input.Password
              value={loginData.password}
              size="large"
              placeholder="Password"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            ></Input.Password>
            <Button size="large" onClick={handleLogin}>
              Login
            </Button>
            <div className="change w-[50%] text-center">
              Dont Have Account{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setLogin(!login)}
              >
                Create Account
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-5 flex-col">
            <div className="header font-medium text-xl">Create Account</div>
            <Input
              size="large"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            ></Input>
            <Input
              size="large"
              value={signupData.username}
              placeholder="User Name"
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
            ></Input>
            <Input
              size="large"
              value={signupData.address}
              placeholder="Address"
              onChange={(e) =>
                setSignupData({ ...signupData, address: e.target.value })
              }
            ></Input>
            <Input.Password
              size="large"
              value={signupData.password}
              placeholder="Password"
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            ></Input.Password>
            <Select
              value={signupData.role}
              defaultActiveFirstOption
              className="w-full"
              size="large"
              placeholder="Role"
              onChange={(e) => setSignupData({ ...signupData, role: e })}
              options={[
                {
                  value: "user",
                  label: "user",
                },
                {
                  value: "admin",
                  label: "admin",
                },
              ]}
            />
            <Button size="large" onClick={handleSignUp}>
              Sign Up
            </Button>
            <div className="change w-[50%] text-center">
              Want To Login{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setLogin(!login)}
              >
                Login
              </span>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={wishOpen}
        onCancel={() => {
          setWishOpen(false);
        }}
        centered
        footer=""
      >
        <div className="flex flex-col gap-3">
          <div className="header">Wishlist</div>
          {user.wishlist ? (
            user.wishlist.map((ele, ind) => {
              var single_item = item.filter((val) => val._id == ele);
              return (
                <div
                  className="flex items-center justify-between px-4 py-3 text-black"
                  key={ind}
                >
                  <div>{single_item.length && single_item[0].name}</div>
                  <div>{single_item.length && single_item[0].price}</div>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      handleWishListDelete(ele);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            })
          ) : (
            <>Your WishList Is Empty</>
          )}
        </div>
      </Modal>

      <Modal
        open={cartOpen}
        onCancel={() => {
          setCartOpen(false);
        }}
        centered
        footer=""
      >
        <div className="flex flex-col gap-3">
          <div className="header">Cart</div>
          {user.cart ? (
            user.cart.map((ele, ind) => {
              var single_item = item.filter((val) => val._id == ele);
              console.log(single_item);
              return (
                <div
                  className="flex items-center justify-between px-4 py-3 text-black"
                  key={ind}
                >
                  <div>{single_item.length && single_item[0].name}</div>
                  <div>{single_item.length && single_item[0].price}</div>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      handleCartDelete(ele);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            })
          ) : (
            <>Your WishList Is Empty</>
          )}
          {user.cart && user.cart.length ? (
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={handleCartBuy}
            >
              Buy
            </Button>
          ) : (
            <>Nothing In cart</>
          )}
        </div>
      </Modal>

      <div className="w-full flex px-6 md:justify-between pt-4 flex-wrap items-center justify-center gap-4">
        <div className="logo text-3xl font-semibold">Ecommerce</div>
        <div className="btns flex gap-3 items-center">
          {isAuthenticated && user.username}
          <Button
            size="large"
            className="w-[50px] border-[#ffe26e] border-2 aspect-square"
            onClick={() => {
              if (!isAuthenticated) setAuthOpen(true);
              else {
                router.push("/user");
              }
            }}
          >
            <img
              src="/icons/user.png"
              alt=""
              className="aspect-square w-full"
            />
          </Button>
          <Button
            size="large"
            className="w-[50px] border-[#ffe26e] border-2 aspect-square relative"
            onClick={() => setWishOpen(true)}
          >
            {user.wishlist && user.wishlist.length > 0 && (
              <div className="badge absolute w-4 h-4 rounded-full bg-red-500 -top-1 -right-1 flex items-center justify-center text-xs text-white p-1">
                {user.wishlist.length}
              </div>
            )}
            <img
              src="/icons/heart.png"
              alt=""
              className="aspect-square w-full"
            />
          </Button>
          <Button
            size="large"
            className="w-[50px] border-[#ffe26e] border-2 aspect-square relative"
            onClick={() => setCartOpen(true)}
          >
            {user.cart && user.cart.length > 0 && (
              <div className="badge absolute w-4 h-4 rounded-full bg-red-500 -top-1 -right-1 flex items-center justify-center text-xs text-white p-1">
                {user.cart.length}
              </div>
            )}
            <img
              src="/icons/trolley-cart.png"
              alt=""
              className="aspect-square w-full"
            />
          </Button>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-8 text-lg font-medium py-3">
        <Link href="/">
          <div className="item cursor-pointer">Home</div>
        </Link>
        <Link href="/shop">
          <div className="item cursor-pointer">Shop</div>
        </Link>
        <Link href="/shop/men">
          <div className="item cursor-pointer">Men</div>
        </Link>
        <Link href="/shop/women">
          <div className="item cursor-pointer">Women</div>
        </Link>
        <Link href="/shop/kids">
          <div className="item cursor-pointer">Kids</div>
        </Link>
      </div>
    </>
  );
};

export default Header;
