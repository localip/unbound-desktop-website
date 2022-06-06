import type Developer from '@typings/structures/developer';
import { Card, useTheme } from '@geist-ui/core';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/router';

import effects from '@styles/addoncard.module.css';

interface AddonProps {
   developer: Developer;
}

export default function Developer({ developer }: AddonProps) {
   const styles = useStyles();
   const router = useRouter();

   return <Card
      style={styles.card}
      className={effects.card}
      onClick={() => router.push(`/developers/${developer.username}`)}
   >
      <Card.Content style={styles.cardContent}>
         <img
            loading='lazy'
            className={effects.image}
            // @ts-ignore
            style={styles.preview}
            src={developer.avatar}
         />
         <div style={styles.username}>
            {developer.username}
         </div>
      </Card.Content>
   </Card>;
}

function useStyles(): Record<string, CSSProperties> {
   const styles = useTheme();

   return {
      card: {
         width: '17.5rem',
         overflow: 'hidden',
         padding: 0,
         margin: 0,
         cursor: 'pointer'
      },
      cardContent: {
         padding: 0
      },
      preview: {
         display: 'flex',
         width: '17.5rem',
         height: '17.5rem',
         borderTopRightRadius: 5,
         borderTopLeftRadius: 5,
         backgroundColor: styles.palette.accents_1,
         objectFit: 'cover'
      },
      username: {
         margin: '10px 0',
         textAlign: 'center'
      }
   };
}