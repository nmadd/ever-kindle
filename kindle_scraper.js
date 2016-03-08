var system = require('system');
var casper = require('casper').create({
    pageSettings: {
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});

casper.start().thenOpen('https://kindle.amazon.com/your_highlights', function() {
    this.echo('Opening highlights');
});

casper.then(function(){
    console.log("Login using username and password");
    this.evaluate(function(personal_email, kindle_pass){
        document.getElementById("ap_email").value = personal_email;
        document.getElementById("ap_password").value = kindle_pass;
        document.getElementById("signInSubmit").click();
    }, {personal_email: system.env.PERSONAL_EMAIL, kindle_pass: system.env.KINDLE_PASS});
});
 
casper.then(function(){
    casper.wait(3000);
    // console.log("SCroll to bottom");
    casper.repeat(200, function(){
        this.scrollToBottom();
        casper.wait(3000);
    })
    
});

casper.then(function(){
    casper.wait(5000);
    console.log("Make a screenshot and save it");
    this.capture('Highlights3.png');
});
 
casper.run();

//div id = "stillLoadingBooks"

//the function I'm trying to recursively loop before moving on to saving the capture image
function checkMore() {

    //check to see if the 'read more' button exists
    if (casper.exists('#stillLoadingBooks')) {

        //scroll to bottom      
        casper.scrollToBottom();

        //wait for the items to load, then run the check again
        casper.wait(3000, checkMore);

    }

}

// casper.thenOpen(urls.details, function() {

//     //wait for the page along with ajax items to load shortly after
//     this.wait(3000, checkMore);

// });