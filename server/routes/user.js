// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/userModel");
const Order = require("../models/orderModel");

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password, email, role,address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email, role,address });
    await user.save();
    const token = jsonwebtoken.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "7d",
    });
    res
      .status(201)
      .cookie("jwt", token)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jsonwebtoken.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "7d",
    });
    res.status(200).cookie("jwt", token).json(user);
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/", async (req, res) => {
  if (req.cookies) {
    if (!Object.keys(req.cookies).includes("jwt"))
      res.status(401).json({ error: "Not Logined" });
    else {
      const { jwt } = req.cookies;

      jsonwebtoken.verify(
        jwt,
        "your-secret-key",
        async function (err, decoded) {
          if (decoded) {
            const user = await User.findById(decoded.userId);
            if (!user) res.status(404).json({ error: "User Not Found" });
            else res.status(201).json(user);
          } else if (err) {
            res.status(500).json({ error: "JWT Expired" });
          }
        }
      );
    }
  } else {
    res.status(401).json({ error: "Not Logined" });
  }
});

router.post("/cart/create", async (req, res) => {
  if (req.cookies) {
    if (!Object.keys(req.cookies).includes("jwt"))
      res.status(401).json({ error: "Not Logined" });

    const { jwt } = req.cookies;

    jsonwebtoken.verify(jwt, "your-secret-key", async function (err, decoded) {
      if (decoded) {
        User.findById(decoded.userId).then((user) => {
          user.cart = [...user.cart, req.body.cartItem];

          user.markModified("cart");

          user
            .save()
            .then((data) => res.status(201).json(user))
            .catch((err) => res.status(500).json({ error: err }));
        });
      } else if (err) {
        res.status(500).json({ error: "JWT Expired" });
      }
    });
  } else {
    res.status(401).json({ error: "Not Logined" });
  }
});
router.delete("/cart/delete/:id", async (req, res) => {
  if (req.cookies) {
    if (!Object.keys(req.cookies).includes("jwt"))
      res.status(401).json({ error: "Not Logined" });

    const { jwt } = req.cookies;

    jsonwebtoken.verify(jwt, "your-secret-key", async function (err, decoded) {
      if (decoded) {
        User.findById(decoded.userId).then((user) => {
          var localCart = user.cart.filter((ele) => ele != req.params.id);
          user.cart = localCart;

          user.markModified("cart");

          user
            .save()
            .then((data) => res.status(201).json(user))
            .catch((err) => res.status(500).json({ error: err }));
        });
      } else if (err) {
        res.status(500).json({ error: "JWT Expired" });
      }
    });
  } else {
    res.status(401).json({ error: "Not Logined" });
  }
});

router.post("/wish/create", async (req, res) => {
  if (req.cookies) {
    if (!Object.keys(req.cookies).includes("jwt"))
      res.status(401).json({ error: "Not Logined" });

    const { jwt } = req.cookies;

    jsonwebtoken.verify(jwt, "your-secret-key", async function (err, decoded) {
      if (decoded) {
        User.findById(decoded.userId).then((user) => {
          user.wishlist = [...user.wishlist, req.body.wishlistItem];

          user.markModified("wishlist");

          user
            .save()
            .then((data) => res.status(201).json(user))
            .catch((err) => res.status(500).json({ error: err }));
        });
      } else if (err) {
        res.status(500).json({ error: "JWT Expired" });
      }
    });
  } else {
    res.status(401).json({ error: "Not Logined" });
  }
});
router.delete("/wish/delete/:id", async (req, res) => {
  if (req.cookies) {
    if (!Object.keys(req.cookies).includes("jwt"))
      res.status(401).json({ error: "Not Logined" });
    else {
      const { jwt } = req.cookies;

      jsonwebtoken.verify(
        jwt,
        "your-secret-key",
        async function (err, decoded) {
          if (decoded) {
            User.findById(decoded.userId).then((user) => {
              let localWishlist = user.wishlist.filter(
                (ele) => ele != req.params.id
              );
              user.wishlist = localWishlist;

              user.markModified("wishlist");

              user
                .save()
                .then((data) => res.status(201).json(user))
                .catch((err) => res.status(500).json({ error: err }));
            });
          } else if (err) {
            res.status(500).json({ error: "JWT Expired" });
          }
        }
      );
    }
  } else {
    res.status(401).json({ error: "Not Logined" });
  }
});

