/*
 * fix path
 * input:    "project+files+scripts+..+images+..+.."
 * |>        "project+[files[scripts+..][images+..]+..]"
 * output    "project"
 */
function fixPath(dir) {

    const path = dir.replace(/\+{1,3}/g, '+').split('+');

    if (path[0] == '') path.shift();
    if (path[path.length - 1] == '') path.pop();
    
    while (path.indexOf('..') > 0)
        path.splice(path.indexOf('..') - 1, 2);

    return (path.join('+') == '' ? '/' : path.join('+'));

}

function openDir(dir) {
    dir = window.location.pathname.slice(1) + "+" + dir;
    dir = fixPath(dir);
    window.location = dir;
}

function backDir(dir) {
    dir = fixPath(dir);
    window.location = dir;
}