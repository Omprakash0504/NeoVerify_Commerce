"use client";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useGeneralStore from "../../store/generalStore";
import useItem from "../../store/item";
import axios from "axios";
import useUser from "../../store/user";
import useOrder from "../../store/order";
import { Button, Input, Modal, Select } from "antd";
import { useCookies } from "react-cookie";
import Invoice from "../../components/Invoice";

const page = () => {
  const { user, setUser } = useUser();
  const { order, setOrder } = useOrder();
  const { isAuthenticated, setIsAuthenticated } = useGeneralStore();
  
  const [invoiceModal,setinvoiceModal] = useState(false)
  const [invoiceOrder,setInvoiceOrder] = useState()
  const [updateModal, setUpdateModal] = useState(false);
  const [activeOrder, setActiveOrder] = useState();
  const [status, setStatus] = useState("pending");

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  useEffect(() => {
    if (user.role == "admin") {
      console.log("hello");
      axios
        .get("http://localhost:5000/api/user/ordersall", {
          withCredentials: true,
        })
        .then((data) => {
          setOrder(data.data);
        });
    } else
      axios
        .get("http://localhost:5000/api/user/orders", {
          withCredentials: true,
        })
        .then((data) => {
          setOrder(data.data);
        });
    console.log(order);
  }, [user]);

  const handleCancle = (id) => {
    axios
      .delete(`http://localhost:5000/api/user/order/delete/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        alert("Order Deleted");
        setOrder(order.filter((ele) => ele._id != id));
      });
  };
  const handleLogout = () => {
    removeCookie("jwt");
    setUser({});
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const handleStatusUpdate = () => {
    axios
      .put(
        "http://localhost:5000/api/user/order/update",
        { id: activeOrder._id, status: status },
        { withCredentials: true }
      )
      .then((data) => {
        setUpdateModal(false);
        order.map((ele) => {
          if (ele._id == activeOrder._id) {
            ele.status = status;
          }
        });
        alert("Order Updated");
      })
      .catch((err) => console.log(err));
  };

  const handleInvoice = (order) => {
    setInvoiceOrder(order);
    setinvoiceModal(true)
  };

  return (
    <main className="flex min-h-screen flex-col items-center w-screen">
      <Modal open={invoiceModal} onCancel={()=>setinvoiceModal(false)} footer="" width={800} centered className="w-[90vw] h-auto flex items-center justify-center">
        <Invoice order={invoiceOrder} />
      </Modal>
      <Header />
      {user && user.role == "user" ? (
        <div className="flex-1 flex flex-col w-full items-center justify-center">
          <div className="usercard w-[500px] max-w-[90vw] rounded-2xl shadow-2xl p-6 flex items-center justify-center flex-col gap-2 mt-6">
            <div className="userName font-medium text-xl">
              Welcome {user && user.username} !!
            </div>
            <div className="email font-medium text-sm">
              {user && user.email}
            </div>
            <br />
            <Button type="primary" size="large" danger onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <div className="orders w-full p-6 flex flex-col gap-6 mt-10">
            <div className="heading w-full items-center flex font-medium text-2xl justify-center">
              Your Orders
            </div>
            {order.length && (
              <div className="flex gap-6 items-center justify-center">
                <div className="products">Product</div>
                <div className="price">Total Price</div>
                <div className="price">Status</div>
                <div className="price">Cancel</div>
                <div className="price">Purchase Date</div>
                <div className="price">Delivery Date</div>
              </div>
            )}
            {order.length ? (
              order.map((ele, ind) => {
                return (
                  <div className="flex gap-3 items-center justify-center">
                    <div className="products">{ele.product_id[0]}</div>
                    <div className="price">{ele.totalPrice}</div>
                    <div className="price">{ele.status}</div>
                    <div className="price">
                      {new Date(ele.purchesehDate).getDate()}-
                      {new Date(ele.purchesehDate).getMonth()+1}-
                      {new Date(ele.purchesehDate).getFullYear()}-
                    </div>
                    <div className="price">
                      {new Date(ele.delivery_date).getDate()}-
                      {new Date(ele.delivery_date).getMonth()+1}-
                      {new Date(ele.delivery_date).getFullYear()}
                    </div>
                    {ele.status != "deliveried" && (
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleCancle(ele._id)}
                      >
                        Cancel
                      </Button>
                    )}
                    {ele.status == "deliveried" && (
                      <Button
                        type="primary"
                        onClick={() => handleInvoice(ele)}
                        className="bg-blue-500"
                      >
                        Invoice
                      </Button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="w-full flex items-center justify-center font-medium">
                You Dont Have Any Order
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="orders flex-1 w-full p-6 flex flex-col gap-6 mt-10 items-center">
          <div className="usercard w-[500px] max-w-[90vw] rounded-2xl shadow-2xl p-6 flex items-center justify-center flex-col gap-2 mt-6">
            <div className="userName font-medium text-xl">
              Welcome {user && user.username} !!
            </div>
            <div className="email font-medium text-sm">
              {user && user.email}
            </div>
            <br />
            <Button type="primary" size="large" danger onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <Modal
            open={updateModal}
            onCancel={() => setUpdateModal(false)}
            centered
            footer=""
            className=""
          >
            <div className="wrapper flex items-center justify-center p-6 w-full flex-col gap-4">
              <div className="heading font-medium text-lg">Update Status</div>
              <Select
                value={status}
                defaultActiveFirstOption
                className="w-full"
                size="large"
                placeholder="Status"
                onChange={(e) => setStatus(e)}
                options={[
                  {
                    value: "pending",
                    label: "pending",
                  },
                  {
                    value: "verified",
                    label: "verified",
                  },
                  {
                    value: "outfordelivery",
                    label: "outfordelivery",
                  },
                  {
                    value: "deliveried",
                    label: "deliveried",
                  },
                ]}
              />
              <Button
                type="primery"
                className="bg-blue-500"
                onClick={handleStatusUpdate}
              >
                Update
              </Button>
            </div>
          </Modal>
          <div className="heading w-full items-center flex font-medium text-2xl justify-center">
            All Orders
          </div>
          {order.length && (
            <div className="flex gap-6 items-center justify-center">
              <div className="products">Product</div>
              <div className="price">Total Price</div>
              <div className="price">Status</div>
              <div className="price">Cancel</div>
            </div>
          )}
          {order.length ? (
            order.map((ele, ind) => {
              return (
                <div className="flex gap-3 items-center justify-center">
                  <div className="products">{ele.product_id[0]}</div>
                  <div className="price">{ele.totalPrice}</div>
                  <div className="price">{ele.status}</div>
                  <div className="price">{ele.delivery_data}</div>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      setUpdateModal(true);
                      setActiveOrder(ele);
                    }}
                  >
                    Update
                  </Button>
                </div>
              );
            })
          ) : (
            <div className="w-full flex items-center justify-center font-medium">
              You Dont Have Any Order
            </div>
          )}
        </div>
      )}
      <Footer />
    </main>
  );
};

export default page;
