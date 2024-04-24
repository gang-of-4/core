import Head from 'next/head';
import { Layout as MarketingLayout } from '../layouts/marketing';
import { HomeFeatures } from '../sections/home/home-features';
import { HomeHero } from '../sections/home/home-hero';
import { config } from 'ui/config';

const Page = () => {
  return (
    <>
      <Head>
        <title>
          {config.platformName} | Admin
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
