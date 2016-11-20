/*require('blanket')({
    pattern: function (filename) {
        return !/node_modules/.test(filename);
    }
});*/

require('./BeforeTest.js');
require('./AdminTest.js');
require('./CustomerTest.js');
require('./FoodTest.js');
require('./DescriptorTest.js');
require('./TasterTest.js');
require('./UserTest.js');
require('./WineTest.js');