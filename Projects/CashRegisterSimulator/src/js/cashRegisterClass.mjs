/*
 * Script       :CashRegParams.mjs
 * Author       :Richard Maida Jimenez
 * Version      :1.00
 * Date         :October 2024.
 * Description  :Properties and Methods associated with the Cash Register for the Web Cash Register Simulator.
 */
/*
 * Declare Imports.
 */
/*
 * Declare Class.
 */
export default class CashRegister {
    /*
     * All variables and private.
     */
    _dayStartDeposit = null;
    _balanceRunning  = null;
    _displayMode     = null;
    _displayAmount   = null;
    _saleTotalAmount = null;
    _lastTxAmount    = null;
    _isQtySelected   = null;
    _quantity        = null;
    _isCashSelected  = null;
    _cashSubmitted   = null;
    _cashChange      = null;
    _isCardSelected  = null;
    _cardAmount      = null;
    _errorMessage    = null;
     /*
     * Constructor.
     */
    constructor() {
        this.setDayStartDeposit( 0 );
        this.setBalanceRunning( 0 );
        this.setDisplayMode( 'INIT' );
        this.setDisplayAmount( 0 ); 
        this.setSaleTotalAmount( 0 );
        this.setLastTxAmount( 0 );
        this.setIsQtySelected( false );
        this.setQuantity( 0 );
        this.setIsCashSelected( false );
        this.setCashSubmitted( 0 );
        this.setCashChange( 0 );
        this.setIsCardSelected( false );
        this.setCardAmount( 0 );
        this.setErrorMessage( '' );
    }
    /*
     * Accessor methods (public)....Basic Data.
     */
    // Balance Day Start.
    getDayStartDeposit() {
        /*
         * Returns Day Start Deposit.
         */
        return this._dayStartDeposit;
    }
    
    setDayStartDeposit( anyDayStartDeposit ) {
        /*
         * Sets Day Start Deposit with a given amount.
         */
        this._dayStartDeposit = anyDayStartDeposit;
    }
    
    // Running Balance. 
    getBalanceRunning() {
        /*
         * Returns Running Balance.
         */
        return this._balanceRunning;
    }

    setBalanceRunning( anyBalanceRunning ) {
        /*
         * Sets Running Balance.
         *
         * USAGE:
         * -----
         * IN : anyBalanceRunning - amount to add or subtract from running total.
         */
         this._balanceRunning = anyBalanceRunning;
    }

    setBalanceRunningAmend( anyBalanceUpdate, anyCrDr ) {
        /*
         * Sets Running Balance with a given update and a given Credit or Debit.
         *
         * USAGE:
         * -----
         * IN : anyBalanceUpdate - amount to add or subtract from running total.
         *      anyCrDr          - Credit/Debit.
         * OUT: isOk - boolean denotes if update okay or not. Caller raises error if not okay.
         */
        let isOk = true;

        if ( anyCrDr == 'CR') {
            this._balanceRunning += anyBalanceUpdate;

        } else {
            if ( anyBalanceUpdate > this._balanceRunning ) {
                isOk = false;

            } else {
                this._balanceRunning -= anyBalanceUpdate;
            }
        }

        if ( isOk ) {
            this._balanceRunning = Math.ceil( this._balanceRunning * 100 ) / 100;    // To 2 dp.
        }
        return isOk;
    }

    // Display Mode.
    getDisplayMode() {
        return this._displayMode;
    }
    
    setDisplayMode( anyDisplayMode ) {
        this._displayMode = anyDisplayMode;
    }
    
    // Display Amount.
    getDisplayAmount() {
        return this._displayAmount;
    }

    setDisplayAmount( anyDisplayAmount ) {
        this._displayAmount = anyDisplayAmount;
    }

    // Sale Total Amount.
    getSaleTotalAmount() {
        return this._saleTotalAmount;
    }

    setSaleTotalAmount( anySaleAmount ) {
        this._saleTotalAmount = anySaleAmount;
    }

