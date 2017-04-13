/**
 * Created by mirko on 11-4-17.
 */
class Time {

    public static deltaTime : number = 0;
    public static fps : number = 0;
    public static fpsCounter : number = 0;

    constructor() {
        setInterval(function () {
            Time.calculateFPS()
        }, 1000);
    }

    public static calculateFPS() {
        Time.fps = Time.fpsCounter;
        Time.fpsCounter = 0;
    }
}