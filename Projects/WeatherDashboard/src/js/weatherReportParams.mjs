/*
 * Script       :weatherReportParams.mjs
 * Author       :Richard Maida Jimenez
 * Date         :November 2024.
 * Version      :1.0.
 * Description  :Class and Methods associated with the Weather Report Parameters for the Weather Report web app.
 */
/*
 * Declare Imports.
 */
import { readFile } from 'fs';
/*
 * Parameter Line number constants.
 */
const plAppName           =  0;
const plUrlAddPrefix      =  1;
const plUrlAddAppId       =  2;
const plUrlAddUnitMeasure =  3;
const plUrlIcon           =  4;
const plAppNarrative1     =  5;
const plAppNarrative2     =  6;
const plAppInstructs      =  7;
const plPoweredBy         =  8;
const plReportPath        =  9;
const plReportHeaders1    = 10;
const plReportHeaders2    = 11;
/*
 * Declare Class.
 */
export default class weatherReportParams {
    /*
     * All variables are private.
     */
    _appName            = null;
    _urlAddPrefix       = null;
    _urlAddAppId        = null;
    _urlAppUnitMeasure  = null;
    _urlIcon            = null;
    _appNarrative1      = null;
    _appNarrative2      = null;
    _appInstructs       = null;
    _poweredBy          = null;
    _appError           = null;
    _reportPath         = null;
    _reportHeadersLine1 = null;
    _reportHeadersLine2 = null;
    /*
     * Constructor.
     */
    constructor() {
        /*
        * Get Weather Report ini file using fs.readFileSync. Useful to keep changable stuff outside the code
        * to allow parameter changes without having to change the actual code.
        *
        * USAGE:
        * -----
        * IN : N/A
        * OUT: weatherReportIni.
        */
        let weatherReportIni = null;
    }
    /*
     * Initiate Params.
     */
    initParams() {

        this.setAppName( '<h1>Weather Report</h1>' );
        this.setUrlAddPrefix( 'https://api.openweathermap.org/data/2.5/weather?q=' );
        this.setUrlAddAppId( 'APPID=48b52bcbaeac33b00c86a36c1b6b5a16' );
        this.setUrlAppUnitMeasure( 'units=metric' );
        this.setUrlIcon( 'https://openweathermap.org/img/wn/[CODE]@2x.png' );
        this.setAppNarrative1( 'Welcome to Weather Report.<br>No, not the jazz fusion group formed by Wayne Shorter.' );
        this.setAppNarrative2( 'Click the link below to find out<br>more about the band<br><a href ="https://weatherreportband.com/" target="_blank">Weather Report<a>' );
        this.setAppInstructs( '<h3>How To Use</h3><p>Enter the location of your choice (mandatory).<br><br>Select a country (optional).<br><br>Please note that if you do not choose a country,<br>where there is more than one location with the same name,<br>Weather Report will assume one for you. However, it may not be<br>the location in the country you want.</p>' );
        this.setPoweredBy( 'Powered by<br><a href="https://openweathermap.org/" target="_blank">OpenWeatherMap.org<a>' );
        this.setReportPath( 'C:\Users\Richard Maida Jimene\Desktop\Portfolio\Projects\WeatherDashboard\Reports\WeatherReportLog-[DATE].csv' );
        this.setReportHeadersLine1( ',,Weather,Weather,Weather,Weather,,Main,Main,Main,Main,Main,Main,Main,Main,,Wind,Wind,Clouds,,System,System,System,System,System,,,,' ); 
        this.setReportHeadersLine2( 'Longitude,Latitude,Id,Main,Description,Icon,Base,Temp,Feels Like,Temp Min,Temp Max,Pressure,Humidity,SeaLevel,Ground Level,Visibility,Speed,Deg,All,Date,Type,Id,Country,Sunrise,Sunset,Time Zone,Id,Name,COD');
    }
    /*
     * Accessor methods (public).
     */
    getAppName() {
        return this._appName;
    }

    setAppName( anyAppName ) {
        this._appName = anyAppName;
    }

    getUrlAddPrefix() {
        return this._urlAddPrefix;
    }

    setUrlAddPrefix( anyUrlAddPrefix ) {
        this._urlAddPrefix = anyUrlAddPrefix;
    }

    getUrlAddAppId() {
        return this._urlAddAppId;
    }

    setUrlAddAppId( anyUrlAddAppId ) {
        this._urlAddAppId = anyUrlAddAppId;
    }

    getUrlAppUnitMeasure() {
        return this._urlAppUnitMeasure;
    }

    setUrlAppUnitMeasure( anyUrlAppUnitMeasure ) {
        this._urlAppUnitMeasure = anyUrlAppUnitMeasure;
    }

    getUrlIcon() {
        return this._urlIcon;
    }

    setUrlIcon( anyUrlIcon ) {
        this._urlIcon = anyUrlIcon;
    }

    getAppNarrative1() {
        return this._appNarrative1;
    }

    setAppNarrative1( anyAppNarrative1 ) {
        this._appNarrative1 = anyAppNarrative1;
    }

    getAppNarrative2() {
        return this._appNarrative2;
    }

    setAppNarrative2( anyAppNarrative2 ) {
        this._appNarrative2 = anyAppNarrative2;
    }

    getAppInstructs() {
        return this._appInstructs;
    }

    setAppInstructs( anyAppInstructs ) {
        this._appInstructs = anyAppInstructs;
    }

    getPoweredBy() {
        return this._poweredBy;
    }

    setPoweredBy( anyPoweredBy ) {
        this._poweredBy = anyPoweredBy;
    }

    getAppError() {
        return this._appError;
    }

    setAppError( anyAppError ) {
        return this._appError = anyAppError;
    }

    getAppError() {
        return this._appError;
    }

    getReportPath() {
        return this._reportPath;
    }
    
    setReportPath( anyReportPath ) {
        this._reportPath = anyReportPath;
    }
   
    getReportHeadersLine1() {
        return this._reportHeadersLine1;
    }
    
    setReportHeadersLine1( anyReportHeaders1 ) {
        this._reportHeadersLine1 = anyReportHeaders1;
    }

    getReportHeadersLine2() {
        return this._reportHeadersLine2;
    }
    
    setReportHeadersLine2( anyReportHeaders2 ) {
        this._reportHeadersLine2 = anyReportHeaders2;
    }

    setUrlAddress( anyLocation )  {
    
        let urlAddress  = `${this.getUrlAddPrefix()}${anyLocation}&${this.getUrlAddAppId()}&${this.getUrlAppUnitMeasure()}`;
        return urlAddress;
    }
}