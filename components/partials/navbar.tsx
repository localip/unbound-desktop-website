import { Tabs, Select, useTheme, Button } from '@geist-ui/core';
import React, { CSSProperties } from 'react';
import MoonIcon from '@geist-ui/icons/moon';
import { Unbound } from '@components/icons';
import SunIcon from '@geist-ui/icons/sun';
import { useRouter } from 'next/router';
import { useApp } from '@hooks';

import Classes from '@styles/nav.module.css';
import { LogIn } from '@geist-ui/icons';

export default function NavBar() {
   const [theme, toggleTheme] = useApp();
   const styles = useStyles();
   const router = useRouter();

   return <nav className={Classes.nav} style={styles.navbar}>
      <div className={Classes.container} style={styles.container}>
         <Unbound className={Classes.icon} width={45} height={45} />

         <div className={Classes.content}>
            <Tabs
               onChange={v => router.push(v)}
               style={styles.tabs}
               className={Classes.tabs}
               initialValue={router.pathname}
               hideDivider
               hideBorder
            >
               <Tabs.Item label='Home' value='/' />
               <Tabs.Item label='Plugins' value='/plugins' />
               <Tabs.Item label='Themes' value='/themes' />
               <Tabs.Item label='Developers' value='/developers' />
               <Tabs.Item label='FAQ' value='/faq' />
            </Tabs>

            <div className={Classes.actions} style={styles.buttonContainer}>
               <Button w={0} style={styles.themer} onClick={() => toggleTheme(!theme as any)}>
                  {theme ?
                     <MoonIcon className={Classes.theme} size={14} /> :
                     <SunIcon className={Classes.theme} size={14} />
                  }
               </Button>
               <Button w={0.5}>
                  <span style={styles.loginText}>
                     Login
                  </span>
                  <LogIn size={14} />
               </Button>
            </div>
         </div>
      </div >
   </nav >;
}

function useStyles(): Record<string, CSSProperties> {
   const styles = useTheme();

   return {
      navbar: {
         position: 'relative',
         top: 0,
         left: 0,
         right: 0,
         padding: 0,
         backdropFilter: 'saturate(180%) blur(5px)',
         backgroundColor: styles.palette.background,
         boxShadow: styles.expressiveness.shadowSmall,
         zIndex: 999,
         width: '100%',
         height: 'auto',
         display: 'flex',
         alignItems: 'center'
      },

      container: {
         width: '1200px',
         height: '100%',
         display: 'flex',
         alignItems: 'center',
         margin: '0 auto',
         paddingInline: 24
      },

      themer: {
         marginLeft: 'auto',
         padding: '0 12.5px',
         display: 'flex',
         alignItems: 'center'
      },

      tabs: {
         display: 'flex'
      },

      themeOption: {
         width: 'auto',
         height: '18px',
         display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center'
      },

      buttonContainer: {
         marginLeft: 'auto',
         gap: 12,
         display: 'flex',
         flexDirection: 'row'
      },

      loginText: {
         marginRight: 7.5
      }
   };
}