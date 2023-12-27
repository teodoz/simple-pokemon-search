import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonData } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl: string;
  urlImgObservable = new BehaviorSubject<string>('');
  pokemonObservable = new BehaviorSubject<PokemonData | undefined>(undefined);
  error = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.baseUrl = environment.pokeApi;
  }

  getPokemon(name: string): Observable<PokemonData> {
    return this.http.get<PokemonData>(this.baseUrl + name);
  }
}
