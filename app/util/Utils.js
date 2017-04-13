/**
 * Created by mirko on 13-4-17.
 */
var Utils = (function () {
    function Utils() {
    }
    Utils.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Utils;
}());
