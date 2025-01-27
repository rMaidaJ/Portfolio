/*
 * Script       :index.js
 * Author       :Richard Maida Jimenez
 * Date         :October 2024.
 * Version      :1.0.
 * Description  :Commuter code for the Weather Report Web Page.
 * 
 * Version     Date        Author                  Comments
 * -------     -------     ---------------------   --------
 * 1.00        12/11/2024  Richard Maida Jimenez   Weather Report Web Site.
 */
/*
 * Declare Imports.
 */
import WeatherReportParams from "./weatherReportParams.mjs";
import WeatherReportClass  from "./weatherReportClass.mjs";
import * as Countries      from "./countries.mjs";
import * as WeatherReportMethods from "./weatherReportMethods.mjs";
/*
 * Instantiate Weather Report Params Class.
 */
let weatherReportParams = null;

weatherReportParams = new WeatherReportParams();
/*
 * Get the Form Element objects.
 */
let  edlLocationCtrl = document.getElementById( 'edlLocation' );
let   selCountryCtrl = document.getElementById( 'selCountry' );       //querySelector( 'selCountry' );
const   btnEnterCtrl = document.getElementById( 'btnEnter' );
const   btnClearCtrl = document.getElementById( 'btnClear' );
/*
 * Event Listeners.
 */
addEventListener( 'DOMContentLoaded', eventDOMContentLoaded() );
addEventListener( 'load', eventLoad );
/*
 * Form Control Event Listeners.
 */
btnEnterCtrl.addEventListener( 'click', eventClickBtnEnter );
btnClearCtrl.addEventListener( 'click', eventClickBtnClear );
/*
 * Event Methods.
 */
function eventDOMContentLoaded() {
    /*
     * DOMContentLoaded: HTML minus the CSS.
     * USAGE:
     * ------
     *  IN: N/A.
     * OUT: N/A.
     */
    let countryCodesNames = [];

    logEvent( 'DOM Content Event Loading....' );

    // Clear Session Storage.
    sessionStorage.clear();

    // Initiate Weather Report Params Class.
    weatherReportParams.initParams();

    // Get Countries & load on select HTML tags.
    countryCodesNames = Countries.getCountryCodesNames()
    .then( countryCodesNames => {
        setCountrySelectOptions( countryCodesNames );
        eventEnd();
    })
    .catch( error => {
        // Error.
        logEvent( `DOM Content Event Error ${ error }`);
    })
}
    
function eventLoad() {
    /*
     * loaded: CSS loaded.
     * USAGE:
     * ------
     *  IN: N/A.
     * OUT: N/A.
     */
    setTimeout(() => {
        logEvent( 'Load Event.....' );
    }, 2000);
}
/*
 * Events with arrow functions.
 */
edlLocationCtrl.addEventListener( 'blur' , ( e ) => {
    /*
     * Tabbing out of the Location field.
     * USAGE:
     * ------
     *  IN: N/A.
     * OUT: N/A.
     */
    logEvent( 'Location entered' );  
    eventStart();

    // Reset Select Country to default value.
    document.getElementById( 'selCountry' ).selectedIndex = "0";
    eventEnd();
});

selCountryCtrl.addEventListener( 'change', ( e ) => {
    /*
    * Change event for the Select Country dropdown.
    */
    eventStart();
    logEvent( 'Country selected :' + e.target.value );
    eventEnd();
});
/*
 * Event Methods....Click.
 */
function eventClickBtnEnter() {
    /*
     * Get weather for location/country selected.
     * USAGE:
     * ------
     *  IN: N/A.
     * OUT: N/A.
     */
    let selCountryCode = null;
    let urlAddress     = null;
    let urlAddressIcon = null;
    let edlLocation    = null;
    /*
     * Get form control values & session storage.
     */
    eventStart();
    logEvent( 'Enter Button clicked' );   
    /*
     * Get location from session storage & countries & load on select HTML tags..
     */
    edlLocation    = sessionStorage.getItem( 'edlLocation' );    
    selCountryCode = document.getElementById( 'selCountry' ).value;
    /*
     * Append country code to location if selected.
     */
    if ( selCountryCode != 'Select' ) {
        edlLocation   += ',' + selCountryCode;
    }
    /*
     * Get url address.
     */
    urlAddress = WeatherReportMethods.getUrlAddress( edlLocation, weatherReportParams );
    /*
     * Get the weather data from Json file from website using urlAddress.
     */
    WeatherReportMethods.fetchWeatherData( urlAddress )
    .then( weatherData => {
        /*
         * Instantiate Weather Report Class. & populate data.
         */
        let weatherReportClass = new WeatherReportClass( weatherData );
        /*
         * Populate Weather Report Class. with Weather Data JSON file.
         */
        weatherReportClass.setWeatherReport( weatherData );
        /*
         * Get Weather Icon.
         */
        urlAddressIcon = WeatherReportMethods.getUrlAddressIcon( weatherReportParams.getUrlIcon(), weatherReportClass.getWeatherIcon() );
        showWeatherResults( weatherReportClass, urlAddressIcon );
    })  
    .catch( error => {
        /*
         * Raise error if weather data cannot be obtained.
         */
        console.log( error )
        alert( 'Cannot obtain Weather Information for ' + edlLocation );
    });
    /*
     * Pass data back to the form controls.
     */
    eventEnd();
}

