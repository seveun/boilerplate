import * as admin from 'firebase-admin';

if (process.env.FUNCTIONS_EMULATOR) {
  admin.initializeApp();
} else {
  // eslint-disable-next-line import/no-dynamic-require
  const serviceAccount = require(`${__dirname}/../../.serviceAccountKey.json`);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export default admin;
