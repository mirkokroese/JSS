/**
 * Created by mirko on 11-4-17.
 */
var Time = (function () {
    function Time() {
        setInterval(function () {
            Time.calculateFPS();
        }, 1000);
    }
    Time.calculateFPS = function () {
        Time.fps = Time.fpsCounter;
        Time.fpsCounter = 0;
    };
    Time.deltaTime = 0;
    Time.fps = 0;
    Time.fpsCounter = 0;
    return Time;
}());
