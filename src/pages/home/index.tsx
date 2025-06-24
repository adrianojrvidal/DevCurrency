import { useState, useEffect } from 'react'
import styles from './home.module.css';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const apiKey:string = 'd2db028fdc2a23f7'
const apiUrl:string = 'https://sujeitoprogramador.com/api-cripto/?key=' + apiKey + '&pref=BRL'
console.log(apiUrl)

interface CoinProps {
  name: string,
  delta_24h: string,
  price: string,
  symbol: string,
  volume_24h: string,
  market_cap: string,
  formatedPrice: string,
  formatedMarket: string
}

interface DataProps {
  coins: CoinProps[]
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([])

  useEffect ( ()=>{
    function getData() {
      fetch(apiUrl)
      .then(response => response.json())
      .then((data: DataProps) => {
        const coinsData = data.coins.slice(0, 15)

        const price = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        })

        const formatResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.price)),
            formatedMarket: price.format(Number(item.market_cap))
          }

          return formated
        })

        setCoins(formatResult)
      })
    }

    

    getData();
  }
  ,[])

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

