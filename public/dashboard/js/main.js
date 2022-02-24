$(document).ready(function() {
    $("#slide-to").click(function() {
        $(".side-bar").toggleClass("side-toggle");
        $(".main-body").toggleClass("main-body-ww");

    })
    $(".drop").click(function() {
        $(this).next(".open-drop").slideToggle();
        $(this).find(".flo-right>.fas").toggleClass("icon-rotate");
    })
    $("#or-type li").click(function() {
        let gev = $(this).html();
        $("#inner-filter").html(gev);
    })
    $("#click-1").click(function() {
        $(".ddd-1").slideToggle();
    })
    $(".ddd-1 li").click(function() {
        $(".ddd-1").slideToggle();
    })

    $("#year-ss li").click(function() {
        let gev = $(this).html();
        $("#inner-filter-2").html(gev);
    })
    $("#click-2").click(function() {
        $(".ddd-2").slideToggle();
    })
    $(".ddd-2 li").click(function() {
        $(".ddd-2").slideToggle();
    })
    $(".nav-item-1").click(function() {
        $(this).find(".nav-drop").toggleClass("nav-rop-add");
        // $(".nav-drop").toggleClass("nav-rop-add");
    })
})





var eventFired = 0;

if ($(window).width() < 768) {
    $(".side-bar").toggleClass("side-toggle");
    $(".main-body").toggleClass("main-body-ww");

} else {

    eventFired = 1;
}
// bar chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            type: 'bar',
            label: 'Bar Dataset',
            data: [9000, 20000, 30000, 40000, 50000, 58000],
            backgroundColor: [
                '#b07ff4'
            ],
        }, {
            type: 'bar',
            label: 'Line Dataset',
            data: [15000, 25000, 35000, 45000, 55000, 60000],
            backgroundColor: [
                '#6200ea'
            ],
        }],
        labels: ['January', 'February', 'March', 'April', "May", "June"]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// pi chart
var xValues = ["Alpha", "Beta", "Gamma", "Delta"];
var yValues = [55, 40, 34, 24];
var barColors = [
    "#6200ea",
    "#26a69a",
    "#9c27b0",
    "#ffb300"
];

new Chart("myChart2", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        title: {
            display: true,
            text: "World Wide Wine Production 2018"
        }
    }
});