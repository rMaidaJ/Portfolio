/*
 * Script       :index.js
 * Author       :Richard Maida Jimenez
 * Date         :November 2024.
 * Version      :1.0.
 * Description  :Commuter code for the Personal Portfolio Web Page.
 * 
 * Version     Date        Author                  Comments
 * -------     -------     ---------------------   --------
 * 1.00        22/11/2024  Richard Maida Jimenez   Personal Portfolio Web Site.
 */
const navbarHdrBarMenu = document.querySelector( '.navbar-hdr-barmenu' );
const navbarHdrLinks   = document.querySelector( '.navbar-hdr-links' );
const navbarHdr        = document.querySelector( '.navbar-hdr' );
const mediaQuery       =   window.matchMedia( '(max-width: 1300px)' );  // Define a media query.
/*
 * Event Listeners.
 */
navbarHdrBarMenu.addEventListener( 'click', ( anyEvent )=> {
    
    if ( navbarHdrLinks.style.display == 'block' ) {
        navbarHdrLinks.style.display = 'none';
        navbarHdr.style.height       = '85px';
    } else {
        navbarHdrLinks.style.display = 'block';
        navbarHdr.style.height       = '260px';
    }
})

// Listen for changes in the media query
mediaQuery.addEventListener( 'change', eventChangeMediaQuery ) ;

// Function to handle the media query change
function eventChangeMediaQuery( anyMediaQuery ) {

    if ( anyMediaQuery.matches)  {
        navbarHdrLinks.style.display = 'none';    // If the media query matches (viewport is 700px or less).
    } else {
        navbarHdrLinks.style.display = 'block';   // If the media query does not match (viewport is more than 700px).
    }
}

eventChangeMediaQuery( mediaQuery );