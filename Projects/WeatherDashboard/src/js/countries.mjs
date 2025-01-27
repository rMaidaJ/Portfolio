/*
 * Script       :countries.mjs
 * Author       :Richard Maida Jimenez
 * Date         :November 2024.
 * Version      :1.0.
 * Description  :Methods relating to the countries JSON for the Weather Report Page.
 * 
 * Version  Date        Author                  Comments
 * -------  -------     ---------------------   --------
 * 1.00     17/10/2024  Richard Maida Jimenez   Website Cloning Project - New Code.
 */
export async function getCountryCodesNames() {
/*
 * Returns Country Data from JSON file.
 *
 * USAGE
 * -----
 *  IN: N/A.
 * OUT: countryCodesNames.
 *          [0] - countryCodes.
 *          [1] - countryNames.
 */
    let response       = null;
    let countriesJson  = null;

    let countriesArray    = [];
    let countryLine       = [];
    let countryCodes      = [];
    let countryNames      = [];
    let countryCodesNames = []

    // Read the JSON file & convert to array.
    try {
        response       = await fetch( './countries.json' );
        countriesJson  = await response.json();
        countriesArray = Object.values( countriesJson );

        // Iterate array to create country codes and names arrays.
        for ( let idx = 0; idx < countriesArray.length; idx++ ) {
            countryLine = Object.values( countriesArray[idx] );
            countryCodes[idx] = countryLine[0];  //].push( countryLine[0] );
            countryNames[idx] = countryLine[2];  //.push( countryLine[2] );
        }

        // Place codes & names arrays into a codeName array.
        countryCodesNames.push( countryCodes );
        countryCodesNames.push( countryNames );

        return countryCodesNames;
    
    } catch ( error ) {
        console.error( 'Error reading or parsing JSON:', error );
    }
}

export function getCountryName( anySelCountryOptions, anySysCountry ) {
    /*
     * Returns Country Name a given Country Code.
     *
     * USAGE:
     * ------
     *  IN: anySelCountryOptions
     *      anySysCountry
     * OUT: countryName
     */
    let countryName = null;

    for ( let idx = 0; idx < anySelCountryOptions.length; idx++ ) {
        if ( anySelCountryOptions[idx].value === anySysCountry ) {
            countryName  = anySelCountryOptions[idx].text;
            idx          = anySelCountryOptions.length;
        }
    }

    return countryName;
}