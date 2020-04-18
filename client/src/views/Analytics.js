/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import '../OwnCSS/analytics.css';

import axios from 'axios';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
// import {
//
// } from "../variables/charts.js";

let chart1_2_options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ]
  }
};


let chartExample1, chartExample2, chartExample3, chartExample4;

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data3",
        chart1Data: [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
    };
  }
  returnWeeklyEmissions() {

  let totalEmissions = 0;
  let date = new Date()
  date.setHours(12)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  let start_of_week = new Date(date.getTime() - (6) * 24*60*60*1000 )
  start_of_week.setHours(0)
  start_of_week.setMinutes(0)
  start_of_week.setSeconds(0)

  let ordersArray = this.state.user.orders;

  ordersArray.map((el) => {

    let time = new Date(Date.parse(el.time));

    if ( time <= date && time >= start_of_week) {
      totalEmissions += parseFloat(el.carbon);
   }

  });

  if (totalEmissions === 0) {
    return `${totalEmissions}kg CO`;
  } else {

    if (totalEmissions > 9999) {

      let calcData;

      calcData = totalEmissions / 1000;

      calcData = calcData.toFixed(1);

      totalEmissions = `${calcData}t CO`

    } else if (totalEmissions > 10000000) {

      let calcData;

      calcData = totalEmissions / 1000;

      calcData = calcData.toFixed(1);

      totalEmissions = `${calcData}Mt CO`

    } else {
      let calcData = totalEmissions.toFixed(1);
      totalEmissions = `${calcData}kg CO`;
    }

    return totalEmissions;
  }

  }
  returnMonthlyEmissions() {

    let date = new Date();
  let cur_month = date.getMonth() + 1;
  let totalEmissions = 0;

  let ordersArray = this.state.user.orders;

  ordersArray.map((el) => {

    let time = new Date(Date.parse(el.time));
    let orderMonth = time.getMonth() + 1;

    if (orderMonth === cur_month) {
        totalEmissions += parseFloat(el.carbon);
    }

  });

  if (totalEmissions === 0) {
    return `${totalEmissions}kg CO`;
  } else {

    if (totalEmissions > 9999) {

      let calcData;

      calcData = totalEmissions / 1000;

      calcData = calcData.toFixed(1);

      totalEmissions = `${calcData}t CO`

    } else if (totalEmissions > 10000000) {

      let calcData;

      calcData = totalEmissions / 1000;

      calcData = calcData.toFixed(1);

      totalEmissions = `${calcData}Mt CO`

    } else {
      let calcData = totalEmissions.toFixed(1);
      totalEmissions = `${calcData}kg CO`;
    }

    return totalEmissions;

  }

  }
  returnYearlyEmissions() {

  let date = new Date();
  var cur_year = date.getFullYear();
  let totalEmissions = 0;

  let ordersArray = this.state.user.orders;

  ordersArray.map((el) => {

    let time = new Date(Date.parse(el.time));

    if (time.getFullYear() === cur_year) {
        totalEmissions += parseFloat(el.carbon);
    }

  });

  if (totalEmissions === 0) {
    return `${totalEmissions}kg CO`;
  } else {

    if (totalEmissions > 9999) {

      let calcData;

      calcData = totalEmissions / 1000;

      calcData = calcData.toFixed(1);

      totalEmissions = `${calcData}t CO`

    } else if (totalEmissions > 10000000) {

      let calcData;

      calcData = totalEmissions / 1000;

      calcData = calcData.toFixed(1);

      totalEmissions = `${calcData}Mt CO`

    } else {
      let calcData = totalEmissions.toFixed(1);
      totalEmissions = `${calcData}kg CO`;
    }

    return totalEmissions;

  }

  }

  componentWillMount() {

    axios.post('http://localhost:5000/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
      'jwt': localStorage.jwtToken,
    })
  .then(response => {

      chartExample1 = {
      data1: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(117, 199, 154,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(117, 199, 154,0.0)");
        gradientStroke.addColorStop(0, "rgba(117, 199, 154,0)"); //blue colors

        return {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          datasets: [
            {
              label: "Yearly (kg)",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#75c79a",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#75c79a",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#75c79a",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.returnYearlyFootprintGraph(),
            }
          ]
        };
      },
      data2: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(117, 199, 154,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(117, 199, 154,0.0)");
        gradientStroke.addColorStop(0, "rgba(117, 199, 154,0)"); //blue colors

        return {
          labels: this.returnMonthLabels(),
          datasets: [
            {
              label: "Monthly (kg)",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#75c79a",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#75c79a",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#75c79a",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.returnMonthlyFootprintData(),
            }
          ]
        };
      },
      data3: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(117, 199, 154,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(117, 199, 154,0.0)");
        gradientStroke.addColorStop(0, "rgba(117, 199, 154,0)"); //blue colors

        return {
          labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
          ],
          datasets: [
            {
              label: "Carbon Emissions",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#75c79a",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#75c79a",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#75c79a",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.returnWeeklyFootprintData(),
            }
          ]
        };
      },
      options: chart1_2_options
    };

    chartExample2 = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(137, 179, 157,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(137, 179, 157,0.0)");
        gradientStroke.addColorStop(0, "rgba(137, 179, 157,0)"); //blue colors

        return {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          datasets: [
            {
              label: "Data",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#75c79a",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#75c79a",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#75c79a",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80]
            }
          ]
        };
      },
      options: chart1_2_options
    };

      chartExample3 = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(137, 179, 157,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(137, 179, 157,0.0)");
        gradientStroke.addColorStop(0, "rgba(137, 179, 157,0)"); //blue colors

        return {
          labels: this.returnDestinationLabels(),
          datasets: [
            {
              label: "Emissions",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#75c79a",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.returnDestinationGraphData(),
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ]
        }
      }
    };

      chartExample4 = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(137, 179, 157,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(137, 179, 157,0.0)");
        gradientStroke.addColorStop(0, "rgba(137, 179, 157,0)"); //blue colors

        return {
          labels: this.returnMonthlyLabelsOffsets(),
          datasets: [
            {
              label: "Offsets",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#75c79a",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#75c79a",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#75c79a",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.returnOffsetGraphData()
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#888",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                suggestedMin: 50,
                suggestedMax: 125,
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(0,242,195,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ]
        }
      }
    };

       this.setState({ user: response.data.info[0] });

       this.setState({ userRank: response.data.info[3].usrank });

       console.log('chart example dataset', chartExample1);

  })
  .catch((error) => {
    console.log(error);
  })
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  returnYearlyFootprintGraph() {

  let newValue0 = 0, newValue1 = 0, newValue2 = 0, newValue3 = 0, newValue4 = 0, newValue5 = 0, newValue6 = 0, newValue7 = 0, newValue8 = 0, newValue9 = 0, newValue10 = 0, newValue11 = 0

  let selectArray = this.state.user.orders;

  selectArray.forEach((el) => {

    let time = new Date(Date.parse(el.time));

    let purMonth = time.getMonth();

    let cur_amt = el.carbon;

    if (purMonth === 0) {
      newValue0 += parseFloat(el.carbon);
    } else if (purMonth === 1) {
      newValue1 += parseFloat(el.carbon);
    } else if (purMonth === 2) {
      newValue2 += parseFloat(el.carbon);
    } else if (purMonth === 3) {
      newValue3 += parseFloat(el.carbon);
    } else if (purMonth === 4) {
      newValue4 += parseFloat(el.carbon);
    } else if (purMonth === 5) {
      newValue5 += parseFloat(el.carbon);
    } else if (purMonth === 6) {
      newValue6 += parseFloat(el.carbon);
    } else if (purMonth === 7) {
      newValue7 += parseFloat(el.carbon);
    } else if (purMonth === 8) {
      newValue8 += parseFloat(el.carbon);
    } else if (purMonth === 9) {
      newValue9 += parseFloat(el.carbon);
    } else if (purMonth === 10) {
      newValue10 += parseFloat(el.carbon);
    } else if (purMonth === 11) {
      newValue11 += parseFloat(el.carbon);
    }

    });

    return [newValue0.toFixed(1), newValue1.toFixed(1), newValue2.toFixed(1), newValue3.toFixed(1), newValue4.toFixed(1), newValue5.toFixed(1), newValue6.toFixed(1), newValue7.toFixed(1), newValue8.toFixed(1), newValue9.toFixed(1), newValue10.toFixed(1), newValue11.toFixed(1) ];
  }
  returnMonthlyFootprintData() {

  let date = new Date();
  let cur_month = date.getMonth() + 1;

  let tFrame0 = 0, tFrame1 = 0, tFrame2 = 0, tFrame3 = 0, tFrame4 = 0, tFrame5 = 0, tFrame6 = 0, tFrame7 = 0;

  let selectArray = this.state.user.orders;

  selectArray.map((el) => {

    let time = new Date(Date.parse(el.time));
    let orderMonth = time.getMonth() + 1;

    if (orderMonth === cur_month) {

    let day = time.getDate();
    let cur_amt = el.carbon;

    if (day <= 4) {
     tFrame0 += parseFloat(cur_amt);
   } else if (day > 4 && day <= 9) {
     tFrame1 += parseFloat(cur_amt);
   } else if (day > 9 && day <= 13) {
     tFrame2 += parseFloat(cur_amt);
   } else if (day > 13 && day <= 17) {
     tFrame3 += parseFloat(cur_amt);
   } else if (day > 17 && day <= 21) {
     tFrame4 += parseFloat(cur_amt);
   } else if (day > 21 && day <= 24) {
     tFrame5 += parseFloat(cur_amt);
   } else if (day > 24 && day <= 28) {
     tFrame6 += parseFloat(cur_amt);
   } else if (day > 28) {
     tFrame7 += parseFloat(cur_amt);
   }

 }
  });

  if (cur_month === 2) {

  return [tFrame0, tFrame1, tFrame2, tFrame3, tFrame4, tFrame5, tFrame6];

  } else {

  return [tFrame0, tFrame1, tFrame2, tFrame3, tFrame4, tFrame5, tFrame6, tFrame7];

  }

  }
  returnMonthLabels() {

    let date = new Date();
      let currentMonth = date.getMonth();
      let lastDay;

      if (currentMonth === 0) {
        lastDay = `31st`;
      } else if (currentMonth === 1) {
        lastDay = `28th`;
      } else if (currentMonth === 2) {
        lastDay = `31st`;
      } else if (currentMonth === 3) {
        lastDay = `30th`;
      } else if (currentMonth === 4) {
        lastDay = `31st`;
      } else if (currentMonth === 5) {
        lastDay = `30th`;
      } else if (currentMonth === 6) {
        lastDay = `31st`;
      } else if (currentMonth === 7) {
        lastDay = `31st`;
      } else if (currentMonth === 8) {
        lastDay = `30th`;
      } else if (currentMonth === 9) {
        lastDay = `31st`;
      } else if (currentMonth === 10) {
        lastDay = `30th`;
      } else if (currentMonth === 11) {
        lastDay = `31st`;
      }

      if (lastDay === `28th`) {

      return ['1 - 4th', '5 - 9th', '10 - 13th', '14 - 17th', '18 - 21st', '22 - 24th', '25 - 28th'];

      } else {

      return ['1 - 4th', '5 - 9th', '10 - 13th', '14 - 17th', '18 - 21st', '22 - 24th', '25 - 28th', `29 - ${lastDay}`];

      }
  }
  returnWeeklyFootprintData() {

  let dayM0 = 0;
  let dayM1 = 0;
  let dayM2 = 0;
  let dayM3 = 0;
  let dayM4 = 0;
  let dayM5 = 0;
  let dayM6 = 0;

  let date = new Date();

  let date0 = new Date(date.getTime() - (0) * 24*60*60*1000 );
  let date1 = new Date(date.getTime() - (1) * 24*60*60*1000 );
  let date2 = new Date(date.getTime() - (2) * 24*60*60*1000 );
  let date3 = new Date(date.getTime() - (3) * 24*60*60*1000 );
  let date4 = new Date(date.getTime() - (4) * 24*60*60*1000 );
  let date5 = new Date(date.getTime() - (5) * 24*60*60*1000 );
  let date6 = new Date(date.getTime() - (6) * 24*60*60*1000 );

  date0.setHours(0)
  date0.setMinutes(0)
  date0.setSeconds(0)
  date0.setMilliseconds(0)

  date1.setHours(0)
  date1.setMinutes(0)
  date1.setSeconds(0)
  date1.setMilliseconds(0)

  date2.setHours(0)
  date2.setMinutes(0)
  date2.setSeconds(0)
  date2.setMilliseconds(0)

  date3.setHours(0)
  date3.setMinutes(0)
  date3.setSeconds(0)
  date3.setMilliseconds(0)

  date4.setHours(0)
  date4.setMinutes(0)
  date4.setSeconds(0)
  date4.setMilliseconds(0)

  date5.setHours(0)
  date5.setMinutes(0)
  date5.setSeconds(0)
  date5.setMilliseconds(0)

  date6.setHours(0)
  date6.setMinutes(0)
  date6.setSeconds(0)
  date6.setMilliseconds(0)

  let selectArray = this.state.user.orders;

  selectArray.map((el) => {

    let time = new Date(Date.parse(el.time));

    let cur_amt = el.carbon;

    if ( time >= date0) {
     dayM0 += parseFloat(cur_amt);
   } else if ( time <= date0 && time >= date1) {
     dayM1 += parseFloat(cur_amt);
   } else if ( time <= date1 && time >= date2) {
     dayM2 += parseFloat(cur_amt);
   } else if ( time <= date2 && time >= date3) {
     dayM3 += parseFloat(cur_amt);
   } else if ( time <= date3 && time >= date4) {
     dayM4 += parseFloat(cur_amt);
   } else if ( time <= date4 && time >= date5) {
     dayM5 += parseFloat(cur_amt);
   } else if ( time >= date6) {
     dayM6 += parseFloat(cur_amt);
   }
  });

  return [dayM6, dayM5, dayM4, dayM3, dayM2, dayM1, dayM0];
  }
  getNumberEnding() {

    let lastNumber = +this.state.userRank.toString().split('').pop();

    if (lastNumber === 1) {
      return 'st';
    } else if (lastNumber === 1) {
      return 'nd';
    } else if (lastNumber === 1) {
      return 'rd';
    } else {
      return 'th';
    }
  }
  returnDestinationLabels() {

  let date = new Date();
  let cur_month = date.getMonth() + 1;
  let tescoAmt = 0;

  this.state.user.orders.map((el) => {

    let time = new Date(Date.parse(el.time));
    let orderMonth = time.getMonth() + 1;

    if (orderMonth === cur_month) {

    if (el.website === 'tesco') {
     tescoAmt += parseFloat(el.carbon);
   }

 }
  });

  // console.log('array', [tFrame0, tFrame1, tFrame2, tFrame3, tFrame4, tFrame5]);

  return ["Tesco", "Amazon", "Ocado", "Etsy", "Aldi"]; // [tescoAmt, 0, 0, 0, 0, 0]; // Always have ** 4 ** most even if others are 0

  }
  returnDestinationGraphData() {

    let date = new Date();
    let cur_year = date.getFullYear();
    let tescoCO2 = 0;

    this.state.user.orders.map((el) => {

    let time = new Date(Date.parse(el.time));

    if (time.getFullYear() === cur_year) {
        tescoCO2 += parseFloat(el.carbon);
    }

  });

  if (tescoCO2 === 0) {
    return [{x:'', y: tescoCO2 }, {x:'', y:0}, {x:'', y:0}, {x:'', y:0}];
  } else {
    return [{x:'', y: tescoCO2.toFixed(1) }, {x:'', y:0}, {x:'', y:0}, {x:'', y:0}];
  }

  }
  returnMonthlyLabelsOffsets() {

    var d = new Date(), d0 = new Date(), d1 = new Date(), d2 = new Date(), d3= new Date(), d4 = new Date(), d5 = new Date();

  d0.setMonth(d0.getMonth() - 5);
  d1.setMonth(d1.getMonth() - 4);
  d2.setMonth(d2.getMonth() - 3);
  d3.setMonth(d3.getMonth() - 2);
  d4.setMonth(d4.getMonth() - 1);
  d5.setMonth(d5.getMonth());

  let monthArray = [d0.getMonth(), d1.getMonth(), d2.getMonth(), d3.getMonth(), d4.getMonth(), d5.getMonth()];

  monthArray = monthArray.map((month) => {

    if (month === 0) {
      return 'Jan';
    } else if (month === 1) {
      return 'Feb';
    } else if (month === 2) {
      return 'Mar';
    } else if (month === 3) {
      return 'Apr';
    } else if (month === 4) {
      return 'May';
    } else if (month === 5) {
      return 'Jun';
    } else if (month === 6) {
      return 'Jul';
    } else if (month === 7) {
      return 'Aug';
    } else if (month === 8) {
      return 'Sep';
    } else if (month === 9) {
      return 'Oct';
    } else if (month === 10) {
      return 'Nov';
    } else if (month === 11) {
      return 'Dec';
    }

  });

  d0 = monthArray[0];

  return [monthArray[0], monthArray[1], monthArray[2], monthArray[3], monthArray[4], monthArray[5] ];

  }
  returnOffsetGraphData() {

    let newValue0 = 0, newValue1 = 0, newValue2 = 0, newValue3 = 0, newValue4 = 0, newValue5 = 0;

    let selectArray = this.state.user.offsets;

    selectArray.forEach((el) => {

    let time = new Date(Date.parse(el.time));

    let monthsSince = this.getMonthFrom(time);

    let cur_amt = el.carbon;

    if (monthsSince === 0) {
      newValue0 += parseFloat(cur_amt);
    } else if (monthsSince === 1) {
      newValue1 += parseFloat(cur_amt);
    } else if (monthsSince === 2) {
      newValue2 += parseFloat(cur_amt);
    } else if (monthsSince === 3) {
      newValue3 += parseFloat(cur_amt);
    } else if (monthsSince === 4) {
      newValue4 += parseFloat(cur_amt);
    } else if (monthsSince === 5) {
      newValue5 += parseFloat(cur_amt);
    }

    });
        var d = new Date(), d0 = new Date(), d1 = new Date(), d2 = new Date(), d3= new Date(), d4 = new Date(), d5 = new Date();

        d0.setMonth(d0.getMonth() - 5);
        d1.setMonth(d1.getMonth() - 4);
        d2.setMonth(d2.getMonth() - 3);
        d3.setMonth(d3.getMonth() - 2);
        d4.setMonth(d4.getMonth() - 1);
        d5.setMonth(d5.getMonth());

        let monthArray = [d0.getMonth(), d1.getMonth(), d2.getMonth(), d3.getMonth(), d4.getMonth(), d5.getMonth()];

        monthArray = monthArray.map((month) => {

          if (month === 0) {
            return 'January';
          } else if (month === 1) {
            return 'February';
          } else if (month === 2) {
            return 'March';
          } else if (month === 3) {
            return 'April';
          } else if (month === 4) {
            return 'May';
          } else if (month === 5) {
            return 'June';
          } else if (month === 6) {
            return 'July';
          } else if (month === 7) {
            return 'August';
          } else if (month === 8) {
            return 'September';
          } else if (month === 9) {
            return 'October';
          } else if (month === 10) {
            return 'November';
          } else if (month === 11) {
            return 'December';
          }

        });

        d0 = monthArray[0];

    return [newValue5.toFixed(1), newValue4.toFixed(1), newValue3.toFixed(1), newValue2.toFixed(1), newValue1.toFixed(1), newValue0.toFixed(1) ];

  }
  returnOrderImage(website) {
    if (website === 'tesco') {
      return "../assets/img/companyLogos/tesco.png";
    }
  }
  returnUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
  }
  roundNumber(num) {
    return Math.round(num * 10) / 10;
  }
  render() {
    return (
      <>
        <div className="content">
        {this.state.user && this.state.userRank ? <div>
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Carbon Footprint</h5>
                      <CardTitle tag="h2">{this.state.bigChartData === "data1" ? this.returnYearlyEmissions() : this.state.bigChartData === "data2" ? this.returnMonthlyEmissions() : this.state.bigChartData === "data3" ? this.returnWeeklyEmissions() : ''}<span style={{ fontSize: '0.47em', top: '3px', position: 'relative' }}>2</span> / {this.state.bigChartData === "data1" ? 'Year' : this.state.bigChartData === "data2" ? 'Month' : this.state.bigChartData === "data3" ? 'Week' : ''}</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={this.state.bigChartData === "data3" ? "btn-simple analytics__selectedButton" : "btn-simple analytics__notSelectedButton"}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Week
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={this.state.bigChartData === "data2" ? "btn-simple analytics__selectedButton" : "btn-simple analytics__notSelectedButton" }
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Month
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={this.state.bigChartData === "data1" ? "btn-simple analytics__selectedButton" : "btn-simple analytics__notSelectedButton" }
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Year
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line id="analytics__firstChart"
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Ranking</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-chart-bar-32 text-info" id="analytics__destinationIconColour" />{" "}
                    {this.state.userRank}{this.getNumberEnding()}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area" >
                  {/*  <Line id="analytics__middleCharts"
                      data={chartExample2.data}
                      options={chartExample2.options}
                    /> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">By Destinations</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bag-16 text-primary" id="analytics__destinationIconColour" />{" "}
                    6 Destinations
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area" id="analytics__middleCharts">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Offsets</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-world text-success" id="analytics__destinationIconColour" /> {40}kg CO<span style={{ fontSize: '0.47em', top: '3px', position: 'relative' }}>2</span>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area" id="analytics__middleCharts">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>

            <Col lg="6" md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <h6 id="analytics__recentOrdersTitle" className="title d-inline">📦 Recent Orders</h6>
                  <p className="card-category d-inline"></p>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      caret
                      className="btn-icon"
                      color="link"
                      data-toggle="dropdown"
                      type="button"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <div className="analytics__dropDownSortBy">Sort By:</div>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Date (Newest)
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Date (Oldest)
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Amount CO2e
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        {this.state.user.orders.map((or) => {

                          return (<tr>
                            <td id="analytics__recentOrdersImageWidth">
                              <img src={require("../assets/img/companyLogos/tesco.png")} id="analytics__ordersImage" />
                            </td>
                            <td id="analytics__recentOrdersTextSize">
                              <p className="title">{this.returnUpperCase(or.website)}</p>
                              <p className="text-muted">
                                {or.name}
                              </p>
                            </td>
                            <td className="td-actions text-right">
                              <Button
                                color="link"
                                id="tooltip636901683"
                                title=""
                                type="button"
                              >
                                <p id="analytics__mainTextSideOrders">{this.roundNumber(or.carbon)}kg CO<span id="analytics__ordersSmall2">2</span></p>
                              </Button>
                            </td>
                          </tr>);

                        })}


                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>


            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <h6 id="analytics__recentOrdersTitleOffset" className="title d-inline">🌱 Offsets</h6>
                </CardHeader>
                <div className="analytics__offsetsSpacing"></div>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                    <tbody>
                    <tr>
                    <td>

                    <div className="analytics__offsetComingSoonMessage">
                    <p className="title analytics__comingSoonTitle">Coming Soon! 😃</p>
                    <p className="text-muted">
                      Soon you will be able to subscribe to our wonderful new service where you'll be able to offset all your online purchases for as little as $2 per month!
                    </p>
                    </div>

                    </td>
                    </tr>

                    </tbody>
                    </Table>
                          </div>
                        </CardBody>

              </Card>
            </Col>
          </Row></div> : undefined }
        </div>
      </>
    );
  }
}

export default Analytics;
