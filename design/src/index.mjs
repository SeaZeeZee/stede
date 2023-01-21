// Import Design constructor
import { Design } from '@freesewing/core'
// Import parts
import { body } from './body.mjs'
import { sleeve } from './sleeve.mjs'
import {underarmGusset} from './underarmgusset.mjs'
import {shoulderPieces} from './shoulderPieces.mjs'

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
  parts: [ body, sleeve, underarmGusset, shoulderPieces ],
})

const Pattern = Stede
/*
 * Named exports
 *
 * We export the design itself as well as each part individually.
 * This allows us to re-use these parts in other designs.
 */

export { body, sleeve, underarmGusset, shoulderPieces, Stede, Pattern }

