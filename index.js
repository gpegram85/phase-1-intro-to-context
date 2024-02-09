// Your code here

function createEmployeeRecord(array) {

    const employeeRecord = {
        firstName: undefined,
        familyName: undefined,
        title: undefined,
        payPerHour: undefined,
        timeInEvents: undefined,
        timeOutEvents: undefined
    }

    let i = 0
    Object.keys(employeeRecord).forEach(key => {
        employeeRecord[key] = array[i]
        i++
    });
    
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []

    return employeeRecord
}

// Rewrite of above

// function createEmployeeRecord(array) {
//     const [firstName, familyName, title, payPerHour] = array;
//     return {
//         firstName,
//         familyName,
//         title,
//         payPerHour,
//         timeInEvents: [],
//         timeOutEvents: []
//     };
// }

function createEmployeeRecords(array) {

    const employeeRecords = []

    array.forEach(employee => {
        employeeRecords.push(createEmployeeRecord(employee))
    });

    return employeeRecords
}

function createTimeInEvent(empRecord, date) {

    const clockIn = {
        type: "TimeIn",
        hour: parseInt(date.slice(11, 15)),
        date: date.slice(0, 10)
    }

    empRecord.timeInEvents.push(clockIn)
    return empRecord
}

function createTimeOutEvent(empRecord, date) {

    const clockOut = {
        type: "TimeOut",
        hour: parseInt(date.slice(11, 15)),
        date: date.slice(0, 10)
    }

    empRecord.timeOutEvents.push(clockOut)
    return empRecord
}

function hoursWorkedOnDate(empRecord, date) {

    const timeIn = empRecord.timeInEvents.find(event => event.date === date)
    const timeOut = empRecord.timeOutEvents.find(event => event.date === date)

    const timeOutHour = parseInt(timeOut.hour) 
    const timeInHour = parseInt(timeIn.hour)

    let hoursWorked = (timeOutHour - timeInHour) / 100

    return hoursWorked
}

function wagesEarnedOnDate(empRecord, date) {
    
    const hoursToBePaid = hoursWorkedOnDate(empRecord, date)
    const wagesEarned = hoursToBePaid * empRecord.payPerHour
    
    return wagesEarned
}

function allWagesFor(empRecord) {
    
    const datesWorked = empRecord.timeInEvents.map(event => event.date)
    let totalWages = 0

    datesWorked.forEach(date => {
        totalWages += wagesEarnedOnDate(empRecord, date)
    })
    return totalWages
}

// This function first extracts all the dates worked by the employee using the map 
// function on timeInEvents. Then, it iterates over each date, calculates the wages 
// earned on that date using the wagesEarnedOnDate function, and accumulates the 
// total wages. Finally, it returns the total wages earned by the employee for all 
// dates worked.

function calculatePayroll(array) {
    let totalWages = 0
    
    array.forEach(employee => {
        totalWages += allWagesFor(employee)
    })
    return totalWages
}