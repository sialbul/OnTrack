//SIBEL: entries.js will need to be included in the html file:
//<script src="js/entries.js"></script> 

$(document).ready(function () {
    UpdateOnScreenControls();
    $("#saveToServer").on("click", SaveToServer);
    $("#selectEntryType").on("change", UpdateOnScreenControls);
});

function UpdateOnScreenControls() {
    HideAllContainers();

    switch ($("#selectEntryType").val()) {
        case "rx":
            $("#prescriptionInputs").show();
            LoadPrescriptionsList();
            break;
        case "md":
            $("#doctorsNotesInputs").show();
            LoadDoctorsNoteList();
            break;
        case "mh":
            $("#mentalHealthNotesInputs").show();
            LoadMentalHealthNotesList();
            break;
        case "ex":
            $("#exerciseNotesInputs").show();
            LoadExerciseNotesList();
            break;
        case "fd":
            $("#foodNotesInputs").show();
            LoadFoodNotesList();
            break;
        case "bp":
            $("#bloodPressureNotesInputs").show();
            LoadBloodPressureNotesList();
            break;
        default: alert("hey now we had a weird value" + $("#selectEntryType").val()); break;
    }
};

function HideAllContainers() {
    $("#prescriptionInputs").hide();
    $("#doctorsNotesInputs").hide();
    $("#mentalHealthNotesInputs").hide();
    $("#exerciseNotesInputs").hide();
    $("#foodNotesInputs").hide();
    $("#bloodPressureNotesInputs").hide();
};

function SaveToServer() {
    switch ($("#selectEntryType").val()) {
        case "rx": SavePrescription(); break;
        case "md": SaveDoctorNote(); break;
        case "mh": SaveMentalHealthNote(); break;
        case "ex": SaveExerciseNote(); break;
        case "fd": SaveFoodNote(); break;
        case "bp": SaveBloodPressureNote(); break;
        default: alert("not sure what to save?!!?!?!" + $("#selectEntryType").val()); break;
    }
};

function SavePrescription() {
    var postArgs = {
        method: "POST",
        url: "/api/prescriptions",
        data: {
            name: $("#rxName").val(),
            dosage: $("#rxDose").val()
        }
    };

    $.ajax(postArgs)
        .then(function () { LoadPrescriptionsList(); })
        .fail(function () { alert("Something went wrong, please try adding again."); });
};


function SaveDoctorNote() {
    var postArgs = {
        method: "POST",
        url: "/api/doctors",
        data: {
            name: $("#mdName").val(),
            location: $("#mdLocation").val()
        }
    };

    $.ajax(postArgs)
        .then(function () { LoadDoctorsNoteList(); })
        .fail(function () { alert("Something went wrong, please try adding again."); });
};


function SaveMentalHealthNote() {
    var postArgs = {
        method: "POST",
        url: "/api/mhnotes",
        data: {
            date: $("#mhDate").val(),
            mood: $("#currentMood").val(),
            note: $("#mhNote").val()
        }
    };
    $.ajax(postArgs)
        .then(function () { LoadMentalHealthNotesList(); })
        .fail(function () { alert("Something went wrong, please try adding again."); });
};


function SaveExerciseNote() {
    var postArgs = {
        method: "POST",
        url: "/api/exercises",
        data: {
            date: $("#exerciseDate").val(),
            type: $("#exerciseType").val(),
            duration: $("#exerciseDuration").val()
        }
    };
    $.ajax(postArgs)
        .then(function () { LoadExerciseNotesList(); })
        .fail(function () { alert("Something went wrong, please try adding again."); });
};


function SaveFoodNote() {
    var postArgs = {
        method: "POST",
        url: "/api/foods",
        data: {
            date: $("#foodDate").val(),
            meal: $("#mealType").val(),
            name: $("#foodName").val(),
            calorie: $("#foodCal").val(),
            sugar: $("#foodSug").val(),
            sodium: $("#foodSalt").val()
        }
    };
    $.ajax(postArgs)
        .then(function () { LoadFoodNotesList(); })
        .fail(function () { alert("Something went wrong, please try adding again."); });
};


