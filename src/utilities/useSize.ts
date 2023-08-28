import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function useSize() {
  const xs = useMediaQuery({ query: "(max-width: 600px)" });
  const sm = useMediaQuery({ query: "(max-width: 960px)" });
  const md = useMediaQuery({ query: "(max-width: 1280px)" });
  const lg = useMediaQuery({ query: "(max-width: 1920px)" });

  const [size, setSize] = useState(determineSize(xs, sm, md, lg));

  useEffect(() => {
    setSize(determineSize(xs, sm, md, lg));
  }, [xs, sm, md, lg]);

  return size;
}

function determineSize(
  xs: boolean,
  sm: boolean,
  md: boolean,
  lg: boolean
): string {
  if (xs) return "xs";
  else if (sm) return "sm";
  else if (md) return "md";
  else if (lg) return "lg";
  else return "xl";
}
