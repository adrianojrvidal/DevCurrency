import { useState, useEffect, type FormEvent } from 'react'
import styles from './home.module.css';
import { BiSearch } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

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
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate()


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

  function handleSearch (e: FormEvent) {
    e.preventDefault();

    if (inputValue ==="") return;

    navigate(`/detail/${inputValue}`)
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
          {coins.map(coin => (
            <tr className={styles.tr} key={coin.name}>
              <td className={styles.tdLabel} data-Label="Moeda">
                <Link to={'/detail/' + coin.symbol} className={styles.link}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-Label="Valor de Mercado">
                {coin.formatedMarket}
              </td>
              <td className={styles.tdLabel} data-Label="Preço">
                {coin.formatedPrice}
              </td>
              <td className={Number(coin?.delta_24h) >= 0 ? styles.tdProfit : styles.tdLoss} data-Label="Volume">
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}  
        </tbody>
      </table>
    </main>
  )
}

