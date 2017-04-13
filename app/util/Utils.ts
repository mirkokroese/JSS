/**
 * Created by mirko on 13-4-17.
 */
class Utils {

    public static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}