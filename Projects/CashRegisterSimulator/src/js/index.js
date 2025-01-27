/*
 * Script       :index.js
 * Author       :Richard Maida Jimenez
 * Date         :November 2024.
 * Version      :1.0.
 * Description  :Commuter code for the Cash Register Web Page.
 * 
 * Session Storage Items
 * ---------------------
 *   dayStartDeposit
 *   balanceRunning
 *   displayMode
 *   saleTotal
 *   displayAmount
 *   lastTxAmount
 *   isQtySelected
 * 
 * Version     Date        Author                  Comments
 * -------     -------     ---------------------   --------
 * 1.00        28/11/2024  Richard Maida Jimenez   Cash Register Web Site.
 */
/*
 * Declare Imports.
 */
import      CashRegisterClass   from './cashRegisterClass.mjs';
import * as CashRegisterMethods from './cashRegisterMethods.mjs'
/*
 * Instantiate Cash Register Class.
 */
let cashRegisterClass = new CashRegisterClass();
/*
 * Declare Form Element Objects.
 */
let cashRegDepStart = document.getElementById( 'cash-reg-dep-start' );
let cashRegBalRun   = document.getElementById( 'cash-reg-bal-run' );

let cashRegDisplayMode      = document.getElementById( 'cash-reg-display-mode' );
let cashRegDipslaySaleTotal = document.getElementById( 'cash-reg-display-sale-total' );
let cashRegDisplayAmount    = document.getElementById( 'cash-reg-display-amount' );

// Mode Buttons.
const btnSaleCtrl   = document.getElementById( 'btn-sale' );
const btnRefundCtrl = document.getElementById( 'btn-refund' );
const btnVoidCtrl   = document.getElementById( 'btn-void' );
const btnClearCtrl  = document.getElementById( 'btn-clear' );

// First row of digit buttons.
const btnSevenCtrl = document.getElementById( 'btn-seven' );
const btnEightCtrl = document.getElementById( 'btn-eight' );
const btnNineCtrl  = document.getElementById( 'btn-nine' );

// Second row of digit buttons.
const btnFourCtrl = document.getElementById( 'btn-four' );
const btnFiveCtrl = document.getElementById( 'btn-five' );
const btnSixCtrl  = document.getElementById( 'btn-six' ) ;

// Third row of digit buttons.
const btnOneCtrl   = document.getElementById( 'btn-one' );
const btnTwoCtrl   = document.getElementById( 'btn-two' );
const btnThreeCtrl = document.getElementById( 'btn-three' );

// Fourth row of digit buttons.
const btnZeroCtrl   = document.getElementById( 'btn-zero' );
const btnZeroesCtrl = document.getElementById( 'btn-zeroes' );
const btnDotCtrl    = document.getElementById( 'btn-dot' );

// Pay Enter Button.
const btnEnterCtrl     = document.getElementById( 'btn-enter' );
const btnBackSpaceCtrl = document.getElementById( 'btn-backSpace' );

// Pay Method Buttons.
const btnQtyCtrl     = document.getElementById( 'btn-qty' );
const btnPercentCtrl = document.getElementById( 'btn-percent' );
const btnCashCtrl    = document.getElementById( 'btn-cash' );
const btnCardCtrl    = document.getElementById( 'btn-card' );

// Total Buttons.
const btnSubTotalCtrl = document.getElementById( 'btn-subtotal' );
const btnTotalCtrl    = document.getElementById( 'btn-total' );
/*
 * Add Event Listeners.
 */
addEventListener( 'DOMContentLoaded', eventDOMContentLoaded );
addEventListener( 'load', eventLoaded );
/*
 * Form Control Event Listeners.
 */
cashRegDepStart.addEventListener( 'blur', eventBlurCashRegDepStart );

// Mode Buttons.   
  btnSaleCtrl.addEventListener( 'click', eventClickBtnSale );
btnRefundCtrl.addEventListener( 'click', eventClickBtnRefund );
  btnVoidCtrl.addEventListener( 'click', eventClickBtnVoid );
 btnClearCtrl.addEventListener( 'click', eventClickBtnClear );

