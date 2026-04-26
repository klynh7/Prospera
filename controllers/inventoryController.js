const db = require('../config/db');
// Mengambil daftar produk dengan stok rendah (Invntory Alert)
const getLowStock = async (req, res) => {
    try {
        const userId = req.user.id;
        // ambil batas stok dari query (defaultnya = 5)
        const stockLimit = req.query.limit || 5;
        // query untuk mengambil produk dengan stok dibawah batas
        const [rows] = await db.query(`
            SELECT product_name, product_stock
            FROM Products
            WHERE user_id_fk = ? AND product_stock < ?
            ORDER BY product_stock ASC
        `, [userId, stockLimit]);
        res.status(200).json({
            alert: "Produk dengan stok rendah",
            threshold: stockLimit,
            total: rows.lenght,
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan internal pada server." });
    }
};
module.exports = { getLowStock };