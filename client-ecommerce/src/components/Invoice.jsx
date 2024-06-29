"use client";
import React, { useRef } from "react";
import generatePDF from "react-to-pdf";

const Invoice = ({ order }) => {
  const ref = useRef();

  const options = {
    filename: "using-function.pdf",
  };

  return (
    <>
      <div className="main" style={{ padding: "40px" }} ref={ref}>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    @import url('https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Poppins:wght@400;500&display=swap');\n\n    * {\n        margin: 0;\n        padding: 0;\n        font-family: 'Fira Mono', monospace;\n        font-family: 'Poppins', sans-serif;\n    }\n\n    body {\n        width: 100vw;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        overflow-x: hidden;\n    }\n\n    .main {\n        /* padding-left: 2.5%;\n        padding-right: 2.5%; */\n        display: flex;\n        justify-content: center;\n        flex-direction: column;\n        align-items: center;\n        gap: 20px;\n        width: 95%;\n    }\n\n    .header,\n    .details {\n        width: 100%;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        gap: 20px;\n    }\n\n    .company {\n        font-size: xx-large;\n        font-weight: 800;\n    }\n\n    .company-image {\n        width: 200px;\n        aspect-ratio: 1/1;\n    }\n\n    .col {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        gap: 20px;\n    }\n\n    .col-100 {\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n    }\n\n    hr {\n        width: 100%;\n    }\n\n\n    table {\n        font-family: arial, sans-serif;\n        border-collapse: collapse;\n        width: 100%;\n    }\n\n    td,\n    th {\n        border: 1px solid #dddddd;\n        text-align: left;\n        padding: 8px;\n    }\n\n    .sign {\n        height: 150px;\n    }\n",
          }}
        />
        <div className="header">
          <div className="company">Tax Invoice</div>
          <img
            className="company-image"
            src="https://t3.ftcdn.net/jpg/02/47/48/00/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u.jpg"
            alt=""
          />
        </div>
        <div className="details">
          <div className="first_column">
            <b>Invoice Number:</b> I1924SE002393437 <br />
            <b>Order Number:</b> 1249066-3408919-2415203 <br />
            <b>Nature of Transaction:</b> Inter-State <br />
            <b>Place of Supply:</b> ODISHA
          </div>
          <div className="first_column">
            <b>PacketID:</b> 9463902022 <br />
            <b>Date:</b> 16 Oct 2023 <br />
            <b>Order Date:</b> 13 Oct 2023 <br />
            <b>Nature of Supply:</b> Goods
          </div>
        </div>
        <hr />
        <div className="details">
          <div>
            <b>Bill to / Ship to:</b> <br />
            Tanmay Kumar panda <br />
            Green colour house,left side of manispur manikeswar mandir, manipur
            Soro Baleshwar - 756047 OR, India
          </div>
          <div>
            <b>Customer Type:</b> Unregistered <br />
          </div>
        </div>
        <hr />
        <div className="details">
          <div>
            <b>Bill From:</b> <br />
            Shreyash Retail Private Limited L.R Dag No-
            174,175,176,177,178,179,180,181,182, 185,186,187, L. R Khatian no.-
            5820,J.L No.11, mouza- Belumilki, P.S.- Serampore, Pearapur Gram
            Panchayat, Shrirampur, West bengal-712223
          </div>
          <div>
            <b>Ship From:</b> <br />
            Shreyash Retail Private Limited L.R Dag No-
            174,175,176,177,178,179,180,181,182, 185,186,187, L. R Khatian no.-
            5820,J.L No.11, mouza- Belumilki, P.S.- Serampore, Pearapur Gram
            Panchayat, Shrirampur, West bengal-712223 GSTIN Number:
            19AAXCS0655F1ZV
          </div>
        </div>
        <hr />
        <div className="details">
          <b>GSTIN Number:</b> 19AAXCS0655F1ZV
        </div>
        <hr />
        {/* {cartItems.items} */}
        <table>
          <tbody>
            <tr>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            {order && (
              <tr>
                <td>{order.product_id[0]}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
              </tr>
            )}
            {/* <tr>
          <td>T-shirt</td>
          <td>1</td>
          <td>200</td>
        </tr>
        <tr>
          <td>Pant</td>
          <td>1</td>
          <td>400</td>
        </tr> */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {order && (
              <tr>
                <td>Total</td>
                <td>{}</td>
                <td>{order.totalPrice}</td>
              </tr>
            )}
          </tbody>
        </table>
        <hr />
        <div className="details">
          <div className="col">
            <div>Shreyash Retail Private Limited</div>
            <img
              className="sign"
              src="/sign.png"
              alt="Red dot"
              style={{ width: "250px", objectFit: "contain" }}
            />
            <div>Authorized Signatory</div>
          </div>
        </div>
        <div className="col-100">
          <b>DECLARATION</b>
          The goods sold as part of this shipment are intended for end-user
          consumption and are not for retail sale
        </div>
        <hr />
        <div className="col-100">
          Reg Address: Shreyash Retail Private Limited,Second Floor, Plot No.
          82, Okhla Industrial Estate, Phase - III, New Delhi, Delhi, 110020, ,
          Delhi, Delhi-110020
          <br /> <br />
          Purchase made on our App <br />
        </div>
        <hr />
        <div className="col">
          If you have any questions, feel free to call customer care at +91 80
          6156 1999 or use Contact Us section in or log on to www.myntra.com/
          contactus
        </div>
      </div>
      <div
        className="wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          className="download"
          style={{
            padding: "10px",
            background: "green",
            color: "white",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            generatePDF(ref, options);
          }}
        >
          Download
        </div>
      </div>
    </>
  );
};

// Invoice.displayName = "Invoice"
export default Invoice;
