import Head from 'next/head';
import { Layout as MarketingLayout } from '../layouts/marketing';
import { HomeFeatures } from '../sections/home/home-features';
import { HomeHero } from '../sections/home/home-hero';

const Page = () => {
  return (
    <>
      <Head>
        <title>
          Dashboard | Admin 
        </title>
      </Head>
      <main>
        <HomeHero />
        <HomeFeatures />
      </main>
    </>
  );
};

Page.getLayout = (page) => (
  <MarketingLayout>
    {page}
  </MarketingLayout>
);

export default Page;
