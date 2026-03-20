import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllPokemons, PokemonData, PokemonList } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl: string;
  private allPokemons: string[] = [];
  urlImgObservable = new BehaviorSubject<string>('');
  pokemonObservable = new BehaviorSubject<PokemonData | undefined>(undefined);
  loadingPokemons = new BehaviorSubject<boolean>(false);
  error = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.baseUrl = environment.pokeApi;
  }

  getPokemon(name: string): Observable<PokemonData> {
    return this.http.get<PokemonData>(this.baseUrl + name);
  }

  private loadAllPokemons(): Observable<string[]> {
    // Se já carregou antes, retorna imediatamente
    if (this.allPokemons.length > 0) {
      return of(this.allPokemons);
    }

    // Marca como carregando
    this.loadingPokemons.next(true);

    return this.http.get<any>(this.baseUrl + '?limit=2000').pipe(
      map((res) => res.results.map((p: any) => p.name)),
      tap((list) => {
        this.allPokemons = list; // salva em memória
        this.loadingPokemons.next(false); // para o loading
      }),
    );
  }

  search(term: string): Observable<string[]> {
    if (term.length < 3) return of([]);

    return this.loadAllPokemons().pipe(
      map((list) =>
        list
          .filter((name) => name.startsWith(term.toLowerCase()))
          .sort((a, b) => a.localeCompare(b))
          .slice(0, 5),
      ),
    );
  }
}
