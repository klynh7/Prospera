const db = require('../config/db');
// mengambil prediksi penjualan harian (Sales Forecasting)
const getForecast = async (req, res) => {
  try {
    const userId = req.user.id;
    // query untuk menghitung rata-rata penjualan harian 
    // alurnya : hitung total penjualan per harinya (daily_total) lalu ambil rata-rata dari semua hari tersebut 
    const [rows] = await db.query(`
      SELECT 
        AVG(daily_total) AS prediction
      FROM (
        SELECT 
          DATE(transaction_datetime) AS date,
          SUM(total_amount) AS daily_total
        FROM Transactions
        WHERE user_id_fk = ?
        GROUP BY DATE(transaction_datetime)
      ) t
    `, [userId]);

    res.status(200).json({
      message: "Prediksi penjualan harian",
      prediction: Math.round(rows[0]?.prediction || 0)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan internal pada server." });
  }
};
module.exports = { getForecast };