// First row of digit buttons.
btnSevenCtrl.addEventListener( 'click', eventClickBtnSeven );
btnEightCtrl.addEventListener( 'click', eventClickBtnEight );
 btnNineCtrl.addEventListener( 'click', eventClickBtnNine );

// Second row of digit buttons.
btnFourCtrl.addEventListener( 'click', eventClickBtnFour );
btnFiveCtrl.addEventListener( 'click', eventClickBtnFive );
 btnSixCtrl.addEventListener( 'click', eventClickBtnSix );

// Third row of digit buttons.
  btnOneCtrl.addEventListener( 'click', eventClickBtnOne );
  btnTwoCtrl.addEventListener( 'click', eventClickBtnTwo );
btnThreeCtrl.addEventListener( 'click', eventClickBtnThree );

// Fourth row of digit buttons.
  btnZeroCtrl.addEventListener( 'click', eventClickBtnZero );
btnZeroesCtrl.addEventListener( 'click', eventClickBtnZeroes );
   btnDotCtrl.addEventListener( 'click', eventClickBtnDot );

// Pay Enter Button.
    btnEnterCtrl.addEventListener( 'click', eventClickBtnEnter );
btnBackSpaceCtrl.addEventListener( 'click', eventClickBtnBackSpace );

// Pay Method Buttons.
    btnQtyCtrl.addEventListener( 'click', eventClickBtnQty );
btnPercentCtrl.addEventListener( 'click', eventClickBtnPercent );
   btnCashCtrl.addEventListener( 'click', eventClickBtnCash );
   btnCardCtrl.addEventListener( 'click', eventClickBtnCard );

// Total Buttons.
btnSubTotalCtrl.addEventListener( 'click', eventClickBtnSubTotal );
   btnTotalCtrl.addEventListener( 'click', eventClickBtnTotal );
/*
 * Event Methods.
 */
function eventDOMContentLoaded() {
    /*
     * DOMContentLoaded: HTML minus the CSS.
     *
     * USAGE:
     *  IN: N/A.
     * OUT: N/A.
     */
    console.log( 'Event DOMContentLoaded' );
        
    // Sets the Session Storage from Cash Register Class.
    // Sets the Session Storage from Cash Register Class.
    // Sets the form Controls from Session Storage.
    setFormControls();
}

function eventLoaded() {
    /*
     * loaded: CSS loaded.
     * USAGE:
     * ------
     *  IN: N/A.
     * OUT: N/A.
     */
    console.log( 'Event Loaded' );
    setTimeout(() => {
        console.log( 'Load Event.....' );
    }, 2000);
}

function eventBlurCashRegDepStart() {
    /*
     * Tabbing out from the Day Start Cash Deposit Balance.
     *
     * USAGE:
     * ------
     *  IN: N/A.
     * OUT: N/A.
     */
    getFormControls();

    let dayStartDeposit = cashRegisterClass.getDayStartDeposit();
  
    if ( !isNaN(  dayStartDeposit ) ) {
        cashRegisterClass.setBalanceRunning( dayStartDeposit );

    } else {
        alert( 'ERROR! Invalid Entry' );
        cashRegisterClass.setDayStartDeposit( 0 );
    }
    setFormControls();
}

// Mode Buttons.   
function eventClickBtnSale() { 
    getFormControls();
    cashRegisterClass.setDisplayMode( 'SALE' );
    setFormControls();
}

function eventClickBtnRefund() {
    getFormControls();
    cashRegisterClass.setDisplayMode( 'REFUND' );
    setFormControls();
}

function eventClickBtnVoid() { 
    getFormControls();
    cashRegisterClass.setDisplayMode( 'VOID' );
    setFormControls();
}

function eventClickBtnClear() {
    getFormControls();
    cashRegisterClass.setDisplayAmount( 0 );
    setFormControls();
}

// First row of digit buttons.
function eventClickBtnSeven() { eventClickBtnDigit( '7' ); }
function eventClickBtnEight() { eventClickBtnDigit( '8' ); }
function eventClickBtnNine()  { eventClickBtnDigit( '9' ); }

