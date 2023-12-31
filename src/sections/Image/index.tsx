import { MouseEventHandler } from 'react';

type Props = {
   onClick: MouseEventHandler;
   text: string;
};

export default ({ onClick, text }: Props) => (
   <button onClick={onClick}>{text}</button>
);
