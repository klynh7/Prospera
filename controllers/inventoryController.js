const { Product } = require('../models');
const { Op } = require('sequelize');

// Mengambil daftar produk dengan stok rendah (Inventory Alert)
const getLowStock = async (req, res) => {
    try {
        const userId = req.user.id;

        // ambil batas stok dari query (default = 5)
        const stockLimit = req.query.limit || 5;

        // ambil data produk dengan stok di bawah batas
        const products = await Product.findAll({
            where: {
                user_id_fk: userId,
                product_stock: {
                    [Op.lt]: stockLimit
                }
            },
            attributes: ['product_name', 'product_stock'],
            order: [['product_stock', 'ASC']]
        });

        res.status(200).json({
            alert: "Produk dengan stok rendah",
            threshold: stockLimit,
            total: products.length,
            data: products
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan internal pada server." });
    }
};

module.exports = { getLowStock };