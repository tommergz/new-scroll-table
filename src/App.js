import React from 'react'
import {Grid} from './components/grid/Grid'

const App = () => {
  return (
    <>
      <Grid 
        columns={10}
        rows={500}
        rowHeight={40}
      />
    </>
  )
}

export default App
