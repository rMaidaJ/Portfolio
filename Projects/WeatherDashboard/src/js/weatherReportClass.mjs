/*
 * Script       :weatherReportClass.mjs
 * Author       :Richard Maida Jimenez
 * Date         :November 2024.
 * Version      :1.0.
 * Description  :Class and Methods associated with the Weather Report web app.
 */
//const fs = require( 'node:fs');
import { readFile } from 'fs';
/*
 * Declare Class.
 */
export default class weatherReportClass {

    _coordLon = null;
    _coordLat = null;
    
    _weatherId          = null;
    _weatherMain        = null;
    _weatherDescription = null;
    _weatherIcon        = null;
    
    _base = null;
    
    _mainTemp      = null;
    _mainFeelsLike = null;
    _mainTempMin   = null;
    _mainTempMax   = null;
    _mainPressure  = null;
    _mainHumidity  = null;
    _mainSeaLevel  = null;
    _mainGrndLevel = null;
    
    _visibility = null;
    
    _windSpeed = null;
    _windDeg   = null;
    
    _cloudsAll = null;
    _dt        = null;
    
    _sysType    = null;
    _sysId      = null;
    _sysCountry = null;
    _sysSunrise = null;
    _sysSunset  = null;
    
    _timezone = null;
    _id       = null;
    _name     = null;
    _cod      = null;
    /*
     * Constructor.
     */
    constructor() {
        /*
         * Just instantiating the class.
         */
    }
    /*
     * Accessor Methods.
     */
    getCoordLon() {
        return this._coordLon;
    }

    setCoordLon( anyCoordLon ) {
        this._coordLon = anyCoordLon;
    }

    getCoordLat() {
        return this._coordLat;
    }
    
    setCoordLat( anyCoordLat ) {
        this._coordLat = anyCoordLat;
    }
    
    getWeatherId() {
        return this._weatherId;
    }

    setWeatherId( anyWeatherId ) {
        this._weatherId = anyWeatherId;
    }

    getWeatherMain() {
        return this._weatherMain;
    }

    setWeatherMain( anyWeatherMain ) {
        this._weatherMain = anyWeatherMain;
    }

    getWeatherDescription() {
        return this._weatherDescription;
    }
    
    setWeatherDescription( anyWeatherDescription ) {
        this._weatherDescription = anyWeatherDescription;
    }

    getWeatherIcon() {
        return this._weatherIcon;
    }

    setWeatherIcon( anyWeatherIcon ) {
        this._weatherIcon = anyWeatherIcon;
    }

    getBase() {
        return this._base;
    }

    setBase( anyBase ) {
        this._base = anyBase;
    }

    getMainTemp() {
        return this._mainTemp;
    }

    setMainTemp( anyMainTemp ) {
        this._mainTemp = anyMainTemp;
    }

    getMainFeelsLike() {
        return this._mainFeelsLike;
    }

    setMainFeelsLike( anyMainFeelsLike ) {
        this._mainFeelsLike = anyMainFeelsLike;
    }

    getMainTempMin() {
        return this._mainTempMin;
    }

    setMainTempMin( anyMainTempMin ) {
        this._mainTempMin = anyMainTempMin;
    }

    getMainTempMax() {
        return this._mainTempMax;
    }

    setMainTempMax( anyMainTempMax ) {
        this._mainTempMax = anyMainTempMax;
    }

    getMainPressure() {
        return this._mainPressure;
    }

    setMainPressure( anyMainPressure ) {
        this._mainPressure = anyMainPressure;
    }

    getMainHumidity() {
        return this._mainHumidity;
    }

    setMainHumidity( anyMainHumidity ) {
        this._mainHumidity = anyMainHumidity;
    }

    getMainSeaLevel() {
        return this._mainSeaLevel;
    }
    
    setMainSeaLevel( anyMainSeaLevel ) {
        this._mainSeaLevel = anyMainSeaLevel;
    }

    getMainGrndLevel() {
        return this._mainGrndLevel;
    }

    setMainGrndLevel( anyMainGrndLevel ) {
        this._mainGrndLevel = anyMainGrndLevel;
    }

    getVisibility() {
        return this._visibility;
    }

    setVisibility( anyVisibility ) {
        this._visibility = anyVisibility;
    }
    
    getWindSpeed() {
        return this._windSpeed;
    }

    setWindSpeed( anyWindspeed ) {
        this._windSpeed = anyWindspeed;
    }   

    getWindDeg() {
        return this._windDeg;
    }

    setWindDeg( anyWindDeg ) {
        this._windDeg = anyWindDeg;
    }

    getCloudsAll() {
        return this._cloudsAll;
    }

    setCloudsAll( anyCloudsAll ) {
        this._cloudsAll = anyCloudsAll;
    }

    getDt() {
        return this._dt;
    }
    
    setDt( anyDt ) {
        this._dt = anyDt;
    }

    getSysType() {
        return this._sysType;
    }
    
    setSysType( anySysType ) {
        this._sysType = anySysType;
    }

    getSysId() {
        return this._sysId;
    }

    setSysId( anyId ) {
        this._sysId = anyId;
    }

    getSysCountry() {
        return this._sysCountry;
    }

    setSysCountry( anySysCountry ) {
        this._sysCountry = anySysCountry;
    }

    getSysSunrise() {
        return this._sysSunrise;
    }

    setSysSunrise( anySysSunrise ) {
        this._sysSunrise = anySysSunrise;
    }

    getSysSunset() {
        return this._sysSunset;
    }
    
    setSysSunset( anySysSunset ) {
        this._sysSunset = anySysSunset;
    }

    getTimeZone() {
        return this._timezone;
    }

