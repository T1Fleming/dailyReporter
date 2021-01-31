import React from 'react';
import axios from 'axios'

class ToDo extends React.Component {
    render() {
        console.log('Executor')
        axios.get('http://localhost:8000/advice').then((resp) => {
            console.log(resp)
        })

        return (
            <div>
                <h1>To Do List:</h1>
                <p>This will be the to do listss</p>
            </div>
        )
    }
}

export default ToDo;