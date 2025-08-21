import { Injectable } from '@nestjs/common';
import { PokemonRepository } from './pokemon.repository';
import { Pokemon } from 'generated/prisma';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonDto } from './dto/pokemon.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PokemonService {
    constructor(private readonly pokemonRepository: PokemonRepository) {}
    
    async getAllPokemons(page: number, limit: number): Promise<PokemonDto[]> {
        const pokemons = await this.pokemonRepository.findAll(page, limit)
        return pokemons.map(pokemon => plainToInstance(PokemonDto, pokemon))
    }

    async createPokemon(data: CreatePokemonDto): Promise<PokemonDto> {
        const pokemon = await this.pokemonRepository.create(data)
        return plainToInstance(PokemonDto, pokemon)
    }

    async getAllPokemonsWithTrainer(): Promise<PokemonDto[]> {
        const pokemons = await this.pokemonRepository.findAllWithTrainer()
        return pokemons.map(pokemon => plainToInstance(PokemonDto, pokemon))
    }
}