    setTimeZone( anyTimeZone ) {
        this._timezone = anyTimeZone;
    }

    getId() {
        return this._id;
    }

    setId( anyId ) {
        this._id = anyId;
    }

    getName() {
        return this._name;
    }

    setName( anyName ) {
        this._name = anyName;
    }

    getCod() {
        return this._cod;
    }

    setCod( anyCod ) {
        this._cod = anyCod;
    }

    getWeatherReport() {

    }

    setWeatherReport( anyJson ) {

        this.setCoordLon( anyJson.coord.lon ); 
        this.setCoordLat( anyJson.coord.lat );
        
        this.setWeatherId( anyJson.weather[0].id );
        this.setWeatherMain( anyJson.weather[0].main );
        this.setWeatherDescription( anyJson.weather[0].description );
        this.setWeatherIcon( anyJson.weather[0].icon );
           
        this.setBase(  anyJson.base );
        
        this.setMainTemp( anyJson.main.temp );
        this.setMainFeelsLike( anyJson.main.feels_like ); 
        this.setMainTempMin( anyJson.main.temp_min );
        this.setMainTempMax( anyJson.main.temp_max );
        this.setMainPressure( anyJson.main.pressure );
        this.setMainHumidity( anyJson.main.humidity );
        this.setMainSeaLevel( anyJson.main.sea_level );
        this.setMainGrndLevel( anyJson.main.grnd_level );
        
        this.setVisibility( anyJson.visibility );
        
        this.setWindSpeed( anyJson.wind.speed );
        this.setWindDeg( anyJson.wind.deg );
        
        this.setCloudsAll( anyJson.clouds.all );
        this.setDt( anyJson.dt );
        
        this.setSysType( anyJson.sys.type );
        this.setSysId( anyJson.sys.id );
        this.setSysCountry( anyJson.sys.country );
        this.setSysSunrise( anyJson.sys.sunrise );
        this.setSysSunset( anyJson.sys.sunset );
        
        this.setTimeZone( anyJson.timezone );
        this.setId( anyJson.id );
        this.setName( anyJson.name );
        this.setCod( anyJson.cod );
    }

    updateReportLog( anyWeatherReportParams ) {

        let fsDateSuffix  = this.setDateFs()
        let fsNameParam   = anyWeatherReportParams.getReportPath()
        let fsNameUse     = fsNameParam.replace( '[DATE]', fsDateSuffix );
        let reportHeaders = anyWeatherReportParams.getReportHeadersLine1() + '\n';
        reportHeaders    += anyWeatherReportParams.getReportHeadersLine2();

        let reportLog  = this.readReportLog( fsNameUse, reportHeaders ); 
        let reportLine = null;

        reportLine  = this.getCoordLon() + ',';
        reportLine += this.getCoordLat() + ',';
        
        reportLine += this.getWeatherId() + ',';
        reportLine += this.getWeatherMain() + ',';
        reportLine += this.getWeatherDescription() + ',';
        reportLine += this.getWeatherIcon() + ',';
        
        reportLine += this.getBase() + ',';

        reportLine += this.getMainTemp() + ',';
        reportLine += this.getMainFeelsLike() + ',';
        reportLine += this.getMainTempMin() + ',';
        reportLine += this.getMainTempMax() + ',';
        reportLine += this.getMainPressure() + ',';
        reportLine += this.getMainHumidity() + ',';
        reportLine += this.getMainSeaLevel() + ',';
        reportLine += this.getMainGrndLevel() + ',';

        reportLine += this.getVisibility() + ',';
        
        reportLine += this.getWindSpeed() + ',';
        reportLine += this.getWindDeg() + ',';
        reportLine += this.getCloudsAll() + ',';
        reportLine += this.getDt() + ',';
        
        reportLine += this.getSysType() + ',';
        reportLine += this.getSysId() + ',';
        reportLine += this.getSysCountry() + ',';
        reportLine += this.getSysSunrise() + ',';
        reportLine += this.getSysSunset() + ',';
        
        reportLine += this.getTimeZone() + ',';
        reportLine += this.getId() + ',';
        reportLine += this.getName() + ',';
        reportLine += this.getCod() + '\n';

        reportLog += reportLine;
        this.writeReportLog( fsNameUse, reportLog );
    }

    readReportLog( anyFsName, anyFsColumnHeaders ) {
        /*
         * Read the Weather Report Log as a string.
         */
        let reportLog = null;
        try {
            reportLog = fs.readFileSync( anyFsName, 'utf8' )

        } catch ( readFileError ) {
            reportLog = anyFsColumnHeaders + '\n'; // Break Line.
        }

        return reportLog;
    }

    writeReportLog( anyFsName, anyReportLog ) {
        /*
         * Write File Away To O/S.
         */
        fs.writeFile( anyFsName, anyReportLog,
                    function( writeFileError ) {
                        if ( writeFileError ) {
                            console.log ( `Cannot write Report Log ${anyFsName}` );
                        } else
                            console.log( `Report Log written to ${anyFsName}` );
                        }
        ); 
    }
    
    setDateFs( ) {

        const currentDate = new Date();
        let   currDateUse = [];
        let   currDateFs  = null;
    
        currDateUse[0] =   currentDate.getFullYear();
        currDateUse[1] = ( currentDate.getMonth() + 1 );
        currDateUse[2] = ( currentDate.getDate()) ;
    
        for ( let idx = 0; idx < currDateUse.length; idx++ ) {
            if ( currDateUse[idx] < 10 ) {
                currDateUse[idx] = '0' + currDateUse[idx];
            }
        }
    
        currDateUse = currDateUse.toString();
        currDateFs  = currDateUse.replace( /,/g, '-');
    
        return currDateFs;
    }
}