var clicks = 0
var wait = 300
var doubleTapRadius = 24
var lastClick = null
var distFromLastClick = 0

function isDoubleClick( event ) {

    if ( event.type === 'touchend' ) {

        if ( event.changedTouches.length !== 1 ) return false

        event.preventDefault()
        
    }

    var click = event.changedTouches && event.changedTouches[0] || event
    click.type = event.type

    if ( lastClick !== null ) {

        if ( lastClick.type !== click.type ) return false

        var horizontalDist = click.pageX - lastClick.pageX
        var verticalDist = click.pageY - lastClick.pageY
        distFromLastClick = Math.sqrt( Math.pow( horizontalDist, 2 ) + Math.pow( verticalDist, 2 ) )

    } else {

        lastClick = click
        distFromLastClick = 0

    }

    if ( distFromLastClick <= doubleTapRadius ) clicks++

    if ( clicks !== 2 ) {
        
        setTimeout(function () {
        
            clicks = 0
            lastClick = null

        }, wait)

        return false

    } else {
        
        return true

    }
}

module.exports = isDoubleClick