function eventClickBtnClear() {
    /*
     * Reset page to default values.
     * USAGE:
     * ------
     *  IN: N/A.
     * OUT: N/A.
     */
    eventStart();
    logEvent( 'Clear Button clicked' );   

    sessionStorage.setItem( 'edlLocation', '' );
    document.getElementById( 'selCountry' ).selectedIndex = "0";

    clearWeatherResults();
    eventEnd();
}

/*
 * Functions called by the above events.
 */
function setCountrySelectOptions( anyCountryCodesNames ) {
    /*
     * Returns HTML Select Element form given array of countries.
     *
     * USAGE
     * -----
     *  IN: anyCountryNames.
     * OUT: N/A.
     */
    const countryCodes  = anyCountryCodesNames[0];
    const countryNames  = anyCountryCodesNames[1];

    const selectLine = new Option( 'Select Country', 'Select');
    document.getElementById( 'selCountry' ).add( selectLine );
    
    for ( let idx = 0; idx < countryNames.length; idx++ ) {
        const newOption = new Option( countryNames[idx], countryCodes[idx] );
        document.getElementById( 'selCountry' ).add( newOption );
    }

    sessionStorage.setItem( 'countryCodes', JSON.stringify( countryCodes ) );
    sessionStorage.setItem( 'countryNames', JSON.stringify( countryNames ) ) ;
}

function showWeatherResults( anyWeatherReportClass, urlAdddressIcon ) {
    /*
     * Shows weather results from a given Weather Report Class and Icon from a given url address.
     *
     * USAGE:
     * ------
     *  IN: anyWeatherReportClass
     * OUT: N/A.
     */
    document.querySelector( '.weather-results' ).style.display = "grid";

    const selCountry               = document.getElementById( 'selCountry' );
    const divWeatherHeader         = document.getElementById( 'weather-header' );
    const divWeatherDescription    = document.getElementById( 'weather-description' );
    const divWeatherTtemp          = document.getElementById( 'weather-temp' );
    const divWeatherFeelsLike      = document.getElementById( 'weather-feels-like' );
    const divWeatherTempMin        = document.getElementById( 'weather-temp-min' );
    const divWeatherTempMax        = document.getElementById( 'weather-temp-max' );
    const divWeatherHumidity       = document.getElementById( 'weather-humidity' );
    const divWeatherPressure       = document.getElementById( 'weather-pressure' );
    const divWeatherWindSpeed      = document.getElementById( 'weather-wind-speed' );
    const divWeatherWwindDirection = document.getElementById( 'weather-wind-direction' );
    /*
     * Get country name.
     */
    let selCountryName = Countries.getCountryName( selCountry.options, anyWeatherReportClass.getSysCountry() );
    /*
     * Build the Weather Results.
     */
    divWeatherHeader.innerHTML  = anyWeatherReportClass.getName();
    divWeatherHeader.innerHTML += '<br>' + selCountryName;
    
    divWeatherDescription.innerHTML    = anyWeatherReportClass.getWeatherDescription();
    document.getElementById( 'weather-icon1' ).src = urlAdddressIcon;
 
    divWeatherTtemp.innerHTML          = anyWeatherReportClass.getMainTemp() + 'c';
    divWeatherFeelsLike.innerHTML      = anyWeatherReportClass.getMainFeelsLike() + 'c'; 
    divWeatherTempMin.innerHTML        = anyWeatherReportClass.getMainTempMin() + 'c';
    divWeatherTempMax.innerHTML        = anyWeatherReportClass.getMainTempMax() + 'c';
    divWeatherHumidity.innerHTML       = anyWeatherReportClass.getMainPressure() + ' isobars';
    divWeatherPressure.innerHTML       = anyWeatherReportClass.getMainHumidity();
    divWeatherWindSpeed.innerHTML      = anyWeatherReportClass.getWindSpeed() + 'mph';
    divWeatherWwindDirection.innerHTML = anyWeatherReportClass.getWindDeg();
    /*
     * Place data on console for debugging purposes.
     */
    console.log(
`WEATHER_CONDITIONS: ${anyWeatherReportClass.getWeatherMain()}
               Desc: ${anyWeatherReportClass.getWeatherDescription()}
               Icon: ${anyWeatherReportClass.getWeatherIcon()}
               Temp: ${anyWeatherReportClass.getMainTemp()}
         Feels Like: ${anyWeatherReportClass.getMainFeelsLike()}
           Min Temp: ${anyWeatherReportClass.getMainTempMin()}
           Max Temp: ${anyWeatherReportClass.getMainTempMax()}
           Pressure: ${anyWeatherReportClass.getMainPressure()}
           Humidity: ${anyWeatherReportClass.getMainHumidity()}
         Wind Speed: ${anyWeatherReportClass.getWindSpeed()}
     Wind Direction: ${anyWeatherReportClass.getWindDeg()}`);

    console.log( 'OK: \n' + anyWeatherReportClass.getName() );
    console.log( `${anyWeatherReportClass.getMainTemp()}\n${anyWeatherReportClass.getCloudsAll()}\n${anyWeatherReportClass.getName()}\n${anyWeatherReportClass.getSysCountry()}` )
    console.log( 'Pass back to browser');
}

