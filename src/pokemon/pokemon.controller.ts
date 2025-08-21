import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Pokemon } from 'generated/prisma';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { PokemonDto } from './dto/pokemon.dto';

@Controller('pokemons')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Get()
    async getAllPokemons(
        @Query("page") page: number,
        @Query("limit") limit: number,
    ): Promise<PokemonDto[]> {
        return this.pokemonService.getAllPokemons(page, limit)
    }

    @Post()
    async createPokemon(@Body() data: CreatePokemonDto): Promise<PokemonDto> {
        return this.pokemonService.createPokemon(data)
    }

    @Get('with-trainer')
    async getAllPokemonsWithTrainer(): Promise<PokemonDto[]> {
        return this.pokemonService.getAllPokemonsWithTrainer()
    }

}
