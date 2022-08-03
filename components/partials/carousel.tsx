import { useTheme } from '@geist-ui/core';
import { ArrowLeft, ArrowRight } from '@geist-ui/icons';
import React, { CSSProperties, ReactNode } from 'react';
import { useSpringCarousel } from 'react-spring-carousel';

interface CarouselProps {
   [key: string]: any;
}

export default function Carousel({ children, items, ...props }: CarouselProps) {
   const styles = useStyles();

   const {
      carouselFragment,
      slideToPrevItem,
      slideToNextItem
   } = useSpringCarousel({
      gutter: 24,
      withLoop: true,
      items: items.map((item: ReactNode, index: number) => ({
         id: index,
         renderItem: <div key={index} style={styles.itemContainer} >
            {item}
         </div>
      })),
   });

   return (
      <div {...props} style={{ ...props.style ?? {}, ...styles.wrapper }}>
         <div style={styles.arrowWrapper} onClick={slideToPrevItem}>
            <ArrowLeft size={32} style={styles.arrow} />
         </div>
         {carouselFragment}
         <div style={styles.arrowWrapper} onClick={slideToNextItem}>
            <ArrowRight size={32} style={styles.arrow} />
         </div>
      </div>
   );
};

function useStyles(): Record<string, CSSProperties> {
   const styles = useTheme();

   return {
      wrapper: {
         display: 'flex',
         userSelect: 'none',
         overflow: 'hidden'
      },
      arrowWrapper: {
         zIndex: 9999,
         display: 'flex',
         alignItems: 'center',
         cursor: 'pointer',
         userSelect: 'none'
      },
      itemContainer: {
         display: 'flex',
         position: 'relative',
         marginRight: 0,
         flex: '1 0 calc(100% / 1 - 0px)',
         alignItems: 'center'
      },
      arrow: {
         appearance: 'none',
         zIndex: 99999,
         background: styles.palette.accents_1,
         color: styles.palette.foreground
      }
   };
}