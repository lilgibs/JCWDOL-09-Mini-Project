const { db, query } = require("../config/database");
const { getAllCategories } = require("./categoryController");
const fs = require('fs')

const deleteImage = (path) => {
	fs.unlink(path, (err) => {
		if (err) {
			console.log("Failed to delete image :", err)
		} else {
			console.log("Image deleted", path)
		}
	})
}

module.exports = {
	getAllProducts: async (req, res) => {
		try {
			const page = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;
			const offset = (page - 1) * limit;
			const { id_category, sortBy } = req.query;

			let sql = `select * from products where active = 1 `;

			if (id_category) {
				sql += ` AND id_category = ${db.escape(id_category)}`;
			}

			switch (sortBy) {
				case "price_low_to_high":
					sql += " ORDER BY price ASC";
					break;
				case "price_high_to_low":
					sql += " ORDER BY price DESC";
					break;
				case "name_a_to_z":
					sql += " ORDER BY name ASC";
					break;
				case "name_z_to_a":
					sql += " ORDER BY name DESC";
					break;
				default:
					break;
			}

			sql += ` LIMIT ${limit} OFFSET ${offset}`;

			const products = await query(sql);

			const count = await query(`
				SELECT COUNT(*) as total 
				FROM products 
				WHERE active = 1 
				${id_category ? `AND id_category = ${db.escape(id_category)}` : ""}`
			);
			const total = count[0].total;

			res.status(200).send({ data: products, total });
		} catch (error) {
			res.status(500).json({ message: "Error", error });
		}
	},
	getAllProductsUser: async (req, res) => {
		const id = req.user.id;
		try {
			const products = await query(`
				SELECT 
					products.id AS product_id,
					products.name AS product_name,
					products.price,
					products.image,
					products.description,
					products.active,
					categories.id as category_id,
					categories.name AS category_name,
					categories.id_user
					FROM
							products
					JOIN
						categories
					ON
							products.id_user = categories.id_user
					WHERE 
							products.id_user = ${db.escape(id)};
      `);

			if (products.length === 0) {
				res.status(200).send({ message: "Tidak ada produk" });
			} else {
				res.status(200).send({ data: products });
			}
		} catch (error) {
			res.status(500).json({ message: "Error", error });
		}
	},
	getAllProductsUser: async (req, res) => {
		const id = req.user.id;
		try {
			const products = await query(`
				SELECT 
					products.id AS product_id,
					products.name AS product_name,
					products.price,
					products.image,
					products.description,
					products.active,
					categories.id as category_id,
					categories.name AS category_name,
					categories.id_user
				FROM
					products
				JOIN
					categories
				ON
					products.id_category = categories.id
				WHERE 
					products.id_user = ${db.escape(id)};
			`);

			if (products.length === 0) {
				res.status(200).send({ message: "Tidak ada produk" });
			} else {
				res.status(200).send({ data: products });
			}
		} catch (error) {
			res.status(500).json({ message: "Error", error });
		}
	},
	AddProduct: async (req, res) => {
		const idUser = req.user.id;
		const { name, price, description, id_category } = req.body;
		const image = req.file.path;
		try {
			const products = await query(`
				INSERT into products(id, name, price, image, description, id_category, active, id_user)
				values(
					null,
					${db.escape(name)},
					${db.escape(price)},
					${db.escape(image)},
					${db.escape(description)},
					${db.escape(id_category)},
					1,
					${db.escape(idUser)}
				)
      `);
			res.status(200).send({ data: products });
		} catch (error) {
			res.status(500).json({ message: "Error", error });
		}
	},
	updateProduct: async (req, res) => {
		const idUser = req.user.id
		const productId = req.params.id
		const { product_name, price, description, category_id, active, category_name } = req.body;
		const image = req.file ? req.file.path : null;
		try {
			// Delete image lama
			const oldProduct = await query(`
				SELECT image
				FROM products
				WHERE 
					id = ${db.escape(productId)} AND id_user = ${db.escape(idUser)}
			`)
			if (image && oldProduct.length > 0) {
				deleteImage(oldProduct[0].image)
			}

			let sql = `
				UPDATE products
				SET
					name = ${db.escape(product_name)},
					price = ${db.escape(price)},
					description = ${db.escape(description)},
					id_category = ${db.escape(category_id)},
					active = ${db.escape(active)}
					${image ? `, image = ${db.escape(image)}` : ""}
				WHERE 
					id = ${db.escape(productId)} AND id_user = ${db.escape(idUser)}
			`;

			const result = await query(sql)

			if (result.affectedRows === 0) {
				res.status(404).send({ message: "Produk tidak ditemukan atau Anda tidak memiliki izin untuk mengedit produk ini." });
			} else {
				res.status(200).send({ message: "Produk berhasil diperbarui" });
			}
		}

		catch (error) {
			res.status(500).json({ message: "Error", error });
		}
	},
	deleteProduct: async (req, res) => {
		const idUser = req.user.id
		const productId = req.params.id
		try {
			const oldProduct = await query(`
				SELECT image
				FROM products
				WHERE 
					id = ${db.escape(productId)} AND id_user = ${db.escape(idUser)}
			`)
			if (oldProduct.length > 0) {
				deleteImage(oldProduct[0].image)
			}
			
			sql = `DELETE from products where id = ${db.escape(productId)} AND id_user = ${db.escape(idUser)}`

			const result = await query(sql)

			res.status(200).send({ message: "Produk berhasil di hapus", result });
		} catch (error) {
			res.status(500).json({ message: "Error", error });
		}
	}
};
