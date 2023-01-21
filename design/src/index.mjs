// Import Design constructor
import { Design } from '@freesewing/core'
// Import parts
import { body } from './body.mjs'
import { sleeve } from './sleeve.mjs'
import {underarmGusset} from './underarmgusset.mjs'
import {shoulderPiece} from './shoulderPiece.mjs'
import {neckGusset} from './neckgusset.mjs'
import {collar} from './collar.mjs'
import {slitGusset} from './slitgusset.mjs'
import { cuff } from './cuff.mjs'

// Create the new design
const Stede = new Design({
  data: {
    /*
     * If you like, you can add any data you want to your design.
     * We'll add the name here as an example.
     *
     * If you don't use this,
     * you can remove this data key enterely.
     */
    
  },
  // A list of parts is all that is required.
  parts: [ body, sleeve, underarmGusset, shoulderPiece, neckGusset, collar, slitGusset, cuff ],
})

const Pattern = Stede
/*
 * Named exports
 *
 * We export the design itself as well as each part individually.
 * This allows us to re-use these parts in other designs.
 */

export { body, sleeve, underarmGusset, shoulderPiece, neckGusset, collar, slitGusset, cuff, Stede, Pattern }

