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

export const isCharacter = (item: SWCharacterProperties | SWStarshipProperties | undefined): item is SWCharacterProperties => {
  return (item as SWCharacterProperties).gender !== undefined;
}
export const isStarship = (item: SWCharacterProperties | SWStarshipProperties | undefined): item is SWStarshipProperties => {
  return (item as SWStarshipProperties).starship_class !== undefined;
}
