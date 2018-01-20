/*
 *  FileExplorer 0.1
 *  Author: Aykut Kardaş
 *  Mail: aykutkrds@gmail.com
 *  Github: https://github.com/aykutkardas
 *  Twitter: https://twitter.com/aykutkardas
 * 
 */


const fs = require('fs');

class FileExplorer {

    // initial..
    constructor() {

        this.rawDir  = [];
        this.jsonDir = [];
    
    }

    /*
     * @need: path.
     * get items in dir.
     */
    getDir(p) {

        if (!p) throw "A path is required";

        this.activePath = p;
        this.rawDir = fs.readdirSync(p, 'utf8');
        this.compileDir();

    }

    /*
     * @need: rawDir.
     * first work getDir() function.
     */
    compileDir() {

        const list = this.rawDir;
        const len  = list.length;
        const jsonDirList = [];
        let i =0;

        for(i; i < len; i++) {
            jsonDirList.push({
                name: list[i],
                isDir: this.isDir(list[i])
            });
        }

        this.jsonDir = jsonDirList;

    }

    /*
     * is dir check.
     * @return: true or false;
     */
    isDir(fileOrDir) {
        return fs.statSync(this.activePath + '/' + fileOrDir)
            .isDirectory();
    }

    /*
     * Sorting jsonDir
     * dir > file
     * A > Z
     */
    sort() {

        const list = this.jsonDir;
        
        const dirs = list.filter((n) => {
            return  n.isDir;
        });

        const files = list.filter((n) => {
            return !n.isDir;
        });

        dirs.sort(function (a, b) {
            return a.name > b.name ? 1 : -1;
        });

        files.sort(function (a, b) {
            return a.name > b.name ? 1 : -1;
        });

        this.jsonDir = dirs.concat(files);
    }

    /*
     * fix path
     * input:    "project+files+scripts+..+images+..+.."
     * |>        "project+[files[scripts+..][images+..]+..]"
     * output    "project"
     */
    fixPath(p) {

        const path = p.replace(/\+{1,3}/g, '+').split('+');

        while (path.indexOf('..') > 1)
            path.splice(path.indexOf('..') - 1, 2);

        return path.join('+');

    }

    /*
     * Navigation Bar
     * @return items with link
     */
    getNavigation(p) {

        const list = this.fixPath(p).split('+');
        const len  = list.length;
        const nav  = [];
        let link = "";
        let i = 0;

        for(i; i < len; i++) {
            link+= "+" + list[i]; 
            nav.push({
                name: list[i],
                link
            });
        }

        return nav;

    }

    /*
     * Default Task
     */
    default(dp, p) {
        this.getDir(dp);
        this.sort();
        return this.getNavigation(p);
    }


}


module.exports = new FileExplorer();