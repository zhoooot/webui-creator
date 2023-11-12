import React from 'react';
import Tabs from './components/tabs';
import Favorite from './components/favorite';
import Draft from './components/draft';
import Recent from './components/recent';
import SharedWithMe from './components/shared-with-me';
import Layout from '../global_components/layout';
import Header from './components/header';
const YourPage = () => {
  const tabData = [
    { 
      label: 'Recent', 
      content: <Recent /> },
    {
      label: 'Draft',
      content: <Draft />,
    },
    {
      label: 'Favorite',
      content: <Favorite />,
    },
    {
      label: 'Shared with me',
      content: <SharedWithMe />
    }
    // Add more tabs as needed
  ];

  return (
    <Layout>
      <Header />
      <div>
        <Tabs tabs={tabData} />
      </div>
    </Layout>
  );
};

export default YourPage;
