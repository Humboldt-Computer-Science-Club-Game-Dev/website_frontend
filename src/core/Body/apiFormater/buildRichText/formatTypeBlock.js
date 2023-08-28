export default function formatTypeBlock(rawB) {
   let type = rawB.style === 'normal' ? 'paragraph' : rawB.style;
   let spans = [];
   let newSpan;
   rawB.children.forEach((child, i) => {
      newSpan = null;
      newSpan = buildFormatedSpans(rawB, i);

      if (newSpan) spans.push(newSpan);
   });

   let block = { type: type, spans: spans };

   return block;
}

function buildFormatedSpans(rawB, childIndex) {
   let child = rawB.children[childIndex];
   let markups = buildSpanMarksArray(rawB, childIndex);
   let span = { text: child.text, markups: markups };

   return span;
}

function buildSpanMarksArray(rawB, childIndex) {
   let marksArray = [];

   rawB.children[childIndex].marks.forEach(rawMark => {
      switch (rawMark) {
         case 'strong':
            marksArray.push(rawMark);
            break;
         case 'em':
            marksArray.push(rawMark);
            break;
         case 'underline':
            marksArray.push(rawMark);
            break;
         case 'strike-through':
            marksArray.push(rawMark);
            break;
         default:
            marksArray.push(buildLinkMark(rawB, rawMark));
            break;
      }
   });

   return marksArray;
}

function buildLinkMark(rawB, rawMark) {
   let href = 'Error, this value should have been set';
   for (let i = 0; i < rawB.markDefs.length; i++) {
      let currentDef = rawB.markDefs[i];
      if (rawMark === currentDef._key) {
         href = currentDef.href;
      }
   }

   return {
      type: 'link',
      href: href,
   };
}
