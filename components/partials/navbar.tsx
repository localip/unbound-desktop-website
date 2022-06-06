import { Tabs, Select, useTheme } from '@geist-ui/core';
import React, { CSSProperties } from 'react';
import MoonIcon from '@geist-ui/icons/moon';
import { Unbound } from '@components/icons';
import SunIcon from '@geist-ui/icons/sun';
import { useRouter } from 'next/router';
import { useApp } from '@hooks';

import IconStyles from '@styles/themer.module.css';

export default function NavBar() {
   const [theme, toggleTheme] = useApp();
   const styles = useStyles();
   const router = useRouter();

   return <nav style={styles.navbar}>
      <div style={styles.container}>
         <Unbound width={45} height={45} />

         <Tabs
            onChange={v => router.push(v)}
            style={styles.tabs}
            initialValue={router.pathname}
            hideDivider
            hideBorder
         >
            <Tabs.Item label='Home' value='/' />
            <Tabs.Item label='Plugins' value='/plugins' />
            <Tabs.Item label='Themes' value='/themes' />
            <Tabs.Item label='Contributors' value='/constributors' />
            <Tabs.Item label='Developers' value='/developers' />
            <Tabs.Item label='FAQ' value='/faq' />
         </Tabs>

         <Select
            style={styles.themer}
            h='28px'
            scale={0.5}
            pure={true}
            title='Switch Themes'
            value={String(theme)}
            onChange={v => Number(v) !== theme && toggleTheme()}
         >
            <Select.Option value='0'>
               <span style={styles.themeOption}>
                  {/* These don't take the styles object for some reason???? */}
                  <MoonIcon className={IconStyles.theme} size={14} /> Dark
               </span>
            </Select.Option>
            <Select.Option value='1'>
               <span style={styles.themeOption}>
                  <SunIcon className={IconStyles.theme} size={14} /> Light
               </span>
            </Select.Option>
         </Select>
      </div>
   </nav>;
}

function useStyles(): Record<string, CSSProperties> {
   const styles = useTheme();

   return {
      navbar: {
         top: 0,
         left: 0,
         right: 0,
         paddingRight: 0,
         backdropFilter: 'saturate(180%) blur(5px)',
         backgroundColor: styles.palette.background,
         boxShadow: styles.expressiveness.shadowSmall,
         zIndex: 999,
         width: '100%',
         height: '3.5rem',
         display: 'flex',
         alignItems: 'center'
      },

      container: {
         width: '100%',
         height: '3.5rem',
         display: 'flex',
         alignItems: 'center',
         margin: '0 15px'
      },

      themer: {
         width: '85px',
         minWidth: '85px',
         marginLeft: 'auto'
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
      }
   };
}