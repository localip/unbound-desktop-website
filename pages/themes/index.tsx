import type Addon from '@typings/structures/addon';

import { Text, Divider, Input, Loading } from '@geist-ui/core';
import AddonCard from '@components/partials/addon';
import NavBar from '@components/partials/navbar';
import React, { CSSProperties } from 'react';
import { Search } from '@geist-ui/icons';
import { useServer } from '@hooks';

interface Themes {
   data: Addon[];
   count: number;
}

export default function Themes(): React.ReactNode {
   const [themes, setThemes] = React.useState<Themes>();
   const [search, setSearch] = React.useState('');
   const [{ data }, refetch] = useServer();
   const styles = useStyles();

   React.useEffect(() => {
      fetch('api/themes').then(r => r.json()).then(setThemes);
   }, []);

   const addons = !search ? themes?.data : themes?.data.filter(theme => {
      if (~theme.name.toLowerCase().indexOf(search)) {
         return true;
      } else if (~theme.description.toLowerCase().indexOf(search)) {
         return true;
      } else if (theme.author?.username.toLowerCase().includes(search)) {
         return true;
      }

      return false;
   });

   return (<>
      <NavBar />
      <div style={styles.container}>
         <div style={styles.header}>
            <Text h3>Themes</Text>
            <div style={styles.search}>
               <Input
                  value={search}
                  clearable={true}
                  onChange={e => setSearch(e.target.value)}
                  placeholder='Search themes...'
                  iconRight={<Search />}
               />
            </div>
         </div>
         <Divider />
         {addons?.length ? <div style={styles.addonContainer}>
            {addons.map((theme): React.ReactNode => <AddonCard
               items={data?.themes}
               refetch={refetch}
               key={theme.id}
               addon={theme}
               type='themes'
            />)}
         </div> : <Loading style={styles.loading} />}
      </div>
   </>);
};

function useStyles(): Record<string, CSSProperties> {
   return {
      container: {
         padding: '50px'
      },
      card: {
         maxWidth: '25rem',
         maxHeight: '50rem',
         overflow: 'hidden'
      },
      loading: {
         marginTop: '15%'
      },
      addonContainer: {
         marginTop: '20px',
         gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))',
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