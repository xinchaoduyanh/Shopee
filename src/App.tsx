// eslint-disable-next-line import/no-unresolved

import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const routeElements = useRouteElements()
  return (
    <div className='App'>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
