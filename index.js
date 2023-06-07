var player = require('play-sound')(opts = {})
const fs = require('fs')

var musicpath = './music'
var songNames = fs.readdirSync(musicpath)
var n = 0
var repeatSongs = true
var shuffle = true
var recentlyPlayed = []


function getRandNum(){
    return Math.floor(Math.random() * songNames.length);
}

function playSongs(n){
    recentlyPlayed.push(n)
    if(songNames.length < 3){
        recentlyPlayed = []
    }else{
        recentlyPlayed = recentlyPlayed.slice(-2)
    }
    var audio = player.play(`${musicpath}/${songNames[n]}`)
    console.log(`Curently Playing: ${songNames[n]}`)
    audio.addListener("close", () => {
        console.log("This song is over")

        if(shuffle == false){
            n = n + 1
        }else{
            n = getRandNum()
            if(recentlyPlayed.includes(n)){
                while((recentlyPlayed.includes(n)) == true){
                    n = getRandNum()
                    console.log("axxe")
                }
            }
        
        }

        if(n < songNames.length){
            playSongs(n)
        }else if(repeatSongs == true){
            n = 0
            playSongs(n)
        }        
        else{
            console.log("No more files and repeat is turned off.")
            return
        }
})
}

if(shuffle == true){
    n = Math.floor(Math.random() * songNames.length);
}

playSongs(n)
