import type Addon from '@typings/structures/addon';

import { Text, Divider, Input, Loading } from '@geist-ui/core';
import AddonCard from '@components/partials/addon';
import NavBar from '@components/partials/navbar';
import { Search } from '@geist-ui/icons';
import { useServer } from '@hooks';
import React from 'react';

interface Plugins {
   data: Addon[];
   count: number;
}

export default function Plugins(): React.ReactNode {
   const [plugins, setPlugins] = React.useState<Plugins>();
   const [search, setSearch] = React.useState('');
   const [{ data }, refetch] = useServer();
   const styles = useStyles();

   React.useEffect(() => {
      fetch('api/plugins').then(r => r.json()).then(setPlugins);
   }, []);

   const addons = !search ? plugins?.data : plugins?.data.filter(plugin => {
      if (~plugin.name.toLowerCase().indexOf(search)) {
         return true;
      } else if (~plugin.description.toLowerCase().indexOf(search)) {
         return true;
      } else if (plugin.author?.username.toLowerCase().includes(search)) {
         return true;
      }

      return false;
   });

   return (<>
      <NavBar />
      <div style={styles.container}>
         <div style={styles.header}>
            <Text h3 style={styles.title}>Plugins</Text>
            <div style={styles.search}>
               <Input
                  value={search}
                  clearable={true}
                  onChange={e => setSearch(e.target.value)}
                  placeholder='Search plugins...'
                  iconRight={<Search />}
               />
            </div>
         </div>
         <Divider />
         {addons?.length ? <div style={styles.addonContainer}>
            {addons.map((plugin): React.ReactNode => <AddonCard
               items={data?.plugins}
               refetch={refetch}
               key={plugin.id}
               addon={plugin}
               type='plugins'
            />)}
         </div> : <Loading style={styles.loading} />}
      </div>
   </>);
};

function useStyles(): Record<string, Styling> {
   return {
      container: {
         maxWidth: 1200,
         padding: 50,
         margin: '0 auto',
         paddingInline: 24
      },
      card: {
         maxWidth: '25rem',
         maxHeight: '50rem',
         overflow: 'hidden'
      },
      loading: {
         marginTop: '15%'
      },
      title: {
         marginRight: 20
      },
      addonContainer: {
         marginTop: '20px',
         gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))',
         justifyItems: 'center',
         display: 'grid',
         gridGap: '20px',
         alignItems: 'stretch'
      },
      header: {
         display: 'flex'
      },
      search: {
         marginLeft: 'auto'
      }
   };
}