router.get("/orders", async (req, res) => {
  if (req.cookies) {
    if (!Object.keys(req.cookies).includes("jwt"))
      res.status(401).json({ error: "Not Logined" });
    else {
      const { jwt } = req.cookies;

      jsonwebtoken.verify(
        jwt,
        "your-secret-key",
        async function (err, decoded) {
          if (decoded) {
            const orders = await Order.find({ user_id: decoded.userId });
            res.status(201).json(orders);
          } else if (err) {
            res.status(500).json({ error: "JWT Expired" });
          }
        }
      );
    }
  } else {
    res.status(401).json({ error: "Not Logined" });
  }
});
router.get("/ordersall", async (req, res) => {
  if (req.cookies) {
    if (!Object.keys(req.cookies).includes("jwt"))
      res.status(401).json({ error: "Not Logined" });
    else {
      const { jwt } = req.cookies;

      jsonwebtoken.verify(
        jwt,
        "your-secret-key",
        async function (err, decoded) {
          if (decoded) {
            const orders = await Order.find();
            res.status(201).json(orders);
          } else if (err) {
            res.status(500).json({ error: "JWT Expired" });
          }
        }
      );
    }
  } else {
    res.status(401).json({ error: "Not Logined" });
  }
});

router.post("/order/create", async (req, res) => {
  if (req.cookies) {
    if (!Object.keys(req.cookies).includes("jwt"))
      res.status(401).json({ error: "Not Logined" });
    else {
      const { jwt } = req.cookies;

      jsonwebtoken.verify(
        jwt,
        "your-secret-key",
        async function (err, decoded) {
          if (decoded) {
            const order = new Order({
              user_id: decoded.userId,
              product_id: req.body.product_id,
              quantity: req.body.quantity,
              totalPrice: req.body.totalPrice,
              delivery_date: req.body.delivery_date,
              address: req.body.address,
            });

            order
              .save()
              .then((data) => {
                res
                  .status(201)
                  .json({ message: "Successfully Created", data: order });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          } else if (err) {
            res.status(500).json({ error: "JWT Expired" });
          }
        }
      );
    }
  } else {
    res.status(401).json({ error: "Not Logined" });
  }
});
router.put("/order/update", async (req, res) => {
  if (req.cookies) {
    if (!Object.keys(req.cookies).includes("jwt"))
      res.status(401).json({ error: "Not Logined" });
    else {
      const { jwt } = req.cookies;

      jsonwebtoken.verify(
        jwt,
        "your-secret-key",
        async function (err, decoded) {
          if (decoded) {
            const user = await User.findById(decoded.userId);
            if (user.role == "admin") {
              Order.findById(req.body.id).then((order) => {
                order.status = req.body.status;

                order.markModified("status");

                order
                  .save()
                  .then((data) => res.status(201).json(order))
                  .catch((err) => res.status(500).json({ error: err }));
              });
            } else res.status(401).json({ error: "Access Denied" });
          } else if (err) {
            res.status(500).json({ error: "JWT Expired" });
          }
        }
      );
    }
  } else {
    res.status(401).json({ error: "Not Logined" });
  }
});
router.delete("/order/delete/:id", async (req, res) => {
  if (req.cookies) {
    if (!Object.keys(req.cookies).includes("jwt"))
      res.status(401).json({ error: "Not Logined" });
    else {
      const { jwt } = req.cookies;

      jsonwebtoken.verify(
        jwt,
        "your-secret-key",
        async function (err, decoded) {
          if (decoded) {
            Order.findByIdAndDelete(req.params.id)
              .then((user) => {
                res.status(201).json(user);
              })
              .catch((err) => res.status(500).json({ error: err }));
          } else if (err) {
            res.status(500).json({ error: "JWT Expired" });
          }
        }
      );
    }
  } else {
    res.status(401).json({ error: "Not Logined" });
  }
});

module.exports = router;
