import { pluginBundle } from '@freesewing/plugin-bundle'

function draftslitGusset ({
  // Uncomment below to destructure what you need
  /*
   * Content constructors
   */
  Path,	   // A Path constructor to create new paths
  Point,   // A Point constructor to create new points
  Snippet, // A Snippet constructor to create new snippets
  /*
   * Content constainers
   */
  paths,    // Add a Path to your part by adding it to this object
  points,   // Add a Points to your part by adding it to this object
  snippets, // Add a Snippet to your part by adding it to this object
  /*
   * Access to settings
   */
  //absoluteOptions, // Access to settings.absoluteOptions
  complete,        // Access to settings.complete
  //measurements,    // Access to settings.measurements
  options,         // Access to settings.options
  paperless,       // Access to settings.paperless
  sa,              // Access to settings.sa
  //scale,           // Access to settings.scale
  /*
   * Access to utilities
   */
  //getId,     //See the getId documentation
  //hide,      //See the hide documentation
  //log,       //See the logging documentation
  macro,     //See the macros documentation
  //setHidden, //See the setHidden documentation
  //store,     //See the store documentation
  //unhide,    //See the unhide documentation
  //units,     //See the units documentation
  ///utils,     //See the utils documentation
  /*
   * Return value
   */
  part, // Your draft method must return this
}) {
  // Add points to make a box
  const w = 500 * options.size
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(w, 0)
  points.bottomLeft = new Point(0, w / 2)
  points.bottomRight = new Point(w, w / 2)

  // Create a path for the box outline
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .setClass('fabric')

  // Complete?
  if (complete) {
    // Add a logo
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    // Add some text
    points.text = points.logo
      .shift(-90, w / 8)
      .addText('FreeSewing', 'center')

    if (sa) {
      // Add seam allowance
      paths.sa = paths.seam.offset(sa).setClass('fabric sa')
    }
  }

  // Add dimensions for paperless mode
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }
  
  return part
}

export const slitGusset = {
  /*
   * name: Holds the name of this part.
   *
   * We STRONGLY recommend naming your parts in the format of
   * design.part to avoid naming conflicts when people re-use
   * parts across designs.
   */
  name: 'stede.slitGusset',
  /*
   * draft: Holds the draft method for this part
   *
   * This should be a function that drafts and returns the part
   *
   * Documentation: https://freesewing.dev/reference/api/part/draft
   */
  draft: draftslitGusset,
  after: [
    /*
     * after: Holds a list of parts that should be drafted prior to this part.
     *
     * You'll need to import these parts, just as with the from key above.
     *
     * If you don't have any parts to draft prior to this part,
     * you can remove this options key entirely.
     *
     * Documentation: https://freesewing.dev/reference/api/part/config/dependencies
     */
  ],
  /*
   * from: Holds the part you want to extend.
   *
   * Documentation: https://freesewing.dev/reference/api/part/config/dependencies
   */
  from: false,
  /*
   * hide: Set this to true to hide a part.
   *
   * We've set this to false here to clarify its use.
   * If you don't want to hide this part,
   * you can remove the hide key entirely.
   */
  hide: false,
  /*
   * hideDependecies: Set this to true to hide a part's dependencies.
   *
   * If you don't want to hide this part's dependencies,
   * you can remove the hideDependencies key entirely.
   */
  hideDependencies: false,
  /*
   * hideAll: Set this to true to hide both the part and its dependencies.
   *
   * This is a combination of the hide and hideDependencies keys in case
   * you want to both hide this part and its dependencies.
   * We've included it here with a value of false.
   * If you don't want to hide this a part and its dependencies,
   * you can remove the hideAll key entirely.
   */
  hideAll: false,
  options: {
    /*
     * options: Holds (the configuration of) options for this part
     *
     * Declare options used in this part here.
     *
     * If you don't have any options to add,
     * you can remove this options key entirely.
     *
     * Documentation: https://freesewing.dev/reference/api/part/config/options
     */
    size: { pct: 50, min: 10, max: 100 }
  },
  measurements: [
    /*
     * measurements: Holds a list of measurements required by this part.
     *
     * Declare measurements required by this part here.
     *
     * If you don't have any required measurements to add,
     * you can remove this measurements key entirely.
     *
     * Documentation: https://freesewing.dev/reference/api/part/config/measurements
     */
  ],
  optionalMeasurements: [
    /*
     * optionalMeasurements: Holds a list of measurements optional in this part.
     *
     * Declare measurements that are optional for this part here.
     *
     * If you don't have any optional measurements to add,
     * you can remove this optionalMeasurements key entirely.
     *
     * Documentation: https://freesewing.dev/reference/api/part/config/measurements
     */
  ],
  plugins: [
    /*
     * plugins: Holds a list of plugins this part relies on.
     *
     * Add all the plugins here that you need in this part.
     *
     * If you don't have any plugins to add,
     * you can remove this plugins key entirely.
     *
     * Documentation: https://freesewing.dev/reference/api/part/config/plugins
     */
    pluginBundle,
  ]
}
