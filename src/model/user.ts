import mongoose, { Schema } from 'mongoose';

export type TUser = {
  _id: string;
  telegramId: string;
  coin: number;
  refferalCode?: string;
  refferalFrom?: string;
  refferalUserIds?: string[];
  createdAt?: any;
  updatedAt?: any;
};

const UserSchema = new Schema<Omit<TUser, 'id'>>(
  {
    telegramId: { type: String, required: true, unique: true },
    coin: { type: Number, default: 0 },
    refferalCode: {
      type: String,
      unique: true,
      default: () => {
        return new mongoose.Types.ObjectId().toHexString();
      },
      required: true,
    },
    refferalFrom: { type: String, default: '' },
    refferalUserIds: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const ModelUser = mongoose.model<TUser>('User', UserSchema);

export default ModelUser;

//Module User

async function addUser(telegramId: string, refferalCode?: string) {
  let data = {};

  if (refferalCode) {
    const userRefferal = await ModelUser.findOneAndUpdate(
      { refferalCode },
      {
        $push: {
          refferalUserIds: telegramId,
        },
      }
    ).select('telegramId');

    if (!userRefferal) {
      throw new Error('Kode refferal tidak ditemukan');
    }

    data = {
      refferalFrom: userRefferal.telegramId,
    };
  }

  const user = new ModelUser({
    ...data,
    telegramId,
  });

  await user.save();

  return user;
}

async function getUser(telegramId: string) {
  const user = await ModelUser.findOne({ telegramId });

  return user;
}

async function updateUser(telegramId: string, coin: number) {
  const user = await ModelUser.findOneAndUpdate(
    { telegramId },
    { coin },
    { new: true }
  );

  return user;
}

async function deleteUser(telegramId: string) {
  const user = await ModelUser.findOneAndDelete({
    telegramId,
  });

  return user;
}

export const ModuleUser = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
