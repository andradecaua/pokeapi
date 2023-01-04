import Head from 'next/head'
import EventEmitter from 'stream'
import {useState, useEffect} from 'react'

const pokemonsLimit = ['10', '20', '30', '40', '50']


export default function Home() {

  const pokeApiLink: string = 'https://pokeapi.co/api/v2/pokemon?limit='
  const [limit, setLimit] = useState<string>('10')
  const [pokemons, setPokemons] = useState<[{name: string, url: string}]>()

  async function fetchPokemons(){
    const data = await fetch(pokeApiLink.concat(limit)).then(async (data) => {return await data.json()})
    return await data
  }

  useEffect(() => {
     fetchPokemons().then((data) => {
        setPokemons(data.results)
     })
  },[pokemons])

  return (
    <>
    <Head>
      <title>Poke Api</title>
    </Head>
    <main>
      <span>{limit}</span>
      <select  onChange={async (value) => {
                const newLimit = value.currentTarget.value
                setLimit(newLimit)
                fetchPokemons().then((data) => {
                  setPokemons(data.results)
               })
              }}>
          {pokemonsLimit.map((item, index) => {
            return(
              <option key={index} value={item}>{item}</option>
            )
          })}
        </select>
        <div>

          {pokemons !== undefined?pokemons.map(item => {
            return(
              <div>
                <span>{item.name}</span>
              </div>
            )
          }):""}
        </div>
    </main>
    </>
  )
}
