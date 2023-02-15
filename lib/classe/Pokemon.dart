// ignore: file_names
import 'dart:convert';

import 'package:http/http.dart' as http;
 
class Pokemon{
  String name;
  String url;
  static List<Pokemon> pokemonsList = [];
  Pokemon(this.name, this.url); 
  //'https://pokeapi.co/api/v2/pokemon?limit=300&offset=0'

  static void getAllPokemons(String url) async {

    Uri uri = Uri.parse(url);
    http.Response response = await http.get(uri);
    dynamic decode = jsonDecode(response.body);
    List<dynamic> pokemons = decode['results'];

    pokemons.forEach((pokemon){
      pokemonsList.add(Pokemon(pokemon['name'], pokemon['url']));
    });
  }

  void getAllPokemonsData(List<Pokemon> pokemons) {
    Pokemon.getAllPokemons('https://pokeapi.co/api/v2/pokemon?limit=300&offset=0');
    List<dynamic> pokemonsDatas = [];
    Pokemon.pokemonsList.forEach((pokemon) async { 
       http.Response response = await http.get(Uri.parse(pokemon.url));
       dynamic decode = jsonDecode(response.body);
       print(decode);
    });
  }
}