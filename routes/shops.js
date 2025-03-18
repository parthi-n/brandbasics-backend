const express = require("express");
const router = express.Router();
const shopsCtrl = require("../controllers/shops");

router.get("/", shopsCtrl.index);
router.post("/", shopsCtrl.create);
router.get("/:shopId", shopsCtrl.get);
router.delete("/:shopId", shopsCtrl.remove);
router.put("/:shopId", shopsCtrl.update);

router.get("/:shopId/menu", shopsCtrl.allMenuItem);
router.post("/:shopId/menu", shopsCtrl.addMenuItem);
router.put("/:shopId/menu/:menuId", shopsCtrl.updateMenuItem);
router.delete("/:shopId/menu/:menuId", shopsCtrl.deleteMenuItem);

module.exports = router;
