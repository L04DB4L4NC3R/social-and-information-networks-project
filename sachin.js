const {
    Builder,
    By,
    Key,
    until,
    click
} = require("selenium-webdriver");

const readline = require("readline");

var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});




var username = "";
var password = "";





let func = async ()=>{
    let driver = await new Builder().forBrowser("firefox").build();

    try{
        await driver.get("https://twitter.com/login");
        await driver.findElement(By.className("js-username-field"))
        .sendKeys(username);
        await driver.findElement(By.className("js-password-field"))
        .sendKeys(password);
       await driver.findElement({className:"EdgeButtom--medium"}).click();
        
        await driver.get(`https://twitter.com/sachin_rt/followers`);

        let list = await driver.findElements({className:"fullname"});

        let arr = [],temp = '',count=0;

        console.log("\n\nThe followers of sachin tendulkar are: \n");
        for(el of list){
            temp = await el.getAttribute("href");
           if(temp){
               temp = temp.split("https://twitter.com/");
               if(temp[1] != "sachin_rt"){
                console.log(temp[1]);
                count++;
                if(count>100)
                    break;
                if(count%30 === 0)
                    await driver.executeScript("window.scrollBy(0,1000)");
                
               }
              
           }
        }



    } catch(err){
        console.log("Something went wrong");
    } finally{
        await driver.quit();
    } 
}









rl.question("Enter your twitter username:  ",(res)=>{
    rl.stdoutMuted = true;
    rl.question("Password:  ",(resp)=>{
       username = res;
       password = resp;
       rl.close();
       func();
    });
});


rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl.stdoutMuted)
      rl.output.write("\x1B[2K\x1B[200D"+"Password:  "+"["+((rl.line.length%2==1)?"=-":"-=")+"]");
    else
      rl.output.write(stringToWrite);
  };