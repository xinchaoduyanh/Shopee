// eslint-disable-next-line import/no-unresolved

import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return <div className='App bg-red-400'>{routeElements}</div>
}

export default App
