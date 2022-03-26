# Node Queue And Error Logs

### Add Functions

```
queue.addCallback("functionConsole",function(object){
    console.log(object.text)
    console.log(queue.log) // Get Logs
})

queue.addCallback("consoleErrorTest",function(object){
    if(object.randomNumber>5){
        throw "Error: random number is greater than 5";
    }
    
    console.log("Test: "+object.text)
})
```

###  Add Queue Items
```
queue.additem({"callback":"functionConsole","object": {"text": "Console Test"}})
queue.additem({"callback":"functionConsole","object": {"text": "Console Test 2"}})
for(let i = 0; i < 1000; i++){
    queue.additem({"callback":"consoleErrorTest","object": {"text": "Item Number: "+i, "randomNumber": Math.floor(Math.random() * 11)}})
}
```


###  Run Queue
```
queue.start({
    delay: 2000,
    errorLog: true,
    showMessage: true,
    showLogs: true,
    errorLogLimit: 3
});
```