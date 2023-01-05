import Head from 'next/head'
import EventEmitter from 'stream'
import {useState, useEffect} from 'react'

export default function Home() {

  const pokeApiLink: string = 'https://pokeapi.co/api/v2/pokemon/'
  const [name, setName] = useState<string>('')
  const [pokemon, setPokemon] = useState<{name: string, sprites: string}>({name: "", sprites: ""})

  async function fetchPokemons(){
      const pokeData = await fetch(pokeApiLink.concat(name.toLowerCase()))
        .then
        (
        async(res) => 
              {
                if(res.status === 404)
                {
                  throw new Error("Pokémon não encontrado") // Verifica o erro de pokémon não encontrado
                }
                return await res.json()
              },
              (erro) => 
              {
              }
        )
        .then
        (
          (data) =>
            {
              if(data.name && data.sprites.front_default)
                {
                  return({name: data.name, sprites: data.sprites.front_default})
                }
            }
        )
      return pokeData
    }

  useEffect(() => {
    fetchPokemons()
    .then(
        (data) => 
        {
          if(data !== undefined){
            setPokemon({name: data?.name, sprites: data?.sprites})
          }
        }
        )
     .catch
        (
        e => 
          {
            //console.log(e)  Erro pokémon não encontrado
            setPokemon({name: "", sprites: ""})
          }
        )
  },[pokemon])

  return (
    <>
    <Head>
      <title>Poke Api</title>
    </Head>
    <main>
        <form>
          <input type="search" onChangeCapture={async (input) => {
            setName(input.currentTarget.value)
            await fetchPokemons()
            .then
              (
                (data) => 
                {
                if(data !== undefined)
                {
                  setPokemon({name: data?.name, sprites: data?.sprites})
                }
                }
              )
            .catch
                (
                e => 
                  {
                    // console.log(e) Erro pokemon not found
                    setPokemon({name: "", sprites: ""})
                  }
                )
          }}/>
        </form>
        <div> 
            {pokemon.name !== undefined?[pokemon].map((item, index) => {
              return(
                <>
                <span>{item.name}</span>
                <img src={item.sprites} alt={"Foto do pokémon: "+item.sprites} />
                </>
              )
            }):""}
        </div>
    </main>
    </>
  )
}
