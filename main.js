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
        
        await driver.get(`https://twitter.com//${username}/followers`)

        await driver.wait(until.titleIs("webdriver - google search"),100000)


    } finally{
        await driver.quit();
    }
}



func();