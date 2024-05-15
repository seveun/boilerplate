import 'dotenv/config';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { envSchema } from '@/schemas/Env.schema';

let initEnv = false;
global.process.env.NODE_ENV = process.env.FUNCTIONS_EMULATOR === 'true' ? 'DEV' : 'PROD';

const client = new SecretManagerServiceClient();

async function getVault(secrets: { name: string; useEnv?: boolean }[]) {
  const vault = {} as Record<string, string>;
  await Promise.map(secrets, async ({ name, useEnv }) => {
    const envSecretName = useEnv ? `${process.env.NODE_ENV}_${name}` : name;
    const [version] = await client.accessSecretVersion({
      name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${envSecretName}/versions/latest`,
    });
    if (name && version?.payload?.data) {
      vault[name] = version?.payload?.data?.toString();
    }
  }, { concurrency: 30 });
  return vault;
}

export async function initOnlineEnv() {
  if (initEnv) return;
  console.log(`Initializing online env ${process.env.NODE_ENV}`);
  const vault = await getVault([
    { name: 'TEST_DATABASE_URL' },
  ]);
  const parseEnv = envSchema.parse({ ...process.env, ...vault });
  global.process.env = { ...global.process.env, ...parseEnv };
  initEnv = true;
  console.log('Online env initialized');
}
