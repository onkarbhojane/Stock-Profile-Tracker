import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  symbol: String,
  quantity: Number,
  price: Number,
  type: String,
  date: { type: Date, default: Date.now }
});

const StockSchema = new mongoose.Schema({
  symbol: String,
  quantity: Number,
  avgPrice: Number,
  totalInvested: Number
});

const UserSchema = new mongoose.Schema({
  Name: String,
  EmailID: { type: String, unique: true },
  Password: String,
  ProfileImage: String,
  PhoneNo: { type: String, default: '0' },
  Stocks: [StockSchema],
  TotalAmount: { type: Number, default: 10000 },
  WalletAmount: { type: Number, default: 10000 },
  isVerified: { type: Boolean, default: false },
  Transactions: [TransactionSchema]
});

const User = mongoose.model('User', UserSchema);
export default User;