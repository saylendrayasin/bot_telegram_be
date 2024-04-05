import express from 'express';
import { ModuleUser } from '../model/user';

const RouterUser = express.Router();

RouterUser.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const user = await ModuleUser.getUser(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: true,
      data: user,
      message: 'Success',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
});

RouterUser.post('/', async (req, res) => {
  try {
    const telegramId = req.body.telegramId;

    if (!telegramId) {
      return res.status(400).json({
        status: false,
        message: 'Telegram ID is required',
      });
    }

    const user = await ModuleUser.addUser(telegramId);

    res.status(200).json({
      status: true,
      data: user,
      message: 'Success',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
});

RouterUser.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const coin = req.body.coin;

    if (!coin) {
      return res.status(400).json({
        status: false,
        message: 'Coin is required',
      });
    }

    const user = await ModuleUser.updateUser(id, coin);

    res.status(200).json({
      status: true,
      data: user,
      message: 'Success',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
});

module.exports = RouterUser;
