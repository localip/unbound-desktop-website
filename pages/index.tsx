import { Text, Button, Spacer, useTheme } from '@geist-ui/core';

import NavBar from '@components/partials/navbar';
import Classes from '@styles/main.module.css';

export default function Home(): React.ReactNode {
   const styles = useStyles();

   return <>
      <NavBar />
      <section>
         <div className={Classes.container} style={styles.container}>
            <div style={styles.heroInfo}>
               <Text h1>
                  Unleash the chains
               </Text>
               <Text p>
                  Exceed limits your discord client has never seen before.
               </Text>
               <div className={Classes.buttons} style={styles.heroButtons}>
                  <Button type='secondary' onClick={() => open('/api/download', '_self')}>
                     Download
                  </Button>
                  <Button>
                     Learn More
                  </Button>
               </div>
               <Spacer w={5} />
            </div>
            <img
               className={Classes.image}
               style={styles.image}
               src='/discord.png'
            />
         </div>
      </section>
   </>;
};

function useStyles(): Record<string, Styling> {
   const theme = useTheme();

   return {
      container: {
         minHeight: 'clamp(420px, 75vh, 700px)',
         '--dots': theme.palette.accents_2,
         justifyContent: 'space-between',
         position: 'relative',
         alignItems: 'center',
         overflow: 'hidden',
         flexWrap: 'wrap',
         margin: '0 auto',
         display: 'flex',
         maxWidth: 1200,
         padding: 48,
         gap: 12
      },
      heroInfo: {
         position: 'relative'
      },
      heroButtons: {
         display: 'flex',
         marginTop: 20,
         gap: 8
      },
      image: {
         border: `1px solid ${theme.palette.border}`,
         background: theme.palette.accents_1,
         borderRadius: 8,
         width: 550
      }
   };
}