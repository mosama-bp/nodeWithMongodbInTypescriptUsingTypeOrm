// import dotenv from 'dotenv'

// dotenv.config();

// export const secretKey: string | undefined = process.env.SECRET_KEY

import { config } from 'dotenv';

config();

export const {
  MONGO_USER,
  MONGO_PASSWORD,
  CLUSTER_URL,
  SECRET_KEY
} = process.env as {
  [key: string]: string;
};

// PORT = 4000
// SECRET_KEY = mySecretKey
// MONGO_USER = bitsproosama11
// MONGO_PASSWORD = bitspro11lL$
// CLUSTER_URL = cluster0.1lrztxu.mongodb.net
// TOKEN = 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