function SaveBloodPressureNote() {
    var postArgs = {
        method: "POST",
        url: "/api/bps",
        data: {
            date: $("#bpDate").val(),
            systolic: $("#bpSystolic").val(),
            diastolic: $("#bpDiastolic").val(),
            pulse: $("#bpPulse").val()
        }
    };
    $.ajax(postArgs)
        .then(function () { LoadBloodPressureNotesList(); })
        .fail(function () { alert("Something went wrong, please try adding again."); });
};

function LoadPrescriptionsList() {
    $("#displayPrescriptions").html("");

    var args = {
        method: "GET",
        url: "/api/prescriptions/all",
        data: {}
    };

    $.ajax(args).then(function (rxList) {
        if (rxList.length === 0) {
            rxList.push({ name: "No prescriptions", dosage: 0 });
        }

        for (var i = 0; i < rxList.length; i++) {
            var entry = document.createElement('li');
            entry.className = "list-group-item";
            entry.innerHTML = rxList[i].name + " - dosage: " + rxList[i].dosage;
            document.getElementById('displayPrescriptions').appendChild(entry);
        }
    })
}

function LoadDoctorsNoteList() {
    $("#displaySelectedEntries").html("");

    var args = {
        method: "GET",
        url: "/api/doctors/all",
        data: {}
    };

    $.ajax(args).then(function (list) {
        if (list.length === 0) {
            list.push({ name: "No doctor's notes", location: "" });
        }

        for (var i = 0; i < list.length; i++) {
            var entry = document.createElement('li');
            entry.className = "list-group-item";
            entry.innerHTML = list[i].name + " - location: " + list[i].location;
            document.getElementById('displaySelectedEntries').appendChild(entry);
        }
    })
}

function LoadMentalHealthNotesList() {
    $("#displaySelectedEntries").html("");

    var args = {
        method: "GET",
        url: "/api/mhnotes/all",
        data: {}
    };

    $.ajax(args).then(function (list) {
        if (list.length === 0) {

            list.push({ date: "No mental health notes", mood: "", note: "" });
        }

        for (var i = 0; i < list.length; i++) {
            var entry = document.createElement('li');
            entry.className = "list-group-item";

            entry.innerHTML = list[i].date + " - mood: " + list[i].mood + " note: " + list[i].note;
            document.getElementById('displaySelectedEntries').appendChild(entry);
        }
    })
}

function LoadExerciseNotesList() {
    $("#displaySelectedEntries").html("");

    var args = {
        method: "GET",
        url: "/api/exercises/all",
        data: {}
    };

    $.ajax(args).then(function (list) {
        if (list.length === 0) {

            list.push({ date: "No exercise notes", type: "", duration: "" });
        }

        for (var i = 0; i < list.length; i++) {
            var entry = document.createElement('li');
            entry.className = "list-group-item";

            entry.innerHTML = list[i].date + " - type: " + list[i].type + " duration: " + list[i].duration;
            document.getElementById('displaySelectedEntries').appendChild(entry);
        }
    })
}

function LoadFoodNotesList() {
    $("#displaySelectedEntries").html("");

    var args = {
        method: "GET",
        url: "/api/foods/all",
        data: {}
    };

    $.ajax(args).then(function (list) {
        if (list.length === 0) {

            list.push({ date: "No food notes", meal: "", name: "", calorie: "", sugar: "", sodium: "" });
        }

        for (var i = 0; i < list.length; i++) {
            var entry = document.createElement('li');
            entry.className = "list-group-item";

            entry.innerHTML = list[i].date + " - meal: " + list[i].meal + " name: " + list[i].name + " calorie: " + list[i].calorie + " sugar: " + list[i].sugar + " sodium: " + list[i].sodium;
            document.getElementById('displaySelectedEntries').appendChild(entry);
        }
    })
}

function LoadBloodPressureNotesList() {
    $("#displaySelectedEntries").html("");

    var args = {
        method: "GET",
        url: "/api/bps/all",
        data: {}
    };

    $.ajax(args).then(function (list) {
        if (list.length === 0) {

            list.push({ date: "No blood pressure notes", systolic: "", diastolic: "", pulse: "" });
        }

        for (var i = 0; i < list.length; i++) {
            var entry = document.createElement('li');
            entry.className = "list-group-item";

            entry.innerHTML = list[i].date + " - systolic: " + list[i].systolic + " diastolic: " + list[i].diastolic + " pulse: " + list[i].pulse;
            document.getElementById('displaySelectedEntries').appendChild(entry);
        }
    })
}

