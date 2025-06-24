import styles from './home.module.css';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input 
          placeholder="Digite o símbolo da moeda" 
        />
        <button type='submit'> 
          <BiSearch size={30} color='#fff' />
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th scope='col'>Moeda</th>
            <th scope='col'>Valor de Mercado</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>
        <tbody id='tbody'>
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-Label="Moeda">
              <Link to='/detail/btc' className={styles.link}>
                <span>Bitcoin</span> | BTC
              </Link>
            </td>
            <td className={styles.tdLabel} data-Label="Valor de Mercado">
              R$ 1,23
            </td>
            <td className={styles.tdLabel} data-Label="Preço">
              R$ 1,23
            </td>
            <td className={styles.tdLoss} data-Label="Volume">
              <span>-50</span>
            </td>
          </tr>
          </tbody>
      </table>
    </main>
  )
}

