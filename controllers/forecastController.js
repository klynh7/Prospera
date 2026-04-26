const { Transaction } = require('../models');
const { Sequelize } = require('sequelize');

// mengambil prediksi penjualan harian (Sales Forecasting)
const getForecast = async (req, res) => {
  try {
    const userId = req.user.id;

    // ambil total penjualan per hari
    const dailyData = await Transaction.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('transaction_datetime')), 'date'],
        [Sequelize.fn('SUM', Sequelize.col('total_amount')), 'daily_total']
      ],
      where: {
        user_id_fk: userId
      },
      group: [Sequelize.fn('DATE', Sequelize.col('transaction_datetime'))],
      raw: true
    });

    // hitung rata-rata (AVG) manual di JS
    let total = 0;
    dailyData.forEach(item => {
      total += Number(item.daily_total);
    });

    const prediction = dailyData.length > 0
      ? Math.round(total / dailyData.length)
      : 0;

    res.status(200).json({
      message: "Prediksi penjualan harian",
      prediction: prediction
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan internal pada server." });
  }
};

module.exports = { getForecast };