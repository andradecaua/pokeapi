import Head from 'next/head'
import {useState, useEffect} from 'react'

const pokemonsLimit = ['10', '20', '30', '40', '50']

export default function Home() {

  const pokeApiLink: string = 'https://pokeapi.co/api/v2/pokemon?limit='
  const [limit, setLimit] = useState<string>('10')
  const [pokemons, setPokemons] = useState()

  async function fetchPokemons(){
    fetch(pokeApiLink.concat(limit)).then(async data => {setPokemons(await data.json())}).finally(() => {console.log(pokemons)})
  }

  useEffect(() => {
    fetchPokemons()
  },[])

  return (
    <>
    <Head>
      <title>Poke Api</title>
    </Head>
    <main>
      <select>
          {pokemonsLimit.map((item, index) => {
            return(
              <option key={index} value={item} onSelect={ async () => {
                setLimit(item)
                fetchPokemons()
              }}>{item}</option>
            )
          })}
        </select>
    </main>
    </>
  )
}
