import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import styles from './detail.module.css'

//https://coinlib.io/api/v1/coin?key=b4cd8f8fb3de94c6&symbol=BTC
const apiKey:string = 'd2db028fdc2a23f7'
const apiUrl:string = 'https://sujeitoprogramador.com/api-cripto/coin/?key=' + apiKey + '&pref=BRL' 

interface CoinProp{
  symbol: string;
  name: string;
  price: string;
  market_cap: string;
  total_volume_24h: string;
  low_24h: string;
  high_24h: string;
  delta_24h: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowprice:  string;
  formatedHighprice:  string;
  numberDelta: number;
  error?: string;
}

export function Detail() {
  const { cripto } = useParams();
  const [detail, setDetail] = useState<CoinProp>()
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    async function getData(){
      fetch(apiUrl + '&symbol=' + cripto )
      .then(response => response.json())
      .then((data: CoinProp) => {

        if(data.error){
          navigate("/")
        }

        const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }); 

        const resultData = {
          ...data,
          formatedPrice: price.format(Number(data.price)),
          formatedMarket: price.format(Number(data.market_cap)),
          formatedLowprice:  price.format(Number(data.low_24h)),
          formatedHighprice:  price.format(Number(data.high_24h)),
          numberDelta: parseFloat(data.delta_24h.replace(",", "."))
        }

        setDetail(resultData)
        setLoading(false);


      })
    }

    getData()
  }, [cripto])


  if(loading){
    return(
      <div className={styles.container}>
        <h4  className={styles.center}>Carregando informações...</h4>
      </div>
    )
  }

  return (
  <div className={styles.container}>
    <h1 className={styles.center}>{detail?.name}</h1>
    <p className={styles.center}>{detail?.symbol}</p>

    <section className={styles.content}>
      <p><strong>Preço:</strong> {detail?.formatedPrice}</p>
      <p><strong>Maior preço 24h:</strong> {detail?.formatedHighprice}</p>
      <p><strong>Menor preço 24h:</strong> {detail?.formatedLowprice}</p>
      <p>
        <strong>Delta 24h:</strong> 
        <span className={detail?.numberDelta && detail?.numberDelta >= 0 ? styles.profit : styles.loss}>
          {detail?.delta_24h}
        </span>
      </p>
      <p><strong>Valor mercado:</strong> {detail?.formatedMarket}</p>

    </section>
  </div>
  )
}
