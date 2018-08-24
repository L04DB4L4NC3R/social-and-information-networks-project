const {
    Builder,
    By,
    Key,
    until,
    click
} = require("selenium-webdriver");


let func = async ()=>{
    let driver = await new Builder().forBrowser("firefox").build();
    let username = "";
    let password = "";

    try{
        await driver.get("https://twitter.com/login");
        await driver.findElement(By.className("js-username-field"))
        .sendKeys(username);
        await driver.findElement(By.className("js-password-field"))
        .sendKeys(password);
       await driver.findElement({className:"EdgeButtom--medium"}).click();
        
        await driver.get(`https://twitter.com//${username}/followers`);

        let list = await driver.findElements({className:"fullname"});

        let arr = [],temp = '';

        console.log("Your followers are: \n");

        for(el of list){
            temp = await el.getAttribute("href");
           if(temp){
               temp = temp.split("https://twitter.com/");
               if(temp[1] != username)
                console.log(temp[1]);
           }
        }



    } catch(err){
        console.log("Something went wrong");
    } finally{
        await driver.quit();
    } 
}



func();