var users = [];
function Person(first, last, num) {
    this.fname = first;
    this.lname = last;
    this.favnum = num;
} //above helps us target the entries using the this funciton
 
$(document).ready(function () {
    $("#submitbtn").click(function () {
        // console log to test out jquery selection is working and catching the data input from the form
        //  console.log($("#fname").val()); 
        //  console.log($("#lname").val()); 
        //  console.log($("#favnum").val()); 

        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var favnum = $("#favnum").val();

        var person = new Person(fname, lname, favnum);
        users.push(person);
        console.log(users); //consolde log the users; the enteries

        return false;
    });
});

$(document).ready(function () {
    $("#displaybtn").click(function () {
        $("#displace").append(JSON.stringify(users));

    }); //above code enables us to see the results of the console log as ajson string objects when the button is selected using jquery append and stringify
    // console.log(users);

    return false;
});

// const person = {
//     fname: '',
//     lname:'',
//     favnum:'',
// };

// const entries = Object.entries(person);

// console.log(entries);