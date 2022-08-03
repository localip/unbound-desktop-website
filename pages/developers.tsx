import type Developer from '@typings/structures/developer';

import { Text, Divider, Input, Loading } from '@geist-ui/core';
import DeveloperCard from '@components/partials/developer';
import NavBar from '@components/partials/navbar';
import { Search } from '@geist-ui/icons';
import React from 'react';

interface Developers {
   data: Developer[];
   count: number;
}

export default function Developers(): React.ReactNode {
   const [developers, setDevelopers] = React.useState<Developers>();
   const [search, setSearch] = React.useState('');
   const styles = useStyles();

   React.useEffect(() => {
      fetch('api/developers').then(r => r.json()).then(setDevelopers);
   }, []);

   const devs = !search ? developers?.data : developers?.data.filter(dev => {
      if (~dev.username.toLowerCase().indexOf(search)) {
         return true;
      }

      return false;
   });

   return (<>
      <NavBar />
      <div style={styles.container}>
         <div style={styles.header}>
            <Text h3>Developers</Text>
            <div style={styles.search}>
               <Input
                  value={search}
                  clearable={true}
                  onChange={e => setSearch(e.target.value)}
                  placeholder='Search developers...'
                  iconRight={<Search />}
               />
            </div>
         </div>
         <Divider />
         {devs?.length ? <div style={styles.addonContainer}>
            {devs.map((dev): React.ReactNode => <DeveloperCard
               developer={dev}
            />)}
         </div> : <Loading style={styles.loading} />}
      </div>
   </>);
};

function useStyles(): Record<string, Styling> {
   return {
      container: {
         maxWidth: 1200,
         margin: '50px auto 0 auto',
         paddingInline: 24
      },
      loading: {
         marginTop: '15%'
      },
      card: {
         maxWidth: '20rem',
         maxHeight: '50rem',
         overflow: 'hidden'
      },
      addonContainer: {
         marginTop: '20px',
         gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
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