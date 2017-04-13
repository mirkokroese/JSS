
/**
 * Created by mirko on 13-4-17.
 */
class MenuMouseInput {

    private static listening : boolean = false;
    private static mouseClickXY : Vector2 = new Vector2(0,0);
    private static gotRecentClick : boolean = false;

    public static isListening() : boolean {
        return this.listening;
    }

    public static startListening() : void {
        document.addEventListener("mouseup", function (e) {
            MenuMouseInput.mouseClickXY = new Vector2(e.x, e.y);
            MenuMouseInput.gotRecentClick = true;
        });
    }

    public static stopListening() : void {
        document.removeEventListener("mouseup");
    }

    public static getMouseXY() : Vector2 {
        if (MenuMouseInput.gotRecentClick) {
            MenuMouseInput.gotRecentClick = false;
            return this.mouseClickXY;
        }

        return null;
    }

}