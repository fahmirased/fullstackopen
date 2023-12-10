import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'
import './index.css'

axios.get('/127.0.0.1:3001/api/persons')
  .then(response => {
  const persons = response.data
  console.log(persons)
  ReactDOM.createRoot(document.getElementById('root')).render(<App persons={persons} />)
})