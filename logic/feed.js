console.log('feed.js connected');

// move this logic to the feed.js file
// add click handelers to both buttons and send ajax calls to them specifically to match the routes in controllers
// 0. Fire AJAX to appropriate route
// Note: Be sure to reset the value when you log out
// Iinside of function that runs when user logs out, add:
// 0. Update the database
// 1. Upudate window.loggedInUser

// SERIOUS FOOTGUN.   
// window.loggedInUser = returnedUser;
// window.loggedInUser.email;

// 0. Getting numbers to db/routes, then actual processing/math is done on server
$("#pay").on("click", function () {
    console.log("pay button clicked");
    $.ajax({
        url: '/api/transactions/pay', // Be careful re any captured params you might need
        method: 'POST',
        data: {
            payer_email: window.localStorage.getItem('email'),
            payee_email: $("#username").val(),
            dollar_amount: $("#amount").val(),
            transaction_type: "pay"
            // updatedAt: Date.now()
        }
    }).then(function (result) {
        // .then call is not necessary
        console.log(result);
    }).fail(function (error) {
        console.error(error);
        // add a div w/ a red border explaining the error
    })
})

$(document).ready(function() {
    console.log("ding dong");
    $.ajax({
        url:'/api/transactions'
    }).then(function(result) {
        console.log(result);
        // render transactions
        renderTransactions(result);
    })
})

function renderTransactions(dbResult) {
    // prepend all transaction data from the object
        // create html elements for each item 
        // for loop through object 
    let transaction = $("<div>");
    console.log("dbResult is " + dbResult);
}