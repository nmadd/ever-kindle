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
    casper.wait(500);
    // console.log("SCroll to bottom");
    casper.repeat(5, function(){
        this.scrollToBottom();
        casper.wait(1000);
    })
    
});

casper.then(function(){
    casper.wait(5000);
    console.log("Make a screenshot and save it");
    this.capture('Highlights8.png');
    var elements;
    this.evaluate(function(){
        elements = document.querySelectorAll('div');
    })
    console.log('elements', elements);
});
 
casper.run();