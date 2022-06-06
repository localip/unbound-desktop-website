import { Text, Button, Card, Image, useTheme, Avatar, Link, Spacer } from '@geist-ui/core';
import { Download, Heart } from '@geist-ui/icons';
import effects from '@styles/addoncard.module.css';
import type Addon from '@typings/structures/addon';
import { useRouter } from 'next/router';
import { CSSProperties } from 'react';
import { formatUnit } from '@util';

interface AddonProps {
   addon: Addon;
   refetch: () => void;
   items: string[] | undefined;
   type: string;
}

export default function Addon({ addon, refetch, items, type }: AddonProps) {
   const isInstalled = items?.includes(addon.id);
   const styles = useStyles();
   const router = useRouter();

   return <Card
      style={styles.card}
      className={effects.card}
      onClick={() => router.push(`/${type}/${addon.id}`)}
   >
      <Image
         loading='lazy'
         className={effects.image}
         src={addon.previews?.[0] ?? '/assets/package_placeholder.svg'}
         style={styles.preview}
         onError={({ currentTarget }) => currentTarget.src = '/assets/package_placeholder.svg'}
      />
      <div style={styles.header}>
         <Text style={styles.name} small h4 b>
            {addon.name}
         </Text>
         <div style={styles.stats}>
            <Download size={16} />
            <Text small>
               {formatUnit(addon.downloads)}
            </Text>
            <Heart size={16} />
            <Text small>
               {formatUnit(addon.likes)}
            </Text>
         </div>
      </div>
      {addon.description}
      <div style={styles.footer}>
         {addon.author && <>
            <Avatar src={addon.author.avatar} />
            <Spacer w={0.5} />
            <Link href={`/developers/${addon.author.username}`}>
               {addon.author.username}
            </Link>
         </>}
         <Button
            disabled={!items || isInstalled}
            style={styles.install}
            onClick={async () => {
               try {
                  await fetch(`http://localhost:5858/install?type=${addon.type}&url=${encodeURIComponent(addon.url)}&name=${addon.name}`);
                  refetch();
               } catch (e) {
                  console.log(e);
               }
            }}
         >
            {!items ? 'Unbound Not Open' : isInstalled ? 'Installed' : 'Install'}
         </Button>
      </div>
   </Card>;
}

function useStyles(): Record<string, CSSProperties> {
   const styles = useTheme();

   return {
      name: {
         margin: '0'
      },
      stats: {
         display: 'flex',
         alignItems: 'center',
         marginLeft: 'auto',
         gap: '.35rem'
      },
      header: {
         display: 'flex',
         width: '100%',
         marginBottom: '10px'
      },
      card: {
         maxWidth: '25rem',
         maxHeight: '35rem',
         overflow: 'hidden',
         cursor: 'pointer'
      },
      preview: {
         borderRadius: '5px',
         alignItems: 'center',
         color: styles.palette.accents_3,
         display: 'flex',
         justifyContent: 'center',
         height: '250px',
         backgroundColor: styles.palette.accents_1,
         objectFit: 'cover'
      },
      footer: {
         marginTop: '10px',
         display: 'flex',
         alignItems: 'center'
      },
      install: {
         marginLeft: 'auto'
      }
   };
}