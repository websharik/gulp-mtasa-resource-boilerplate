/** @noSelfInFile */

import { Element } from 'mtasa-lua-types/types/mtasa/server/oop/Element'

export function getElementSpeed(theElement: Element, unit: string): number

export function setElementSpeed(
    theElement: Element,
    unit: string,
    speed: number,
): boolean