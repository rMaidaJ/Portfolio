/*
 * Script       :weatherReportMethods.mjs
 * Author       :Richard Maida Jimenez
 * Date         :November 2024.
 * Version      :1.0.
 * Description  :Methods associated with the Weather Report web app.
 */
import WeatherReportParams from "./weatherReportParams.mjs";
/*
 * Declare methods.
 */
export async function fetchWeatherData( anyUrlAddress ) {
    /*
     * Returns weather data Json file from website using given url address.
     *
     * USAGE:
     * ------
     *  IN: anyUrlAddress
     * OUT: weatherJson
     */
    let response     = '';
    let weatherJson  = '';
    
    try {
        response = await fetch( anyUrlAddress );

        if ( !response.ok ) {
            throw new Error( `HTTP error! status: ${response.status}` );
        }
        weatherJson = await response.json();
        return weatherJson;

    } catch( error ) {
        console.log('Error fetching data:', error);
        throw error; // Propagate the error to be handled by the caller
    }
}

export function getUrlAddress( anyLocation, anyWeatherReportParams )  {
    /*
     * Returns the URL Address using a given location.
     *
     * USAGE:
     * ------
     *  IN: anyLocation.
     * OUT: urlAddress.
     */    
    let urlAddress = null;

    urlAddress  = anyWeatherReportParams.getUrlAddPrefix();
    urlAddress += anyLocation + '&';
    urlAddress += anyWeatherReportParams.getUrlAddAppId() + '&'; 
    urlAddress += anyWeatherReportParams.getUrlAppUnitMeasure();

    console.log( `URL Address: ${urlAddress}` ); 

    return urlAddress;
}

export function getUrlAddressIcon( anyUrlIcon, anyWeatherIconCode ) {
    /*
     * Returns urlAddressIcon for any given url Icon and weather icon code.
     * 
     * USAGE:
     *  IN: anyUrlIcon
     *      anyWeatherIconCode
     * OUT: urlAddressIcon.
    */
    let urlAddressIcon = anyUrlIcon.replace( '[CODE]', anyWeatherIconCode );
    return urlAddressIcon;
}