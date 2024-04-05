require('dotenv').config();

export default class Config {
  static PORT = process.env.PORT || 5001;
  static DATABASE = `${process.env.DATABASE}`;
}
