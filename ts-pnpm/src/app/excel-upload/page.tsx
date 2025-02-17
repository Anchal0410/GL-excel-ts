import { NextPage } from 'next';
import Head from 'next/head';
import ExcelUploader from '../components/excel/ExcelUploader';
import Layout from '../components/layout';

const Page: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Excel Upload - NextJS Starter</title>
      </Head>
      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen py-20'>
            <h1 className='text-3xl font-bold text-gray-800 mb-8'>
              Excel File Upload
            </h1>
            <ExcelUploader />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Page;
