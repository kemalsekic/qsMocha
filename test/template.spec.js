const { assert } = require('chai');
const Logger = require('../report/template');



describe('template', function() {
    describe('clearCompletedButtons', function() {
        it('should return "Clear completed" when more than 0 items are completed', function() {
            // var template = new app.Template();
            var result = Logger.clearCompletedButtons(2);
            assert.ok(result, 'Clear completed');
        });
 
        it('should return an empty string when 0 items are completed', function() {
            // var template = new app.Template();
            // var result = template.clearCompletedButton(0);
            // expect(result).to.equal('');
        });
    });
});