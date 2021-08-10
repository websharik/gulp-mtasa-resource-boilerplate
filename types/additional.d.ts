/** You can insert any not declared definitions here (or in another file in this folder)
 * If you have any requests, you can easily submit them here:
 * https://github.com/mtasa-typescript/mtasa-lua-types/issues
 **/
import { Element } from 'mtasa-lua-types/types/mtasa/server/oop/Element'

declare var https: any

/** @noSelf */
declare function getElementSpeed(theElement: Element, unit: string): number
/** @noSelf */
declare function setElementSpeed(
    theElement: Element,
    unit: string,
    speed: number,
): boolean
