import { useRef, useEffect } from 'react';

export default function useHasChanged(val) {
   const prevVal = usePrevious(val);
   return prevVal !== val;
}
function usePrevious(value) {
   const ref = useRef();
   useEffect(() => {
      ref.current = value;
   });
   return ref.current;
}
