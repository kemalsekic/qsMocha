"use strict";

var _require = require("chai"),
    assert = _require.assert;

var Logger = require("../report/template");

var expect = require("chai").expect;

var converter = require("../app/converter");

describe("Color Code Converter", function () {
  it("Converts RGB to Hex colors", function () {
    var redHex = "Red Color";
    expect(redHex).to.equal("Red Colors");
  });
  it("Converts Hex to RGB colors", function () {
    var red = converter.hexToRgb("ff0000");
    var green = converter.hexToRgb("00ff00");
    var blue = converter.hexToRgb("0000ff");
    expect(red).to.deep.equal([255, 0, 0]);
    expect(green).to.deep.equal([0, 255, 0]);
    expect(blue).to.deep.equal([0, 0, 255]);
  });
});
describe("clearCompletedButtons", function () {
  it('should return "Clear completed" when more than 0 items are completed', function () {
    var result = Logger.clearCompletedButtons(2);
    assert.ok(result, "Clear completed");
  });
  it("should return an empty string when 0 items are completed", function () {
    var result = Logger.clearCompletedButtons(0);
    assert.ok(result, "Clear completed");
  });
});