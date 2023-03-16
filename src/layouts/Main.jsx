import React from 'react'
import useMockData from "../utils/mockData"
const Main = () => {
    const { error, initialize, progress, status } = useMockData()

    const handleClick = () => {
        console.log('init')
        initialize()
    }

    return(
        <div className='container mt-5'>
            <h3 className='display-4'>Initialization data in Fire Base</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}</li>
                {error && <li>Error: {error}</li>}
            </ul>
            <button onClick={handleClick} className='btn btn-primary'>Initialization</button>
        </div>
    )
}

export default Main