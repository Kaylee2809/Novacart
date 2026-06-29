const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");


const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadmiddleware");


router.post(
"/",
protect,
adminOnly,
upload.single("image"),
createProduct
);

// PUBLIC
router.get("/", getProducts);

router.get("/:id", getProduct);


// ADMIN ONLY
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createProduct
);


router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);


module.exports = router;