function clearWeatherResults() {
    /*
     * Clear Weather Results.
     *
     * USAGE:
     * ------
     *  IN: N/A
     * OUT: N/A
     */
    document.getElementById( 'weather-header' ).innerHTML = '';
    document.getElementById( 'weather-description' ).innerHTML = '';
    document.getElementById( 'weather-icon1' ).src = 'DUMMY';
    document.getElementById( 'weather-temp' ).innerHTML = '';
    document.getElementById( 'weather-feels-like' ).innerHTML = '';
    document.getElementById( 'weather-temp-min' ).innerHTML = '';
    document.getElementById( 'weather-temp-max' ).innerHTML = '';
    document.getElementById( 'weather-humidity' ).innerHTML = '';
    document.getElementById( 'weather-pressure' ).innerHTML = '';
    document.getElementById( 'weather-wind-speed' ).innerHTML = '';
    document.getElementById( 'weather-wind-direction' ).innerHTML = '';

    document.querySelector( '.weather-results' ).style.display = "none";
}

/*
 * Common Event Functions.
 */
function eventStart() {
    /*
     * Get Form Controls that get passed to Session Storage then pass to
     * Weather Report Params.
     * 
     * USAGE:
     * ------
     *  IN: N/A.
     * OUT: N/A.
     */
    getFormControls();                                              // Get form controls.
    weatherReportParams = getSessionStorage( weatherReportParams ); // Pass session storage to Weather Report Params class.
}

function eventEnd() {
    /*
     * Set Session Storage from Weather Report Params, set which form controls should be disabled
     * then pass Session Storage to Form Controls.
     * 
     * USAGE:
     * ------
     *  IN: N/A.
     * OUT: N/A.
     */
    setSessionStorage( weatherReportParams );    // Pass Weather Report Class to Session storage.
    setFormControlsDisabled();                   // Determine what controls should be enabled/disabled.
    setFormControls();                           // Set form controls.
}
/*
 * Session Storage Control Functions...Session Storage allows values to be held during the life of a page's
 * existence.
 */
function getSessionStorage( anyWeatherReportParams ) {
    /*
     * Returns the Weather Report Params Class passed from session storage.
     *
     * USAGE:
     * ------
     *  IN: anyWeatherReportParams.
     * OUT: anyWeatherReportParams.
     */
    anyWeatherReportParams.setAppName(            sessionStorage.getItem( 'appName' ) );
    anyWeatherReportParams.setUrlAddPrefix(       sessionStorage.getItem( 'urlAddPrefix' ) );
    anyWeatherReportParams.setUrlAddAppId(        sessionStorage.getItem( 'urlAddAppId' ) );
    anyWeatherReportParams.setUrlAppUnitMeasure(  sessionStorage.getItem( 'urlAppUnitMeasure' ) ); 
    anyWeatherReportParams.setUrlIcon(            sessionStorage.getItem( 'urlIcon' ) );
    anyWeatherReportParams.setAppNarrative1(      sessionStorage.getItem( 'appNarrative1' ) );
    anyWeatherReportParams.setAppNarrative2(      sessionStorage.getItem( 'appNarrative2' ) );
    anyWeatherReportParams.setAppInstructs(       sessionStorage.getItem( 'appInstructs' ) );
    anyWeatherReportParams.setPoweredBy(          sessionStorage.getItem( 'poweredBy' ) );
    anyWeatherReportParams.setAppError(           sessionStorage.getItem( 'appError' ) );
    anyWeatherReportParams.setReportPath(         sessionStorage.getItem( 'reportPath' ) );
    anyWeatherReportParams.setReportHeadersLine1( sessionStorage.getItem( 'reportHeadersLine1' ) );
    anyWeatherReportParams.setReportHeadersLine2( sessionStorage.getItem( 'reportHeadersLine2' ) );

    logEvent( 'Weather Report Params <-- Session Storage.' );

    return anyWeatherReportParams;
}

