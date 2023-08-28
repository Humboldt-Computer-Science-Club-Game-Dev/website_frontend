import React from 'react';
import { Typography } from '@material-ui/core';
import Space from './Space';
import './style.scss';
import StlParagraph from 'components/StlParagraph';

export default function RichText({ richText }) {
   let richArray = richText.formatedRichTextArray;
   let RichTextElements = [];
   let NewRichTextElement = null;
   let settings = richText.settings;

   for (let i = 0; i < richArray.length; i++) {
      let block = richArray[i];
      NewRichTextElement = createRichTextBlock(block, i, settings);

      if (NewRichTextElement) {
         RichTextElements.push(NewRichTextElement);
      }
   }

   return (
      <div className='rich-text-container' key={244}>
         {RichTextElements}
      </div>
   );
}

function createRichTextBlock(block, i, settings) {
   let NewRichTextElement = null;

   switch (whatKindOfComponentIsBlock(block)) {
      case 'type':
         NewRichTextElement = SRType({ block: block }, i, settings);
         break;
      case 'list':
         NewRichTextElement = SRList({ block: block }, i, settings);
         break;
      case 'image':
         NewRichTextElement = SRImage({ block: block }, i, settings);
         break;
      case 'newLine':
         NewRichTextElement = <Space key={i} />;
         break;
      default:
         NewRichTextElement = null;
         break;
   }

   return NewRichTextElement;
}

function SRImage(creationData, index, settings) {
   let { block } = creationData;
   let { alignment } = settings;
   let alignmentClasses = (alignment => {
      let classes = 'mx-auto';
      if (alignment === 'center') {
      } else if (alignment === 'left') {
      } else if (alignment === 'right') {
      }
      return classes;
   })(alignment);

   return (
      <img
         src={block.src}
         key={index}
         className={alignmentClasses}
         alt='rich text display'
      />
   );
}

function SRList(creationData, index, settings) {
   let { alignment } = settings;
   let { block } = creationData;
   settings.fromList = true;

   let liArray = createListItemArray(block.listElements, index, settings);

   if (block.type === 'ul')
      return (
         <ul key={index} className={alignment ? alignment : 'left'}>
            {liArray}
         </ul>
      );
   else if (block.type === 'ol')
      return (
         <ol key={index} className={alignment ? alignment : 'left'}>
            {liArray}
         </ol>
      );
}

function createListItemArray(listElements, index, settings) {
   let listArray = [];
   for (let i = 0; i < listElements.length; i++) {
      let listElement = listElements[i];
      let newLiElement = createRichTextBlock(listElement, i, settings);

      if (listElement.type !== 'ul' && listElement.type !== 'li') {
         listArray.push(<li key={i}>{newLiElement}</li>);
      } else {
         listArray.push(newLiElement);
      }
   }

   return listArray;
}

function SRType({ block }, index, settings) {
   let { spans, type } = block;
   let { alignment } = settings;
   let isParagraph = false;
   let variant = createValidVariantFromType(type);
   if (block.type === 'paragraph') {
      isParagraph = true;
   }
   /* if(settings.fromList){
      return(
         <li>
         <Typography
            variant={variant}
            paragraph={isParagraph}
            key={index}
            align={alignment ? alignment : 'left'}
         >
            <>{createFormatedInlineTexts(spans)}</>
         </Typography></li>
      );
   } */
   if (isParagraph)
      return (
         <StlParagraph key={index} align={alignment ? alignment : 'left'}>
            {createFormatedInlineTexts(spans)}
         </StlParagraph>
      );
   else
      return (
         <Typography
            variant={variant}
            paragraph={isParagraph}
            key={index}
            align={alignment ? alignment : 'left'}
         >
            <>{createFormatedInlineTexts(spans)}</>
         </Typography>
      );
}

function createValidVariantFromType(type) {
   let variant = null;
   if (variant !== 'paragraph') return type;
   return variant;
}

function createFormatedInlineTexts(spans) {
   return spans.map((span, i) => {
      let NewEle = createElementHierarchy(span, {
         currentIndex: 0,
         keyIndex: i,
      });
      return NewEle;
   });
}

function createElementHierarchy(span, indexes) {
   let { currentIndex, keyIndex } = indexes;
   let markups = span.markups;
   let markup = span.markups[currentIndex];
   let text = span.text;

   if (markups.length - 1 - currentIndex <= 0) {
      /* If at last markup in recursive loop */
      return createElementFromMarkupAndText(
         { markup: markup, keyIndex: keyIndex },
         text
      );
   } else {
      return createElementFromMarkupAndText(
         { markup: markup, keyIndex: keyIndex },
         createElementHierarchy(span, {
            currentIndex: ++currentIndex,
            keyIndex: keyIndex,
         })
      );
   }
}

function createElementFromMarkupAndText(eleData, inner) {
   let { markup, keyIndex } = eleData;
   switch (markup) {
      case 'em':
         return <em key={keyIndex}>{inner}</em>;
      case 'strong':
         return <strong key={keyIndex}>{inner}</strong>;
      case 'strike-through':
         return <strike key={keyIndex}>{inner}</strike>;
      case 'underline':
         return <u key={keyIndex}>{inner}</u>;
      default:
         if (typeof markup === 'object') {
            if (markup.type === 'link') {
               return (
                  <a href={markup.href} key={keyIndex}>
                     {inner}
                  </a>
               );
            }
         } else {
            return <span key={keyIndex}>{inner}</span>;
         }
   }
}

function whatKindOfComponentIsBlock(block) {
   let type = block.type;

   if (
      type === 'paragraph' ||
      type === 'h1' ||
      type === 'h2' ||
      type === 'h3' ||
      type === 'h4' ||
      type === 'h5' ||
      type === 'h6'
   ) {
      return 'type';
   } else if (type === 'ul' || type === 'ol') {
      return 'list';
   } else {
      return type;
   }
}
