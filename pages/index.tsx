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
                  Unleash the chains.
               </Text>
               <Text p>Exceed limits your discord client has never seen before.</Text>
               <div style={styles.heroButtons}>
                  <Button type='secondary' onClick={() => open('https://codeload.github.com/powercord-org/powercord/zip/refs/heads/v2', '_self')}>Download</Button>
                  <Button>Learn More</Button>
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

function useStyles() {
   const theme = useTheme();

   return {
      container: {
         '--dots': theme.palette.accents_2,
         maxWidth: 1200,
         margin: '0 auto',
         display: 'flex',
         flexWrap: 'wrap',
         justifyContent: 'space-between',
         alignItems: 'center',
         minHeight: 'clamp(420px, 75vh, 700px)',
         gap: 12,
         padding: 48
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
         width: 550,
         background: theme.palette.accents_1,
         border: `1px solid ${theme.palette.border}`,
         borderRadius: 8
      }
   };
}