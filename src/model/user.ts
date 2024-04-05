import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema<Omit<TUser, 'id'>>(
  {
    telegramId: { type: String, required: true },
    coin: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const ModelUser = mongoose.model<TUser>('User', UserSchema);

export default ModelUser;

//Module User

async function addUser(telegramId: string) {
  const user = new ModelUser({ telegramId });

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
