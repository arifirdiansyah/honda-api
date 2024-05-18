import mongoose from 'mongoose';

export const connectDatabase = () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose
      .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}${process.env.DB_NAME}?retryWrites=true&w=majority&appName=skripsi`
      )
      .then(() => {
        console.log('Connection success');
      })
      .catch(err => {
        console.error(err);
      });
  } catch (e) {
    console.error(e);
    return e;
  }
};
