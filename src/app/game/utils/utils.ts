import { SWSingleResult } from "@core/models/intefaces/common-response.interface";
import {SWCharacterProperties} from "@core/models/intefaces/character.interface";
import {SWStarshipProperties} from "@core/models/intefaces/starship.interface";

export const getRandomArrayElement = (array: SWSingleResult[], uidToExclude?: string): SWSingleResult => {
    if (uidToExclude) {
      const index = array.findIndex(e => e.uid === uidToExclude);
      array.splice(index, 1);
    }
    return array[(Math.floor(Math.random() * array.length))]
}

export const isCharacter = (f: SWCharacterProperties | SWStarshipProperties | undefined): f is SWCharacterProperties => {
  return (f as SWCharacterProperties).gender !== undefined;
}
export const isStarship = (f: SWCharacterProperties | SWStarshipProperties | undefined): f is SWStarshipProperties => {
  return (f as SWStarshipProperties).starship_class !== undefined;
}
