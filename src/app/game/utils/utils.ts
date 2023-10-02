import { SWSingleResult } from "@core/models/intefaces/common-response.interface";

export const getRandomArrayElement = (array: SWSingleResult[]): SWSingleResult => {
    return array[(Math.floor(Math.random() * array.length))]
}