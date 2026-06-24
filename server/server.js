import { connectDB } from './src/config/db.js';
import {env} from './src/config/env.js';
import {app} from './app.js';

async function start(){
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`API listening on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();