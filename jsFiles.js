/*
Conflicts with Requirements : 
1 ==> Showing or hiding the buttons like "save", "delete" is not clear. Not specified in requirements.
Assumption : On form show, I'm showing the buttons also. (Save, Cancel, Delete).

2 ==> Input fields are initially disabled. But gets editable out of context. (Not mentioned in user story).
Assumption : Taking every field as editable by default.

3 ==> Top-right corner result button is out of contextual (For some mock, its shown and others, hidden).
*/

function PaymentsController(scope, $window, $filter) {
	scope.showForm = false;
	scope.showDelete = true;
	fromNewPayments = false;
	scope.disableSave = true;
    scope.payments = [{
        id: 1,
        counterparty: "Wood-u-like",
        amount: "2,240.00",
        currency: "GBP",
        valueDate: "22/10/2015",
        creditAccount: "68794832"
    }, {
        id: 2,
        counterparty: "Bag o' nails",
        amount: "1,500.00",
        currency: "GBP",
        valueDate: "22/10/2015",
        creditAccount: "30921782"
    }, {
        id: 3,
        counterparty: "Fatcat Investors",
        amount: "22,000.00",
        currency: "USD",
        valueDate: "31/10/2015",
        creditAccount: "44236712"
    }];
	
	initialiseRedBoxes = function(){
		scope.cptyred = false;
		scope.datered = false;
		scope.accred = false;
		scope.amtred = false;
		scope.curred = false;
	};
	//show or hide the form
	scope.showFormFn = function(index){
		fromNewPayments = false;
		scope.curIndex = index;
		scope.cancelClicked = true;
		scope.showDelete = true;
		scope.showForm = true;
		scope.counterparty = scope.payments[index].counterparty;
		scope.valueDate = scope.payments[index].valueDate;
		scope.creditAccount = scope.payments[index].creditAccount;
		scope.amount = scope.payments[index].amount;
		scope.currency = scope.payments[index].currency;
		scope.validation();
	}
	
	//validations function
	scope.validation = function(){
		initialiseRedBoxes();
		scope.disableSave = true;
		var undefinedOrNull = function(item){
			if(item === undefined || item === null || item === ''){
				return true;
			}
		};
		if(undefinedOrNull(scope.counterparty) || scope.counterparty.length > 50){
			scope.cptyred = true;
			return false;
		}if(undefinedOrNull(scope.valueDate) || scope.valueDate.length != 10 || scope.valueDate.substr(0,2) < 1 || scope.valueDate.substr(0,2) > 31 || scope.valueDate.substr(2,1) != "/" || scope.valueDate.substr(3,2) < 1 || scope.valueDate.substr(3,2) > 12 || scope.valueDate.substr(5,1) != "/"){
			scope.datered = true;
			return false;
		}if(undefinedOrNull(scope.creditAccount) || scope.creditAccount.length != 8){
			scope.accred = true;
			return false;
		}if(undefinedOrNull(scope.amount) || scope.amount <= 0){
			scope.amtred = true;
			return false;
		}
		scope.amount = scope.amount.replace(/\,/g,"");
		scope.amount = $filter('number')(scope.amount,2);
    console.log(scope.amount);
		if(undefinedOrNull(scope.currency) || scope.currency.length != 3){
			scope.curred = true;
			return false;
		}
		scope.disableSave = false;
	}
	//save functionality
	scope.saveFormFn = function(){
		initialiseRedBoxes();
		paymentApp.$invalid = false;
		if(fromNewPayments){
			var newElement = {};
			newElement.counterparty = scope.counterparty;
			newElement.valueDate = scope.valueDate;
			newElement.creditAccount = scope.creditAccount;
			newElement.amount = scope.amount;
			newElement.currency = scope.currency;
			scope.payments.push(newElement);
		}else{
			scope.payments[scope.curIndex].counterparty = scope.counterparty;
			scope.payments[scope.curIndex].valueDate = scope.valueDate;
			scope.payments[scope.curIndex].creditAccount = scope.creditAccount;
			scope.payments[scope.curIndex].amount = scope.amount;
			scope.payments[scope.curIndex].currency = scope.currency;
		}
		scope.showDelete = true;
		scope.showForm = false;
		scope.cancelClicked = false;
	}
	
	//delete functionality
	scope.deleteListFn = function(){
		scope.payments.splice(scope.curIndex, 1);
		scope.showForm = false;
		scope.cancelClicked = false;
	}
	scope.createNewPaymentfn = function(){
		scope.showDelete = false;
		scope.showForm = true;
		fromNewPayments = true;
		initialiseRedBoxes();
		scope.counterparty = '';
		scope.valueDate = '';
		scope.creditAccount = '';
		scope.amount = '';
		scope.currency = '';
	}
}

angular.module("paymentsApp", [])
    .controller("PaymentsController", ["$scope", "$window", '$filter', PaymentsController]);