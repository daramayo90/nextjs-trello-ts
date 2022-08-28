import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongooConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooConnection.isConnected) {
    console.log('MongoDB Connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState;

    if (mongooConnection.isConnected === 1) {
      console.log('Using previous connection');
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect('....');
  mongooConnection.isConnected = 1;
  console.log('Connecting to MongoDB: ', '....');
};

export const disconnect = async () => {
  if (mongooConnection.isConnected !== 0) return;

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};
