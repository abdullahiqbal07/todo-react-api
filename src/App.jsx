
import * as React from 'react';
import Task2 from './api/Api'
import { Loader } from './Loader';
function App() {
  const [isDataLoading, setIsDataLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setIsDataLoading(false), 1000)
  }, [])
  if (isDataLoading) {
    return <Loader />
  }
  return (
    <>
      <Task2 />
    </>
  )
}

export default App
