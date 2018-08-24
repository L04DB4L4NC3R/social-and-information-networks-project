const {
    Builder,
    By,
    Key,
    until,
    click
} = require("selenium-webdriver");


let func = async ()=>{
    let driver = await new Builder().forBrowser("firefox").build();

    try{
        await driver.get("https://twitter.com/login");
        await driver.findElement(By.className("js-username-field"))
        .sendKeys("");
        await driver.findElement(By.className("js-password-field"))
        .sendKeys("");
       await driver.findElement({className:"EdgeButtom--medium"}).click();
        
        await driver.findElement(By.className("ProfileCardStats-statLink u-textUserColor u-linkClean u-block js-nav js-tooltip")).click();


        await driver.wait(until.titleIs("webdriver - google search"),10000)


    } finally{
        await driver.quit();
    }
}



func();