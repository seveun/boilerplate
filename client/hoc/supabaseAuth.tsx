import { createClient } from '@/utils/supabase/server-props';
import { GetServerSideProps } from 'next';

export const requireAuth: GetServerSideProps = async (context) => {
  const supabase = createClient(context);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return {
      redirect: {
        destination: '/?auth=required',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export const getUser: GetServerSideProps = async (context) => {
  try {
    const supabase = createClient(context);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return {
      props: {
        user: !error ? user : null,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
      },
    };
  }
};
