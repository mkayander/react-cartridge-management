export function listCookies() {
    var theCookies = document.cookie.split(";");
    var listString = "";
    for (var i = 1; i <= theCookies.length; i++) {
        listString += i + " " + theCookies[i - 1] + "\n";
    }
    return listString;
}
