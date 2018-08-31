const {
    Builder,
    By,
    Key,
    click
} = require("selenium-webdriver");

const readline = require("readline");

var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

var username = "";
var password = "";


rl.question("Enter your facebook username:  ",(res)=>{
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

let func = async ()=>{
    let driver = await new Builder().forBrowser("firefox").build();

    try{
        await driver.get("https://facebook.com/");
        await driver.findElement(By.id("email"))
        .sendKeys(username);

        await driver.findElement(By.id("pass"))
        .sendKeys(password);

        await driver.findElement(By.id("loginbutton")).click();

        await driver.get("https://www.facebook.com/shaka.annaba/friends?lst=100007806277392%3A100007806277392%3A1535736881&source_ref=pb_friends_tl")

        let friendsObj = await driver.findElements(By.className("fsl fwb fcb")),f='',status='',singles=[];

        for(friend of friendsObj){
            f = await friend.findElement(By.tagName("a")).getAttribute("href");
            f = f.split("?")[0].slice(25);
            
            await driver.get(`https://www.facebook.com/${f}/about?section=relationship`);
            status = await driver.findElement(By.className("_6a _6b")).getText();
            
            if(status==="No relationship info to show")
                singles.push(status);

            await driver.get("https://www.facebook.com/shaka.annaba/friends?lst=100007806277392%3A100007806277392%3A1535736881&source_ref=pb_friends_tl");
        }
        console.log(singles);

    } catch(err){
        console.log(err);
    } finally{
        await driver.quit();
    }
}