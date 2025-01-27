/*
 * Script       :indexpages.js
 * Author       :Richard Maida Jimenez
 * Date         :November 2024.
 * Version      :1.0.
 * Description  :Commuter code for the Personal Portfolio Web Page.
 * 
 * Version     Date        Author                  Comments
 * -------     -------     ---------------------   --------
 * 1.00        22/11/2024  Richard Maida Jimenez   Personal Portfolio Web Site.
 */
const navbarHdrBarMenuPages = document.querySelector( '.navbar-hdr-barmenu-pages' );
const navbarHdrLinksWrapper = document.querySelector( '.navbar-hdr-links-wrapper' );
const skewedHeaderContent   = document.querySelector( '.skewed-header-content' );
const skewedHeaderSection   = document.querySelector( '.skewed-header-section' );
const mediaQuery            =   window.matchMedia( '(max-width: 1300px)' );  // Define a media query.
/*
 * Event Listeners.
 */
navbarHdrBarMenuPages.addEventListener( 'click', ( anyEvent )=> {
    
    if ( navbarHdrLinksWrapper.style.display == 'flex' ) {
        navbarHdrBarMenuPages.style.display = 'block';
        navbarHdrLinksWrapper.style.display = 'none';
        skewedHeaderContent.style.height    = '250px';
    } else {
        navbarHdrBarMenuPages.style.display = 'none';
        navbarHdrLinksWrapper.style.display = 'flex';
        skewedHeaderContent.style.height    = '250px';
        skewedHeaderSection.style.height    = '320px';
    }
})

// Listen for changes in the media query
mediaQuery.addEventListener( 'change', eventChangeMediaQuery ) ;

// Function to handle the media query change
function eventChangeMediaQuery( anyMediaQuery ) {

    if ( anyMediaQuery.matches)  {
        navbarHdrLinksWrapper.style.display = 'none';    // If the media query matches (viewport is 700px or less).
    } else {
        navbarHdrLinksWrapper.style.display = 'flex';   // If the media query does not match (viewport is more than 700px).
    }
}

eventChangeMediaQuery( mediaQuery );