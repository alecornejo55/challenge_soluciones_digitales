import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { ClientesApp } from './ClientesApp'
// You can specify which plugins you need
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClientesApp />
  </React.StrictMode>,
)
