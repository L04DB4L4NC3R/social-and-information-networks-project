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
        await driver.get("https://twitter.com/login?lang=en");
        await driver.findElement(By.name("session[username_or_email]"))
        .sendKeys("nodemon",Key.RETURN);
        await driver.findElement(By.name("session[password]"))
        .sendKeys("nodemon",Key.RETURN);
        

        // let element = await driver.findElement({className:"flush-left"});
        // console.log(await element.getAttribute('innerHTML'))


        await driver.wait(until.titleIs("webdriver - google search"),5000)


    } finally{
        await driver.quit();
    }
}



func();