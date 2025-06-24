import styles from './notfound.module.css'
import { Link } from 'react-router-dom'

export function Notfound(){
  return(
    <div className={styles.container}>
      <h1>Pagina 404 nao existe</h1>
      <Link to="/">
        Acessar cripto moedas
      </Link>
    </div>
  )
}