    setSaleTotalAmountAdd( anyDisplayAmount ) {
        this._saleTotalAmount += anyDisplayAmount;
    }

    // Last Transaction Amount.
    getLastTxAmount() {
        return this._lastTxAmount;
    }

    setLastTxAmount( anyLastTxAmount ) {
        this._lastTxAmount = anyLastTxAmount;
        return;
    }

    getIsQtySelected() {
        return this._isQtySelected;    
    }

    setIsQtySelected( anyFlag ) {
        this._isQtySelected = anyFlag;
    }

    getQuantity() {
        return this._quantity;
    }
    
    setQuantity( anyQuantity ) {
        this._quantity = anyQuantity;
    }

    getIsCashSelected() {
        return this._isCashSelected;
    }

    setIsCashSelected( anyIsCashSelected ) {
        this._isCashSelected = anyIsCashSelected;
    }
   
    getCashSubmitted() {
        return this._cashSubmitted;
    }

    setCashSubmitted( anyCashSubmitted ) {
        this._cashSubmitted = anyCashSubmitted;
    }

    getCashChange() {
        return this._cashChange;
    }

    setCashChange( anyCashChange ) {
        this._cashChange = anyCashChange;
    }

    getIsCardSelected() {
        return this._isCardSelected;
    }

    setIsCardSelected( anyIsCardSelected ) {
        this._isCardSelected = anyIsCardSelected;
    }

    getCardAmount() {
        return this._cardAmount;
    }

    setCardAmount( anyCardAmount ) {
        this._cardAmount = anyCardAmount;
    }

    getErrorMessage() {
        return this._errorMessage;
    }

