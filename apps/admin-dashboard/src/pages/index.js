import Head from 'next/head';
import { usePageView } from '../hooks/use-page-view';
import { Layout as MarketingLayout } from '../layouts/marketing';
// import { HomeCta } from '../sections/home/home-cta';
// import { HomeFaqs } from '../sections/home/home-faqs';
import { HomeFeatures } from '../sections/home/home-features';
// import { HomeReviews } from '../sections/home/home-reviews';
import { HomeHero } from '../sections/home/home-hero';

const Page = () => {
  usePageView();

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
        {/* <HomeReviews />
        <HomeCta />
        <HomeFaqs /> */}
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
