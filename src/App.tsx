// eslint-disable-next-line import/no-unresolved

import { useContext, useEffect } from 'react'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return LocalStorageEventTarget.removeEventListener('clearLS', reset)
  }, [reset])
  return (
    <div className='App'>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
