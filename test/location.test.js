const Todos = require('../logic.js');
const assert = require('assert');

describe('Location', function() {
  before(function() {
    this.loc = new Todos.Location();
    this.obj = {};
  })
  context('#constructor()', function() {
    it('should assign null to ymin and xmax', function() {
      assert.equal(this.loc.ymin, null);
      assert.equal(this.loc.xmax, null);
    });
    it('updates according to given obj parameter', function() {
      this.obj.x = 1000;
      this.loc.update(this.obj);
      assert.equal(this.loc.x, this.obj.x);
    })
  });
  context('#update()', function() {
    it('preserve existing properties', function() {
      this.obj.y = -1000;
      this.loc.update(this.obj);
      this.loc.update({ymax: -2000});
      assert.equal(this.obj.y, this.loc.y)
    });
    it('merge properties passed in as an object', function() {
      this.loc.y = -200;
      this.loc.update({x: 100});
      assert.equal(this.loc.y, -200);
    })
  })
});
