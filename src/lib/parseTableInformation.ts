import { type Result } from './types';

export const parseCharacterTable = (characters: Result[]) => {
  const ALLOWED_CHARACTERS_HEADERS = [
    'name',
    'status',
    'species',
    'gender',
    'origin',
    'location',
  ];

  const charactersHeaders = Object.keys(characters[0]).filter((key) =>
    ALLOWED_CHARACTERS_HEADERS.includes(key),
  );

  const charactersInformation = characters.map((character) => {
    const characterInformation: Record<string, string> = {};

    charactersHeaders.forEach((header) => {
      if (header === 'origin' || header === 'location') {
        characterInformation[header as keyof Result] = character[header].name;
        return;
      }

      characterInformation[header] =
        character[header as keyof typeof character.location];
    });

    return characterInformation;
  });

  return { charactersHeaders, charactersInformation };
};
