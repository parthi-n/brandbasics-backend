const Shop = require("../models/shop");
// Index all shops
const index = async (req, res) => {
	try {
		const shops = await Shop.find({}, "shopName");
		res.status(200).json(shops);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

// View Specific Shop
const get = async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.shopId);

		if (!shop) {
			return res.status(404).json({ err: "Shop not found." });
		}

		res.status(200).json(shop);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

// Create new Shop
const create = async (req, res) => {
	try {
		const shop = await Shop.create(req.body);
		res.status(201).json(shop);
	} catch (error) {
		res.status(500).json({ err: err.message });
	}
};

// Edit Specific Shop
const update = async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.shopId);

		const updatedShop = await Shop.findByIdAndUpdate(req.params.shopId, req.body, { new: true });

		res.status(200).json(updatedShop);
	} catch (error) {
		res.status(500).json({ err: err.message });
	}
};

// Remove Specific Shop
const remove = async (req, res) => {
	try {
		const deletedShop = await Shop.findByIdAndDelete(req.params.shopId);
		res.status(200).json({ deleted: deletedShop });
	} catch (error) {
		res.status(500).json({ err: err.message });
	}
};

// All Menu item from a Specific Shop
const allMenuItem = async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.shopId);

		if (!shop) {
			return res.status(404).json({ err: "Shop not found." });
		}

		const menuItems = shop.menu;

		res.status(200).json(menuItems);
	} catch (error) {
		res.status(500).json({ err: err.message });
	}
};

// Add Menu item/items to Specific Shop
const addMenuItem = async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.shopId);

		if (Array.isArray(req.body) && req.body.length > 0) {
			shop.menu.push(...req.body);
			await shop.save();
			res.status(201).json(shop.menu.slice(-req.body.length));
		} else if (req.body && typeof req.body === "object") {
			shop.menu.push(req.body);
			await shop.save();
			res.status(201).json(req.body);
		} else {
			res.status(400).json({ err: "Request body must be an object or an array of menu items" });
		}
	} catch (error) {
		res.status(500).json({ err: error.message });
	}
};

// Update Menu item to Specific Shop
const updateMenuItem = async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.shopId);
		const menuItem = await shop.menu.id(req.params.menuId);
		console.log(shop);
		Object.assign(menuItem, req.body);
		await shop.save();
		res.status(200).json(menuItem);
	} catch (error) {
		res.status(500).json({ err: err.message });
	}
};

const deleteMenuItem = async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.shopId);
		const menuItem = await shop.menu.id(req.params.menuId);
		shop.menu.remove({ _id: req.params.menuId });
		await shop.save();
		res.status(200).json({ deleted: menuItem });
	} catch (error) {
		res.status(500).json({ err: err.message });
	}
};

module.exports = { index, get, create, update, remove, allMenuItem, addMenuItem, updateMenuItem, deleteMenuItem };