function setSessionStorage( anyWeatherReportParams ) {
    /*
     * Sets the session storage from a given Weather Report Params Class passed in.
     *
     * USAGE:
     * ------ 
     *  IN: weatherReportParams.
     * OUT: N/A
     */
    sessionStorage.setItem( 'appName'           , anyWeatherReportParams.getAppName() );
    sessionStorage.setItem( 'urlAddPrefix'      , anyWeatherReportParams.getUrlAddPrefix() );
    sessionStorage.setItem( 'urlAddAppId'       , anyWeatherReportParams.getUrlAddAppId() );
    sessionStorage.setItem( 'urlAppUnitMeasure' , anyWeatherReportParams.getUrlAppUnitMeasure() );
    sessionStorage.setItem( 'urlIcon'           , anyWeatherReportParams.getUrlIcon() );
    sessionStorage.setItem( 'appNarrative1'     , anyWeatherReportParams.getAppNarrative1() );
    sessionStorage.setItem( 'appNarrative2'     , anyWeatherReportParams.getAppNarrative2() );
    sessionStorage.setItem( 'appInstructs'      , anyWeatherReportParams.getAppInstructs() );
    sessionStorage.setItem( 'poweredBy'         , anyWeatherReportParams.getPoweredBy() );
    sessionStorage.setItem( 'appError'          , anyWeatherReportParams.getAppError() );
    sessionStorage.setItem( 'reportPath'        , anyWeatherReportParams.getReportPath() );
    sessionStorage.setItem( 'reportHeadersLine1', anyWeatherReportParams.getReportHeadersLine1() );
    sessionStorage.setItem( 'reportHeadersLine2', anyWeatherReportParams.getReportHeadersLine2() );
    
    logEvent( 'Session Storage <-- Weather Report Params.' );    
}
/*
 * Form Control Functions.
 */
function getFormControls() {
   /*
    * Sets the controls on the page using a given Weather Report Params.
    *
    * USAGE:
    * ------
    *  IN: N/A.
    * OUT: N/A.
    */
    sessionStorage.setItem( 'appName'      , document.getElementById( 'lblAppName'       ).innerHTML );
    sessionStorage.setItem( 'appNarrative1', document.getElementById( 'lblAppNarrative1' ).innerHTML );
    sessionStorage.setItem( 'appNarrative2', document.getElementById( 'lblAppNarrative2' ).innerHTML );
    sessionStorage.setItem( 'appInstructs' , document.getElementById( 'lblAppInstructs'  ).innerHTML ); 
    sessionStorage.setItem( 'poweredBy'    , document.getElementById( 'lblPoweredBy'     ).innerHTML );

    sessionStorage.setItem( 'edlLocation', edlLocationCtrl.value );
    sessionStorage.setItem( 'selCountry' , selCountry.text );

    logEvent( 'Session Storage <-- Form Controls.' );     
}

function setFormControls() {
    /*
     * Sets the controls on the page using a given Weather Report Params.
     *
     * USAGE:
     * ------
     *  IN: N/A
     * OUT: N/A
     */
    document.getElementById( 'lblAppName'       ).innerHTML = sessionStorage.getItem( 'appName' );
    document.getElementById( 'lblAppNarrative1' ).innerHTML = sessionStorage.getItem( 'appNarrative1' );
    document.getElementById( 'lblAppNarrative2' ).innerHTML = sessionStorage.getItem( 'appNarrative2' );
    document.getElementById( 'lblAppInstructs'  ).innerHTML = sessionStorage.getItem( 'appInstructs' );
    document.getElementById( 'lblPoweredBy'     ).innerHTML = sessionStorage.getItem( 'poweredBy' );

    document.getElementById( 'edlLocation' ).value = sessionStorage.getItem( 'edlLocation' );
    document.getElementById( 'selCountry'  ).text  = sessionStorage.getItem( 'selCountry' );

    logEvent( 'Form Controls <-- Session Storage.' );
}

function setFormControlsDisabled() {
    /*
     * Disable/enable btnEnter based upon value in edlLocation.
     * USAGE:
     * ------
     *  IN: N/A.
     * OUT: N/A.
     */
    if ( edlLocationCtrl.value == undefined ) {
         edlLocationCtrl.value = '';
    }
    let isBtnEnterDisabled = ( edlLocationCtrl.value.length == 0 );
    document.getElementById( 'btnEnter' ).disabled = isBtnEnterDisabled;
}

function logEvent( anyEventMessage ) {
    /*
     * Displays to teh console, an given event message.
     *
     * USAGE:
     * ------
     *  IN: anyEventMessage.
     * OUT: N/A.
     */
    console.log( anyEventMessage );
}