// Second row of digit buttons.
function eventClickBtnFour() { eventClickBtnDigit( '4' ); }
function eventClickBtnFive() { eventClickBtnDigit( '5' ); }
function eventClickBtnSix()  { eventClickBtnDigit( '6' ); }

// Third row of digit buttons.
function eventClickBtnOne()   { eventClickBtnDigit( '1' ); }
function eventClickBtnTwo()   { eventClickBtnDigit( '2' ); }
function eventClickBtnThree() { eventClickBtnDigit( '3' ); }

// Fourth row of digit buttons.
function eventClickBtnZero()   { eventClickBtnDigit( '0' ); }
function eventClickBtnZeroes() { eventClickBtnDigit( '00' ); }
function eventClickBtnDot()    { eventClickBtnDigit( '.' ); }

function eventClickBtnDigit( anyDigitStrg ) {
    /*
     * Calls appendDisplayAmount using given digit to the Display Amount.
     *
     * USAGE:
     * ------
     *  IN: anyDigitStrg
     * OUT: N/A.
     */
    getFormControls();

    // Ensure Start Day Position is entered first.
    let errorMessage = CashRegisterMethods.validateDayStart( cashRegisterClass );

    if ( errorMessage != null ) {
        cashRegisterClass = CashRegisterMethods.appendDisplayAmount( anyDigitStrg, cashRegisterClass );
    } else {
        alert( errorMessage );
    }

    setFormControls();
}

// Pay Enter Button.
function eventClickBtnEnter() {

    console.log( 'Enter clicked' );
    getFormControls();

    if ( cashRegisterClass.getIsQtySelected() == true ) {
        cashRegisterClass.setQuantity( Number( cashRegisterClass.getDisplayAmount() ) );
        cashRegisterClass.setDisplayAmount( 0 );
        cashRegisterClass.setIsQtySelected( false );

    } else if ( cashRegisterClass.getQuantity() > 0 ) {
        CashRegisterMethods.addToSaleTotalQty( cashRegisterClass );

    } else if ( cashRegisterClass.getIsCashSelected() == true ) {
        cashRegisterClass = CashRegisterMethods.doPurchaseCash( cashRegisterClass );

        if ( cashRegisterClass.getErrorMessage().length > 0 ) {
            showErrorMessage();
            cashRegisterClass.setCashSubmitted( 0 );
        }
    } else if
     ( cashRegisterClass.getIsCardSelected() == true ) {
        cashRegisterClass = CashRegisterMethods.doPurchaseCard( cashRegisterClass );

    } else {
        CashRegisterMethods.addToSaleTotal( cashRegisterClass );
    }

    setFormControls();
}

function eventClickBtnBackSpace() {
    getFormControls();

   // Ensure Start Day Position is entered first.
   let errorMessage = CashRegisterMethods.validateDayStart( cashRegisterClass );

   if ( errorMessage != null ) {
       cashRegisterClass = CashRegisterMethods.truncateDisplayAmount( cashRegisterClass );
   } else {
       alert( errorMessage );
   }
   setFormControls();
}

// Pay Method Buttons.
function eventClickBtnQty() {

    console.log( 'Qty Clicked' );
    getFormControls();
    cashRegisterClass.setIsQtySelected( true );
    setFormControls();
}

function eventClickBtnPercent() {
    console.log( 'Percent Clicked' );
    getFormControls();
    setFormControls();
}

function eventClickBtnCash() {
    console.log( 'Cash Clicked' );
    getFormControls();

    cashRegisterClass.setIsCashSelected( true );

    setFormControls();
    setFormControlsDisabledTotal( false );

    if ( cashRegisterClass.getIsCashSelected() == true ) {
    } else if ( cashRegisterClass.getDisplayMode() == 'REFUND' ) {
    } else {
        setFormControlsDisabledTotal( true );
    }
}

function eventClickBtnCard() {
    console.log( 'Card Clicked' );
    getFormControls();
    setFormControls();

    cashRegisterClass.setIsCardSelected( true )
}

// Total Buttons.
function eventClickBtnSubTotal() {
    console.log( 'SubTotal Clicked' );
    getFormControls();
    setFormControls();

    setFormControlsDisabledCashCard( false );
}

