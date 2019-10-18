console.log('Client side java script file loaded')
var array = [["A1", "B1", "C1"],
        ["A2", "B2", "C2"],
        ["A3", "B3", "C3"],
        ["A4", "B4", "C4"],
        ["A5", "B5", "C5"],
        ["A1", "B1", "C1"],
        ["A2", "B2", "C2"],
        ["A3", "B3", "C3"],
        ["A4", "B4", "C4"],
        ["A5", "B5", "C5"]],

        table = document.getElementById('usertable')
        for (let i = 0; i < array.length; i++) {
            //create new row
            let newRow = table.insertRow(table.length)
            for (let j = 0; j < array[i].length; j++) {
                //create a cell
                let cell = newRow.insertCell(j)
                //add value to cell
                cell.innerHTML = array[i][j]
            }
        }