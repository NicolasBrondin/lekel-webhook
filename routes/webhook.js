exports.process_request = function(req, res) {
    var o = {
        
            "speech": "Today in Boston: Fair, the temperature is 37 F",
            "source": "apiai-weather-webhook-sample",
            "displayText": "Today in Boston: Fair, the temperature is 37 F"
        
    };
    res.json(200,o);
    
};
/*
{
    product: "computer"
    activity: "pro",
    power: "average",
    storage: "much storage",
         screen: '13"'
        price: "1300",
   */        
        