function eventClickBtnTotal() {
    console.log( 'Total Clicked' )
    getFormControls();
    cashRegisterClass = CashRegisterMethods.updateCashRegister( cashRegisterClass )
    cashRegisterClass = CashRegisterMethods.refreshCashRegister( cashRegisterClass );
    setFormControls();
}
/*
 * Common Functions.
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
    /*
     * Pass values from Form Controls to Session Storage.
     * NOTE! THESE VALUES ARE STRINGS.
     */
    sessionStorage.setItem( 'dayStartDeposit', cashRegDepStart.value );
    sessionStorage.setItem( 'balanceRunning' , cashRegBalRun.value );
    sessionStorage.setItem( 'saleTotal'      , cashRegDipslaySaleTotal.value );
    sessionStorage.setItem( 'displayMode'    , cashRegDisplayMode.value );
    sessionStorage.setItem( 'displayAmount'  , cashRegDisplayAmount.value );
    /*
     * Pass values from Session Storage to Cash Register Class..
     * NOTE! STRINGS IN SESSION STORAGE NEED TO CONVERT TO NUMBER BEFORE PASSING INTO CLASS.
     */
    cashRegisterClass.setDayStartDeposit( Number( sessionStorage.getItem( 'dayStartDeposit' ) ) );
    cashRegisterClass.setBalanceRunning(  Number( sessionStorage.getItem( 'balanceRunning'  ) ) );
    cashRegisterClass.setDisplayMode(             sessionStorage.getItem( 'displayMode'     ) );
    cashRegisterClass.setSaleTotalAmount( Number( sessionStorage.getItem( 'saleTotal'       ) ) );  
    cashRegisterClass.setDisplayAmount(           sessionStorage.getItem( 'displayAmount'   ) );
    cashRegisterClass.setLastTxAmount(    Number( sessionStorage.getItem( 'lastTxAmount'    ) ) );
    cashRegisterClass.setIsQtySelected(  sessionStorage.getItem( 'isQtySelected'   ) ) ;

    if ( sessionStorage.getItem( 'isQtySelected' ) == '0' ) {
        cashRegisterClass.setIsQtySelected( false );
    } else {
        cashRegisterClass.setIsQtySelected( true );
    }
    cashRegisterClass.setQuantity( Number( sessionStorage.getItem( 'quantity' ) ) );
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
    /*
     * Pass values from Cash Register Class to Session Storage.
     * NOTE! - Numbers become strings when passed to session storage.
     */ 
    sessionStorage.setItem( 'dayStartDeposit', cashRegisterClass.getDayStartDeposit() );
    sessionStorage.setItem( 'balanceRunning' , cashRegisterClass.getBalanceRunning() );
    sessionStorage.setItem( 'displayMode'    , cashRegisterClass.getDisplayMode() );
    sessionStorage.setItem( 'saleTotal'      , cashRegisterClass.getSaleTotalAmount() );
    sessionStorage.setItem( 'displayAmount'  , cashRegisterClass.getDisplayAmount() );
    sessionStorage.setItem( 'lastTxAmount'   , cashRegisterClass.getLastTxAmount() );

    if ( cashRegisterClass.getIsQtySelected() == false ) {
        sessionStorage.setItem( 'isQtySelected', '0' ) 
    } else {
        sessionStorage.setItem( 'isQtySelected', '1' );
    }
    sessionStorage.setItem( 'quantity'       , cashRegisterClass.getQuantity() );
    /*
     * Pass values from Session Storage to Form Controls.
     * NOTE! Session storage values need to go from String To Number to Fixed 2 Decimals (as String ).
     */
    cashRegDepStart.value         = CashRegisterMethods.numberStringToFixed( sessionStorage.getItem( 'dayStartDeposit' ) );
    cashRegBalRun.value           = CashRegisterMethods.numberStringToFixed( sessionStorage.getItem( 'balanceRunning'  ) );
    cashRegDipslaySaleTotal.value = CashRegisterMethods.numberStringToFixed( sessionStorage.getItem( 'saleTotal') );
    cashRegDisplayMode.value      =                                          sessionStorage.getItem( 'displayMode' );
    cashRegDisplayAmount.value    =                                          sessionStorage.getItem( 'displayAmount');
    
    setFormControlsDisabled();
}

