import getServerSideData from '@/hoc/getServerSideData';

export const getServerSideProps = getServerSideData();

const IndexPage = () => {
  return <div>Welcome</div>;
};

export default IndexPage;
