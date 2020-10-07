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

export { getCardSubtitleAsCalories, 
    getMealNameAsTime };