function setFormControlsDisabled() {

    let isEnterDigitDisabled  = ( cashRegDisplayMode.value == 'INIT' );

    let isDisplayModeSaleDisabled   = true;
    let isDisplayModeRefundDisabled = true;
    let isDisplayModeVoidDisabled   = true;
    let isDisplayModeClearDisabled  = true;
   
    switch( cashRegDisplayMode.value ) {
        case   'INIT':
            if ( Number( cashRegBalRun.value ) > 0.00 ) {
                isDisplayModeSaleDisabled   = false;
                isDisplayModeRefundDisabled = false;
                isDisplayModeVoidDisabled   = false;
                isDisplayModeClearDisabled  = false;
            }
            break;

        case   'SALE':
            isDisplayModeSaleDisabled   = false;
            break;

        case 'REFUND':
            isDisplayModeRefundDisabled = false;
            break;

        case   'VOID':
            isDisplayModeVoidDisabled   = false;
            break;

        case  'CLEAR':
            isDisplayModeClearDisabled  = false; 
            break;

        default:
            isEnterDigitDisabled = true;
    }

    document.getElementById( 'cash-reg-bal-run'            ).disabled = true;
    document.getElementById( 'cash-reg-display-mode'       ).disabled = true;
    document.getElementById( 'cash-reg-display-sale-total' ).disabled = true;
    document.getElementById( 'cash-reg-display-amount'     ).disabled = true;

    document.getElementById( 'btn-sale'   ).disabled = isDisplayModeSaleDisabled;
    document.getElementById( 'btn-refund' ).disabled = isDisplayModeRefundDisabled;
    document.getElementById( 'btn-void'   ).disabled = isDisplayModeVoidDisabled;
    document.getElementById( 'btn-clear'  ).disabled = isDisplayModeClearDisabled;

    document.getElementById( 'btn-seven' ).disabled = isEnterDigitDisabled;
    document.getElementById( 'btn-eight' ).disabled = isEnterDigitDisabled;
    document.getElementById( 'btn-nine'  ).disabled = isEnterDigitDisabled;

    document.getElementById( 'btn-four' ).disabled = isEnterDigitDisabled;
    document.getElementById( 'btn-five' ).disabled = isEnterDigitDisabled;
    document.getElementById( 'btn-six'  ).disabled = isEnterDigitDisabled;

    document.getElementById( 'btn-one'   ).disabled = isEnterDigitDisabled;
    document.getElementById( 'btn-two'   ).disabled = isEnterDigitDisabled;
    document.getElementById( 'btn-three' ).disabled = isEnterDigitDisabled;

    document.getElementById( 'btn-zero'   ).disabled = isEnterDigitDisabled;
    document.getElementById( 'btn-zeroes' ).disabled = isEnterDigitDisabled;
    document.getElementById( 'btn-dot'    ).disabled = isEnterDigitDisabled;

    document.getElementById( 'btn-enter'     ).disabled = isEnterDigitDisabled;
    document.getElementById( 'btn-backSpace' ).disabled = isEnterDigitDisabled;

    document.getElementById( 'btn-qty'     ).disabled = isEnterDigitDisabled;
    document.getElementById( 'btn-percent' ).disabled = isEnterDigitDisabled;

    document.getElementById( 'btn-subtotal' ).disabled = isEnterDigitDisabled;

    setFormControlsDisabledCashCard( true );
    setFormControlsDisabledTotal( true );
}

function setFormControlsDisabledCashCard( anyFlag ) {

    document.getElementById( 'btn-cash' ).disabled = anyFlag;
    document.getElementById( 'btn-card' ).disabled = anyFlag;
}

function setFormControlsDisabledTotal( anyFlag ) {

    document.getElementById( 'btn-total'    ).disabled = anyFlag;
}

function showErrorMessage() {
    alert(cashRegisterClass.getErrorMessage() );
    cashRegisterClass.setErrorMessage( '' );
}
