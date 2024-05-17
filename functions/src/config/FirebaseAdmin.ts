import * as admin from 'firebase-admin';

if (process.env.FUNCTIONS_EMULATOR) {
  admin.initializeApp({
    databaseURL: 'https://boilerplate-4e22b.europe-west1.firebasedatabase.app',
  });
} else {
  // eslint-disable-next-line import/no-dynamic-require
  const serviceAccount = require(`${__dirname}/../../.serviceAccountKey.json`);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://boilerplate-4e22b.europe-west1.firebasedatabase.app',
  });
}
export default admin;
