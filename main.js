var broad;
var score = 0;
var rows =4;
var columns = 4;

// window.onclick = function() {
//     setGame();
//     if (window.onclick == 1) {
//         return;
//     } 
// }

setGame()

function setGame() {
    broad = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // broad = [
    //     [2, 2, 4, 8],
    //     [32, 16, 64, 2],
    //     [4, 4, 8, 8],
    //     [2, 2, 4, 8]
    // ]


    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let tile = document.createElement("div")
            tile.id = i.toString() + "-" + j.toString()
            let num = broad[i][j]
            updateTile(tile, num)
            document.getElementById("broad").append(tile)
        }
    }

    setTwo()
    setTwo()
}

function hasEmptyTile() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (broad[i][j] == 0) {
                return true
            }
        }
    }
    return false
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false
    while (!found) {
        let row = Math.floor(Math.random() * rows)
        let column = Math.floor(Math.random() * columns)    

        if (broad[row][column] == 0) {
            broad[row][column] = 2
            let tile = document.getElementById(row.toString() + "-" + column.toString())
            tile.innerText = "2"
            tile.classList.add("x2")
            found =  true
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile")  
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString())
        } else {
            tile.classList.add("x8192")
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft()
        setTwo()
    } else if (e.code == "ArrowRight") {
        slideRight()
        setTwo()
    } else if (e.code == "ArrowUp") {
        slideUp()
        setTwo()
    } else if (e.code == "ArrowDown"){
        slideDown()
        setTwo()
    }

    document.getElementById("score").innerText = score
})

function filterZero(row) {
    return row.filter(num => num != 0)
}

function slide(row) {
    row = filterZero(row)

    for (let i = 0; i < row.length - 1; i ++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2
            row[i + 1] = 0
            score += row[i]
        }
    }

    row = filterZero(row)

    while (row.length < columns) {
        row.push(0)
    }
    return row;
}

function slideLeft() {
    for (let i = 0; i < rows; i++) {
        let row = broad[i]
        row =  slide(row)
        broad[i] = row

        for (let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = broad[i][j]
            updateTile(tile, num)
        }
    }
}

function slideRight() {
    for (let i = 0; i < rows; i++) {
        let row = broad[i]
        row.reverse()
        row =  slide(row)
        row.reverse()
        broad[i] = row

        for (let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = broad[i][j]
            updateTile(tile, num)
        }
    }
}

function slideUp() {
    for (let j = 0; j < columns; j++) {
        let row = [broad[0][j], broad[1][j], broad[2][j], broad[3][j]]
        row = slide(row)
        // broad[0][j] = row[0]
        // broad[1][j] = row[1]
        // broad[2][j] = row[2]
        // broad[3][j] = row[3]

        for (let i = 0; i < rows; i++) {
            broad[i][j] = row[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = broad[i][j]
            updateTile(tile, num)
        }
    }
}

function slideDown() {
    for (let j = 0; j < columns; j++) {
        let row = [broad[0][j], broad[1][j], broad[2][j], broad[3][j]]
        row.reverse()
        row = slide(row)
        row.reverse()
        // broad[0][j] = row[0]
        // broad[1][j] = row[1]
        // broad[2][j] = row[2]
        // broad[3][j] = row[3]

        for (let i = 0; i < rows; i++) {
            broad[i][j] = row[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = broad[i][j]
            updateTile(tile, num)
        }
    }
}
