import useRoutesElements from '@/hooks/useRoutesElements';

function App() {
  const routerDom = useRoutesElements();
  return <div className='w-full mx-auto'>{routerDom}</div>;
}

export default App;
