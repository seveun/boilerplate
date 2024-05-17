import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export function withTranslations(namespace: string[]) {
  return async function getStaticProps(props: any) {
    return {
      props: {
        ...props,
        ...(await serverSideTranslations(props?.locale, namespace)),
      },
    };
  };
}
