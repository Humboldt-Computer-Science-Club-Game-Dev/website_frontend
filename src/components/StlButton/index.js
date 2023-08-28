import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import sizeStore, { getDefault } from 'utilities/size';
import routeStore from 'utilities/routeStore';

export default function StlButton({
   children,
   style,
   standardClick,
   onClick,
   className,
   lightMode,
   ...props
}) {
   const [size, setSize] = useState(getDefault());
   useEffect(() => {
      let unsubscribe = sizeStore.subscribe(() => {
         setSize(sizeStore.getState());
      });
      return () => {
         if (unsubscribe) {
            unsubscribe();
         }
      };
   }, [size]);

   let buttonPaddingX = () => {
      switch (size) {
         case 'xs':
            return '3rem';
         case 'sm':
            return '4rem';
         case 'md':
            return '4rem';
         case 'lg':
            return '4rem';
         case 'xl':
            return '4rem';
         default:
            return '4rem';
      }
   };
   let onClickVar = createOnclick();
   let NewButton = styled(Button)({ padding: `1rem ${buttonPaddingX()}` });
   return (
      <NewButton
         style={{
            ...style,
            color: lightMode ? 'black' : 'white',
            borderColor: lightMode ? 'rgba(0, 0, 0, 0.5)' : 'white',
         }}
         className={`add-text-shadow ${className}`}
         onClick={onClickVar}
         {...props}
      >
         {children}
      </NewButton>
   );

   function createOnclick() {
      let newOnClick = onClick ? onClick : null;
      if (!onClick && standardClick && standardClick.type) {
         switch (standardClick.type) {
            case 'internalLink':
               newOnClick = buildInternalLinkFunction(standardClick.href);
               break;
            case 'externalLink':
               newOnClick = buildExternalLinkFunction(standardClick.href);
               break;
            default:
               newOnClick = buildExternalLinkFunction(standardClick.href);
               break;
         }
      }

      return newOnClick;
   }

   function buildInternalLinkFunction(href) {
      return () => {
         routeStore.dispatch({
            type: 'updateCurrentLocation',
            currentLocation: `${href}`,
         });
      };
   }
   function buildExternalLinkFunction(href) {
      return () => {
         window.location = href;
      };
   }
}
