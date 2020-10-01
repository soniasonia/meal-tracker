function getDateString(delta = 0){
    var myDay = new Date();
    myDay.setDate(myDay.getDate() - delta);
    var dd = String(myDay.getDate()).padStart(2, '0');
    var mm = String(myDay.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = myDay.getFullYear();    
    return myDay = yyyy + mm + dd;
}

function getDaysArray(days=7){
    var i;
    var daysArray = [];
for (i = 0; i < days; i++) {
        daysArray.push(getDateString(i))
    }
    return daysArray;
}


function getCardTitleAsDate(dateStr) {
    var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    var dd = Number(dateStr.substr(6,2));
    var mm = Number(dateStr.substr(4,2));
    var yyyy = Number(dateStr.substr(0,4));
    return dd + " " + months[mm-1] + " " + yyyy;
}

function getCardSubtitleAsCalories(meals)
{
    var total = 0;
    var i;
    for (i = 0; i < meals.length; i++) {
            total = total + meals[i].total_kcal;
        }
    return total + " kcal";
}

function getMealNameAsTime(mealDatetimeStr){
    var hour = Number(mealDatetimeStr.substr(11,2));
    var hourStr = mealDatetimeStr.substr(11,5);
    if (hour < 10) {
        return "Breakfast at " + hourStr
    }
    if (hour < 14) {
        return "Lunch at " + hourStr
    }
    if (hour < 17) {
        return "Dinner at " + hourStr
    }
    if (hour < 21) {
        return "Supper at " + hourStr
    }
    return "Night snack :( at " + hourStr
}

export { getDaysArray, 
    getCardTitleAsDate, 
    getCardSubtitleAsCalories, 
    getMealNameAsTime };