import { useSelector, Provider } from 'react-redux';

export default function App02() {
   let size = useSelector(size => size);
   return <div>This is it {size}</div>;
}
