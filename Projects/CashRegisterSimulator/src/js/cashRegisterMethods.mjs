/*
 * Script       :CashRegParams.mjs
 * Author       :Richard Maida Jimenez
 * Version      :1.00
 * Date         :November 2024.
 * Description  :Methods associated with the Cash Register for the Web Cash Register Simulator.
 */
/*
 * Declare Imports.
 */
import CashRegisterClass from './cashRegisterClass.mjs';

export function addToSaleTotal( anyCashRegisterClass ) {

    let displayAmount = Number( anyCashRegisterClass.getDisplayAmount() );
    
    anyCashRegisterClass.setSaleTotalAmountAdd( displayAmount );
    anyCashRegisterClass.setDisplayAmount( 0 );
    
    return anyCashRegisterClass;
}

export function addToSaleTotalQty( anyCashRegisterClass ) {

    let displayAmount = Number( anyCashRegisterClass.getDisplayAmount() );
    let quantity      =         anyCashRegisterClass.getQuantity() ;
    let saleAmount    = displayAmount * quantity;

    anyCashRegisterClass.setSaleTotalAmountAdd( saleAmount );
    anyCashRegisterClass.setDisplayAmount( 0 );
    anyCashRegisterClass.setQuantity( 0 );
}

export function appendDisplayAmount( anyDigitStrg, anyCashRegisterClass ) {
    /*
     * Appends a given digit to the Display Amount.
     *
     * USAGE:
     * ------
     *  IN: anyDigitStrg
     *      anyCashRegisterClass
     * OUT: anyCashRegisterClass
     */
    let decInStrg     = '';
    let dispAmtArray  = '';
    let displayAmount = anyCashRegisterClass.getDisplayAmount();

    if ( displayAmount == 0 ) {
        displayAmount = anyDigitStrg; 

    } else {
        displayAmount += anyDigitStrg;
        decInStrg      = displayAmount.indexOf( '.' );

        if ( decInStrg > 0 ) {
            dispAmtArray = displayAmount.split('.');

            if ( dispAmtArray[1].length > 2 ) {
                dispAmtArray[1] = dispAmtArray[1].substring( 0, 2 );
            }
            displayAmount = dispAmtArray[0] + '.' + dispAmtArray[1];
        }
    }
    anyCashRegisterClass.setDisplayAmount( displayAmount );
    return anyCashRegisterClass
}

export function truncateDisplayAmount( anyCashRegisterClass ) {

    let displayAmount = anyCashRegisterClass.getDisplayAmount();
        displayAmount = parseInt( displayAmount.toString().slice( 0, -1) );

    if ( isNaN( displayAmount ) ) {
        displayAmount = 0;
    }

    anyCashRegisterClass.setDisplayAmount( displayAmount );

    return anyCashRegisterClass;
}

export function numberStringToFixed( anyNumberString ) {
    /*
     * Passed back number as string fixed to 2 decimals from a given string which must be cast as 
     * number first.
     * 
     * USAGE:
     * ------
     *  IN: anyNumberString
     * OUT: numberDecimal.
     */
    let numberFormat  = Number( anyNumberString );
    let numberDecimal = numberFormat.toFixed(2);

    return numberDecimal;
}

export function validateDayStart( anyCashRegisterClass ) {
    /*
     * Returns valid flag after ensuring a Start Day Position has been entered.
     *
     * USAGE:
     * ------
     *  IN: anyCashRegisterClass.
     * OUT: errorMessage.
     */
    let errorMessage = '';

    if ( anyCashRegisterClass.getDayStartDeposit() <= 0 ) {
        errorMessage = 'Transactions cannot be entered until Day Start Cash Deposit has been entered.';
    }
    return errorMessage;
}   

export function doPurchaseCard( anyCashRegisterClass ) {

    anyCashRegisterClass.setCardAmount( anyCashRegisterClass.getDisplayAmount() );

    return anyCashRegisterClass;
}

export function doPurchaseCash( anyCashRegisterClass ) {

    anyCashRegisterClass.setCashSubmitted( anyCashRegisterClass.getDisplayAmount() );

    let balRunPrevious  = anyCashRegisterClass.getBalanceRunning();
    let cashChangeCheck = anyCashRegisterClass.getCashSubmitted() - anyCashRegisterClass.getSaleTotalAmount();

    if ( cashChangeCheck < 0 ) {
        anyCashRegisterClass.setErrorMessage( 'Insufficient Cash Submitted' );
    }

    if ( anyCashRegisterClass.getErrorMessage().length == 0 ) {
        //anyCashRegisterClass.setCashSubmitted( anyCashRegisterClass.getDisplayAmount() );
        anyCashRegisterClass.setCashChange( anyCashRegisterClass.getCashSubmitted() -  anyCashRegisterClass.getSaleTotalAmount() )

        let cashBalNotional = balRunPrevious + anyCashRegisterClass.getCashSubmitted();
        anyCashRegisterClass.setDisplayAmount( anyCashRegisterClass.getCashChange() );
    }

    return anyCashRegisterClass;
}

export function updateCashRegister( anyCashRegisterClass ) {
    let cr_dr = ''

    switch( anyCashRegisterClass.getDisplayMode() ) {
        case 'SALE':
            cr_dr = 'CR';
            break;

        case 'REFUND':
            cr_dr = 'DR';
            break;
    }

    anyCashRegisterClass.setBalanceRunningAmend( anyCashRegisterClass.getSaleTotalAmount(), cr_dr );
    anyCashRegisterClass.setLastTxAmount( anyCashRegisterClass.getSaleTotalAmount() );

    return anyCashRegisterClass;
}

export function refreshCashRegister( anyCashRegisterClass ) {

    anyCashRegisterClass.setDisplayAmount( 0 );
    anyCashRegisterClass.setSaleTotalAmount( 0 );
    anyCashRegisterClass.setIsCashSelected( false );
    anyCashRegisterClass.setCashSubmitted( 0 );
    anyCashRegisterClass.setCashChange( 0 );
    anyCashRegisterClass.setIsCardSelected( false );
    anyCashRegisterClass.setCardAmount( 0 );
    anyCashRegisterClass.setDisplayMode( 'INIT' );

    return anyCashRegisterClass;
}