    setErrorMessage( anyErrorMessage ) {
        this._errorMessage = anyErrorMessage;
    }
}
    /*
     * Accessor methods (public)....Audit Transction Data.
     *
    // Count of Audit Transaction.
    getAuditTxCount() {
        return this.#auditTxCount;
    }

    setAuditTxCount( anyTxCount ) {
        this.#auditTxCount = anyTxCount;
    }

    setAuditTxCountIncr() {
        this.#auditTxCount++;
    }
 
    // Pay Type Codes.
    getAuditTxPayTypeCodes() {
        return this.#auditTxPayTypeCodes;
    }

    setAuditTxPayTypeCodesAdd( anyTxTypeCode ) {
        this.#auditTxPayTypeCodes.push( anyTxTypeCode );
        return;
    }

    // Pay Type Descs.
    getAuditTxPayTypeDescs() {
        return this.#auditTxPayTypeDescs;
    }
    
    setAuditTxPayTypeDescsAdd( anyTxPayTypeDesc ) {
        this.#auditTxPayTypeDescs.push( anyTxPayTypeDesc );
    }
    
    // Running Balance As At Previous Transaction.
    getAuditTxRunPrev() {
        return this.#auditTxRunPrev;
    }

    setAuditTxRunPrevAdd( anyTxRunPrev ) {
        this.#auditTxRunPrev.push( anyTxRunPrev );
        return;
    }

    // Transaction Amounts.
    getAuditTxAmounts() {
        return this.#auditTxAmounts;
    }

    setAuditTxAmountsAdd(  anyTxAmount ) {
        this.#auditTxAmounts.push( anyTxAmount );
        return;
    }

    // Cash Submitted.
    getAuditTxCashSubmits() {
        return this.#auditTxCashSubmits;
    }
    
    setAuditTxCashSubmitsAdd( anyCashSubmit ) {
        this.#auditTxCashSubmits.push( anyCashSubmit )
    }

    // Change Due.
    getAuditTxChangeDues() {
        return this.#auditTxChangeDues;
    }

    setAuditTxChangeDuesAdd( anyChangeDue ) {
        this.#auditTxChangeDues.push( anyChangeDue );
        return
    }
  
    // VAT.
    getAuditTxVATs() {
        return this.#auditTxVATs;
    } 
    
    setAuditTxVATsAdd( anyAuditVAT ) {
        this.#auditTxVATs.push( anyAuditVAT );
        return
    }

    // Pay Methods.
    getAuditTxPayMethods() {
        return this.#auditTxPayMethods;
    }
    
    setAuditTxPayMethodsAdd( anyTxPayMethod ) {
        this.#auditTxPayMethods.push( anyTxPayMethod );
        return;
    }

    getAuditTxRunBal() {
        return this.#auditTxRunBal;
    }

    setAuditTxRunBalAdd( anyTxRunBal ) {
        this.#auditTxRunBal.push( anyTxRunBal );
        return;
    }

    getAuditTxLog() {
        return this.#auditTxLog;
    }

    setAuditTxLog( anyAuditTxHeaders ) {

        this.#auditTxLog = [];
        let auditTxRow   = [];
        let thisHdrCol   = 0;
        let thisTxRow    = 0;

        for ( thisHdrCol == 0; thisHdrCol < anyAuditTxHeaders.length; thisHdrCol++ ) {
            auditTxRow[thisHdrCol] = anyAuditTxHeaders[thisHdrCol];
        }
        this.#auditTxLog.push( auditTxRow );

        for ( thisTxRow == 0; thisTxRow < this.#auditTxAmounts.length; thisTxRow++ ) {
            auditTxRow = [];

            auditTxRow[0] = this.getAuditTxPayTypeCodes()[thisTxRow];
            auditTxRow[1] = this.getAuditTxPayTypeDescs()[thisTxRow];
            auditTxRow[2] = this.getAuditTxRunPrev()[thisTxRow];
            auditTxRow[3] = this.getAuditTxAmounts()[thisTxRow];
            auditTxRow[4] = this.getAuditTxCashSubmits()[thisTxRow];
            auditTxRow[5] = this.getAuditTxChangeDues()[thisTxRow];
            auditTxRow[6] = this.getAuditTxRunBal()[thisTxRow];
            auditTxRow[7] = this.getAuditTxPayMethods()[thisTxRow];
            auditTxRow[8] = this.getAuditTxVATs()[thisTxRow];

            this.#auditTxLog.push( auditTxRow );
        }
        
        return;
    }

    setTxAuditLogAdd( anyPaymentTypeCode, anyPaymentTypeDesc, anyBalancePrevious, anyAuditTxAmount,
                      anyAuditCashSubmit, anyAuditChangeDue, anyAuditTxVAT ) {

        this.setAuditTxCountIncr();
        this.setAuditTxPayTypeCodesAdd( anyPaymentTypeCode );
        this.setAuditTxPayTypeDescsAdd( anyPaymentTypeDesc );
        this.setAuditTxRunPrevAdd( anyBalancePrevious, );
        this.setAuditTxAmountsAdd(  anyAuditTxAmount );
        this.setAuditTxCashSubmitsAdd( anyAuditCashSubmit ) ;
        this.setAuditTxChangeDuesAdd( anyAuditChangeDue );
        this.setAuditTxVATsAdd( anyAuditTxVAT );
        this.setAuditTxRunBalAdd( this.getBalanceRunning() );
        this.setAuditTxPayMethodsAdd( 'CASH' );   // Cash only for now.

        return
    }
}
   /*#balanceCash  = 0.00; // Running cash balance.
    #balanceCard  = 0.00; // Running card balance.
    #totalGbp20   = 0.00; // £20 Pound notes total.
    #totalGbp10   = 0.00; // £10 Pound notes total.
    #totalGbp5    = 0.00; // £5  Pound notes total.
    #totalPence50 = 0.00; // 50p coins total.
    #totalPence20 = 0.00; // 20p coins total.
    #totalPence10 = 0.00; // 10p coins total.
    #totalPence5  = 0.00; // 5p coins total.
    #totalPence2  = 0.00; // 2p coins total.
    #totalPence1  = 0.00; // 1p coins total.*/