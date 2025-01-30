import { getLocaleProps } from '@locales/i18n';
import _ from 'lodash';
import type { GetServerSidePropsContext } from 'next';
import getConfig from './getConfig';
import { getUser, requireAuth } from './supabaseAuth';

export default function getServerSideData(authRequired = false) {
  return getLocaleProps(async (context: GetServerSidePropsContext) => {
    const configContext = await getConfig();
    const authContext = authRequired
      ? await requireAuth(context)
      : await getUser(context);

    return _.merge(configContext, authContext);
  });
}
