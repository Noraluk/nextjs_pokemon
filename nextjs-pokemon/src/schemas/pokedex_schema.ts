import { z } from "zod";

const FromSchema = z.object({
  pokemonName: z.string().refine(
    (val) => !/[#?!@$%^&*-]/.test(val),
    { message: 'Pokemon must not contain special character' }),
});

export const PokemonSearching = FromSchema.omit({});

export type State = {
  errors?: {
    pokemonName?: string[];
  };
  message?: string | null;
};
 

export function isPokemonNameRight(pokemonName: string) {
  const validatedFields = PokemonSearching.safeParse({
    pokemonName: pokemonName,
  });
	
	return !validatedFields.success
}

