/**
 * Created by khutaijashariff on 3/28/17.
 */
export function getSecret() {
    var wordList = ["HAPPY", "GRINS", "TREES",
        "STRAP", "PARTS", "TRAPS",
        "GUESS", "GUEST", "TIGER"];
    var randomNumber = Math.floor(Math.random() * wordList.length);
    return wordList[randomNumber];
    /* this.setState({secret: wordList[randomNumber]}, function () {
     console.log(this.state.secret);
     });
     */
}