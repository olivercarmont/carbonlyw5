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

import { Icon, InlineIcon } from '@iconify/react';
import arrowGrowth from '@iconify/icons-uil/arrow-growth';
import planeDeparture from '@iconify/icons-fa-solid/plane-departure';
import shippingFast from '@iconify/icons-fa-solid/shipping-fast';
import utensilsIcon from '@iconify/icons-fa-solid/utensils';
import movieOpen from '@iconify/icons-mdi/movie-open';
import boxesIcon from '@iconify/icons-fa-solid/boxes';

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
    backgroundColor: "rgba(160, 209, 186, 0.88)",
    borderColor: '#fff',
    titleFontColor: "#fff",
    bodyFontColor: "#fff",
    bodySpacing: 8,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    displayColors: false,
    callbacks: {
    label: function(tooltipItem, data) {
          return data['datasets'][0]['data'][tooltipItem['index']] + 'kg CO2';
        }
      },

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
          display:false
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
        ordersSort: 'recent'
    };
  }
  returnWeeklyEmissions() {

  let totalEmissions = 0;
  let date = new Date()

  let start_of_week = new Date(date.getTime() - (6) * 24*60*60*1000 )
  start_of_week.setHours(0)
  start_of_week.setMinutes(0)
  start_of_week.setSeconds(0)

  console.log('START', start_of_week);

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

    if (totalEmissions > 999) {

      let calcData;

      calcData = totalEmissions / 1000;

      calcData = calcData.toFixed(1);

      totalEmissions = `${calcData}t CO`

    } else if (totalEmissions >= 10000000) {

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

    if (totalEmissions > 999) {

      let calcData;

      calcData = totalEmissions / 1000;

      calcData = calcData.toFixed(1);

      totalEmissions = `${calcData}t CO`

    } else if (totalEmissions >= 10000000) {

      let calcData;

      calcData = totalEmissions / 10000000;

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

    if (totalEmissions > 999) {

      let calcData;

      calcData = totalEmissions / 1000;

      calcData = calcData.toFixed(1);

      totalEmissions = `${calcData}t CO`

    } else if (totalEmissions >= 10000000) {

      let calcData;

      calcData = totalEmissions / 10000000;

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

    axios.post('http://carbonly.org/users/return-leaderboard', { jwt: localStorage.jwtToken }, {
      'jwt': localStorage.jwtToken,
    })
  .then(response => {

      this.setState({ allUsers: response.data.info[4] });

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
              label: "",
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
              label: "",
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
          labels: this.rankGraphDataLabels(),
          datasets: [
            {
              label: "Offsets",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#75c79a",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.rankingGraphData(),
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
          backgroundColor: "rgba(160, 209, 186, 0.88)",
          titleFontColor: "#fff",
          bodyFontColor: "#fff",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          displayColors: false,
          callbacks: {
          label: function(tooltipItem, data) {
                return `${data['datasets'][0]['data'][tooltipItem['index']]} points`;
              }
            },

        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                suggestedMin: 0,
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display:false
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

    // OLD GRIDLINES
    // drawBorder: false,
    // color: "rgba(225,78,202,0.1)",
    // zeroLineColor: "transparent"

      chartExample3 = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        let gradientStrokeRed = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(137, 179, 157,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(137, 179, 157,0.0)");
        gradientStroke.addColorStop(0, "rgba(137, 179, 157,0)"); //blue colors

        gradientStrokeRed.addColorStop(1, "rgba(196, 143, 143,0.2)");
        gradientStrokeRed.addColorStop(0.4, "rgba(196, 143, 143,0)");
        gradientStrokeRed.addColorStop(0, "rgba(196, 143, 143,0)"); //blue colors

        return {
          labels:  this.returnMonthLabels(),
          datasets: [
            {
              label: "Emissions",
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
              data: this.returnBudgetGraphData(),
            },
            {
              label: "Budget",
              fill: true,
              backgroundColor: gradientStrokeRed,
              borderColor: "#e07073",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#e07073",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#e07073",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.returnBudgetGraph(),
            },
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgba(160, 209, 186, 0.88)",
          titleFontColor: "#fff",
          bodyFontColor: "#fff",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          displayColors: false,
          callbacks: {
          label: function(tooltipItem, data) {
            console.log('DATA', data['datasets'][0]['data'][tooltipItem['index']] );
                return tooltipItem.yLabel + 'kg CO2';
              }
            },
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {

                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display:false
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

    // OLD GRIDLINES
    // drawBorder: false,
    // color: "rgba(225,78,202,0.1)",
    // zeroLineColor: "transparent"

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
          backgroundColor: "rgba(160, 209, 186, 0.88)",
          titleFontColor: "#fff",
          bodyFontColor: "#fff",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          displayColors: false,
          callbacks: {
          label: function(tooltipItem, data) {
                return data['datasets'][0]['data'][tooltipItem['index']] + 'kg CO2';
              }
            },
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                display:false
              },
              ticks: {
                suggestedMin: 0,
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                display:false
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

    // OLD GRIDLINES
    // drawBorder: false,
    // color: "rgba(29,140,248,0.0)",
    // zeroLineColor: "transparent"

       this.setState({ user: response.data.info[0] });

       let ordersRe = response.data.info[0].orders;

       ordersRe.sort((a, b) => (Date.parse(a.time) < Date.parse(b.time)) ? 1 : -1)

       this.setState({ ordersRecent: ordersRe });

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
        lastDay = `31`;
      } else if (currentMonth === 1) {
        lastDay = `28`;
      } else if (currentMonth === 2) {
        lastDay = `31`;
      } else if (currentMonth === 3) {
        lastDay = `30`;
      } else if (currentMonth === 4) {
        lastDay = `31`;
      } else if (currentMonth === 5) {
        lastDay = `30`;
      } else if (currentMonth === 6) {
        lastDay = `31`;
      } else if (currentMonth === 7) {
        lastDay = `31`;
      } else if (currentMonth === 8) {
        lastDay = `30`;
      } else if (currentMonth === 9) {
        lastDay = `31`;
      } else if (currentMonth === 10) {
        lastDay = `30`;
      } else if (currentMonth === 11) {
        lastDay = `31`;
      }

      if (lastDay === `28th`) {

      return ['1 - 4', '5 - 9', '10 - 13', '14 - 17', '18 - 21', '22 - 24', '25 - 28'];

      } else {

      return ['1 - 4', '5 - 9', '10 - 13', '14 - 17', '18 - 21', '22 - 24', '25 - 28', `29 - ${lastDay}`];

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

  return [dayM6.toFixed(1), dayM5.toFixed(1), dayM4.toFixed(1), dayM3.toFixed(1), dayM2.toFixed(1), dayM1.toFixed(1), dayM0.toFixed(1)];
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
  returnDestinationDataArray() {
    let date = new Date();
    let cur_year = date.getFullYear();
    let desEm = [{ "name": "Tesco", "amount": 0 }, { "name": "Amazon", "amount": 0,  }, { "name": "Skyscanner", "amount": 0  }, { "name": "Uber Eats", "amount": 0  }, { "name": "Momondo", "amount": 0  }, { "name": "Booking.com", "amount": 0  }, { "name": "Expedia", "amount": 0  }, { "name": "Kayak", "amount": 0  }, { "name": "Google Flights", "amount": 0  }, { "name": "KLM", "amount": 0  }, { "name": "Trip Advisor", "amount": 0  }, { "name": "Foodie", "amount": 0  }, { "name": "K Ruoka", "amount": 0  }, { "name": "Kauppahalli24", "amount": 0  }];

    this.state.user.orders.map((el) => {

    let time = new Date(Date.parse(el.time));

    let website = el.website.toLowerCase();

    if (time.getFullYear() === cur_year) {

      if (website === 'tesco' || website === 'Tesco') {

        desEm[0]['amount'] = desEm[0]['amount'] + parseFloat(el.carbon);

      } else if (website === 'amazon') {

        desEm[1]['amount'] = desEm[1]['amount'] + parseFloat(el.carbon);

      } else if (website === 'skyscanner') {

        desEm[2]['amount'] = desEm[2]['amount'] + parseFloat(el.carbon);

      } else if (website === 'uber eats') {

        desEm[3]['amount'] = desEm[3]['amount'] + parseFloat(el.carbon);

      } else if (website === 'momondo') {

        desEm[4]['amount'] = desEm[4]['amount'] + parseFloat(el.carbon);

      } else if (website === 'booking.com') {

        desEm[5]['amount'] = desEm[5]['amount'] + parseFloat(el.carbon);

      } else if (website === 'expedia') {

        desEm[6]['amount'] = desEm[6]['amount'] + parseFloat(el.carbon);

      } else if (website === 'kayak') {

        desEm[7]['amount'] = desEm[7]['amount'] + parseFloat(el.carbon);

      } else if (website === 'google flights') {

        desEm[8]['amount'] = desEm[8]['amount'] + parseFloat(el.carbon);

      } else if (website === 'klm') {

        desEm[9]['amount'] = desEm[9]['amount'] + parseFloat(el.carbon);

      } else if (website === 'trip advisor') {

        desEm[10]['amount'] = desEm[10]['amount'] + parseFloat(el.carbon);

      } else if (website === 'foodie') {

        desEm[11]['amount'] = desEm[11]['amount'] + parseFloat(el.carbon);

      } else if (website === 'k ruoka') {

        desEm[12]['amount'] = desEm[12]['amount'] + parseFloat(el.carbon);

      } else if (website === 'kauppahalli24') {

        desEm[13]['amount'] = desEm[13]['amount'] + parseFloat(el.carbon);

      }
    }

  });

  desEm.sort((a, b) => (a.amount < b.amount) ? 1 : -1)

  console.log('desEm', desEm);

  return desEm;
  }
  returnDestinationLabels() {

  let array = this.returnDestinationDataArray();

  // console.log('array', [tFrame0, tFrame1, tFrame2, tFrame3, tFrame4, tFrame5]);

  return [array[0].name, array[1].name, array[2].name, array[3].name, "Aldi"]; // [tescoAmt, 0, 0, 0, 0, 0]; // Always have ** 4 ** most even if others are 0

  }
  returnBudgetGraphData() {

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

    tFrame1 += tFrame0;

    tFrame2 += tFrame1 + tFrame0;

    tFrame3 += tFrame2 + tFrame1 + tFrame0;

    tFrame4 += tFrame3 + tFrame2 + tFrame1 + tFrame0;

    tFrame5 += tFrame4 + tFrame3 + tFrame2 + tFrame1 + tFrame0;

    tFrame5 += tFrame5 + tFrame4 + tFrame3 + tFrame2 + tFrame1 + tFrame0;

    if (cur_month === 2) {

    return [tFrame0, tFrame1, tFrame2, tFrame3, tFrame4, tFrame5, tFrame6];

    } else {

    return [ tFrame0, tFrame1, tFrame2, tFrame3, tFrame4, tFrame5, tFrame6, tFrame7 ];

    }

  }
  returnBudgetGraph() {

    let date = new Date();
    let cur_month = date.getMonth() + 1;
    if (cur_month === 2) {

    return [ 100, 100, 100, 100, 100, 100, 100];

    } else {

    return [ 100, 100, 100, 100, 100, 100, 100, 100 ];

    }

  }
  returnDestinationGraphData() {

    let array = this.returnDestinationDataArray();

    return [{x:'', y: array[1].amount.toFixed(1) }, {x:'', y: array[1].amount.toFixed(1) }, {x:'', y: array[2].amount.toFixed(1) }, {x:'', y: array[3].amount.toFixed(1) }];

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
  getMonthFrom(date) {
    let newDate = new Date();

   return newDate.getMonth() - date.getMonth() +
     (12 * (newDate.getFullYear() - date.getFullYear()))
  }
  returnOffsetGraphData() {

    let newValue0 = 0, newValue1 = 0, newValue2 = 0, newValue3 = 0, newValue4 = 0, newValue5 = 0;

    let selectArray = this.state.user.offsets;

    let cur_time = new Date();

    selectArray.forEach((el) => {

    let time = new Date(Date.parse(el.time));

    console.log('TIME', time);

    let monthsSince = this.getMonthFrom(time);

    let cur_amt = el.amount;

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


    return [newValue5.toFixed(1), newValue4.toFixed(1), newValue3.toFixed(1), newValue2.toFixed(1), newValue1.toFixed(1), newValue0.toFixed(1) ];

  }
  returnUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
  }
  roundNumber(num) {
    return Math.round(num * 10) / 10;
  }
  rankingGraphData() {

    let userPoints = 0;

    this.state.user.offsets.map((off) => {
      userPoints += parseFloat(off.points);
    })

    this.state.user.orders.map((or) => {
      userPoints += parseFloat(or.points);
    })

    let usValues = [];

    console.log('AU', this.state.allUsers);

    if (this.state.userRank === 1) {

    usValues = [this.state.allUsers[0].points, this.state.allUsers[1].points, this.state.allUsers[2].points, this.state.allUsers[3].points, this.state.allUsers[4].points];

    } else if (this.state.userRank === 2) {

    usValues = [this.state.allUsers[0].points, this.state.allUsers[1].points, this.state.allUsers[2].points, this.state.allUsers[3].points, this.state.allUsers[4].points]

  } else if (this.state.userRank === this.state.allUsers.length) {

    usValues = [this.state.allUsers[this.state.userRank-5].points, this.state.allUsers[this.state.userRank-4].points, this.state.allUsers[this.state.userRank-3].points, this.state.allUsers[this.state.userRank-2].points, userPoints]

    } else if (this.state.userRank === (this.state.allUsers.length - 1))

    usValues = [this.state.allUsers[this.state.userRank-5].points, this.state.allUsers[this.state.userRank-4].points, this.state.allUsers[this.state.userRank-3].points, userPoints, this.state.allUsers[this.state.userRank].points, ]

    else {

    let userM1, userM2, userP1, userP2;

    this.state.allUsers.map((us) => {

      if (us.rank === (this.state.userRank - 2)) {
        userM2 = us.points;
      } else if (us.rank === (this.state.userRank - 1)) {
        userM1 = us.points;
      } else if (us.rank === (this.state.userRank + 1)) {
        userP1 = us.points;
      } else if (us.rank === (this.state.userRank + 2)) {
        userP2 = us.points;
      }

      });

      usValues = [userM2, userM1, userPoints, userP1, userP2];

      }

      return usValues;

  }
  rankGraphDataLabels() {

  let usNames = [];

  if (this.state.userRank === 1) {

  usNames = ['You', `@` + this.state.allUsers[1].username, `@` + this.state.allUsers[2].username, `@` + this.state.allUsers[3].username, `@` + this.state.allUsers[4].username];

  } else if (this.state.userRank === 2) {

  usNames = [`@` + this.state.allUsers[0].username, 'You', `@` + this.state.allUsers[2].username, `@` + this.state.allUsers[3].username, `@` + this.state.allUsers[4].username]

} else if (this.state.userRank === this.state.allUsers.length) {

  usNames = [`@` + this.state.allUsers[this.state.userRank-5].username, `@` + this.state.allUsers[this.state.userRank-4].username, `@` + this.state.allUsers[this.state.userRank-3].username, `@` + this.state.allUsers[this.state.userRank-2].username, 'You']

  } else if (this.state.userRank === (this.state.allUsers.length - 1))

  usNames = [`@` + this.state.allUsers[this.state.userRank-5].username, `@` + this.state.allUsers[this.state.userRank-4].username, `@` + this.state.allUsers[this.state.userRank-3].username, 'You', `@` + this.state.allUsers[this.state.userRank].username, ]

  else {

  let userM1, userM2, userP1, userP2;

  this.state.allUsers.map((us) => {

    if (us.rank === (this.state.userRank - 2)) {
      userM2 = `@` + us.username;
    } else if (us.rank === (this.state.userRank - 1)) {
      userM1 = `@` + us.username;
    } else if (us.rank === (this.state.userRank + 1)) {
      userP1 = `@` + us.username;
    } else if (us.rank === (this.state.userRank + 2)) {
      userP2 = `@` + us.username;
    }

    });

    usNames = [userM1, userM2, 'You', userP1, userP2];

    }

    return usNames;
  }
  returnNumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  returnOffsets(amount) {

  let calcData;

    if (amount === 0) {

      return `${amount}kg`;

    } else if (amount > 999) {

      calcData = amount / 1000;

      calcData = Math.round(calcData);

      return `${calcData}t CO`

    } else if (amount >= 10000000) {

      calcData = amount / 10000000;

      calcData = Math.round(calcData);

      return `${calcData}Mt`

    } else {
      let calcData = Math.round(amount);
      return `${calcData}kg`;
    }
  }
  returnTotalOffsets() {

    let points = 0;

    this.state.user.offsets.map((off) => {
      points += parseFloat(off.amount);
    })

    console.log('points', points)

    return ` ${this.returnOffsets(points)} CO`;

  }
  returnOrdersEm(amt) {

  let calcData;

  if (amt === 0) {

    return `${amt}kg CO`;

  } else if (amt > 999) {

    calcData = amt / 1000;

    calcData = Math.round(calcData);

    return `${calcData}t CO`

  } else if (amt >= 10000000) {

    calcData = amt / 10000000;

    calcData = Math.round(calcData);

    return `${calcData}Mt CO`

  } else {

    if (amt > 99) {

      calcData = Math.round(amt);

    } else {
      calcData = parseFloat(amt).toFixed(1);
    }

    return `${calcData}kg CO`;
    }
  }
  getUserDestinations() {
    let des = 0;

    let destinations = { "tesco":false, "amazon": false, "skyscanner": false, "ubereats": false, "momondo": false, "booking.com": false, "expedia": false, "tripadvisor": false, "klm": false, "kayak": false, "googleflights": false, "kauppahalli24": false, "kruoka": false, "foodie": false };

    this.state.user.orders.map((or) => {

      console.log('web', or.website);

      let website = or.website.toLowerCase();



    if (website === 'tesco' && !destinations["tesco"]) {
      des++;
      destinations["tesco"] = true;
    } else if (website === 'amazon' && !destinations["amazon"]) {
      des++;
      destinations["amazon"] = true;
    } else if (website === 'skyscanner' && !destinations["skyscanner"]) {
      des++;
      destinations["skyscanner"] = true;
    } else if (website === 'uber eats' && !destinations["ubereats"]) {
      des++;
      destinations["ubereats"] = true;
    } else if (website === 'momondo' && !destinations["momondo"]) {
      des++;
      destinations["momondo"] = true;
    } else if (website === 'booking.com' && !destinations["booking.com"]) {
      des++;
      destinations["booking.com"] = true;
    } else if (website === 'expedia' && !destinations["expedia"]) {
      des++;
      destinations["expedia"] = true;
    } else if (website === 'trip advisor' && !destinations["tripadvisor"]) {
      des++;
      destinations["tripadvisor"] = true;
    } else if (website === 'klm' && !destinations["klm"]) {
      des++;
      destinations["klm"] = true;
    } else if (website === 'kayak' && !destinations["kayak"]) {
      des++;
      destinations["kayak"] = true;
    } else if (website === 'google flights' && !destinations["googleflights"]) {
      des++;
      destinations["googleflights"] = true;
    } else if (website === 'kauppahalli24' && !destinations["kauppahalli24"]) {
      des++;
      destinations["kauppahalli24"] = true;
    } else if (website === 'k ruoka' && !destinations["kruoka"]) {
      des++;
      destinations["kruoka"] = true;
    } else if (website === 'foodie' && !destinations["foodie"]) {
      des++;
      destinations["foodie"] = true;
    }
  });
  console.log('DES', des)
  return des;
  }
  returnOrderCategories() {

    let travel = ['skyscanner', 'momondo', 'booking.com', 'expedia', 'tripadvisor', 'klm', 'kayak', 'googleflights']

    let hasInsWeb = [];

    let categories = [{name: 'Travel',  websites: '', percentage: 0, amount: 0}, {name: 'Ecommerce',  websites: '', percentage: 0, amount: 0}, {name: 'Food',  websites: '', percentage: 0, amount: 0}, {name: 'Entertainment',  websites: '', percentage: 0, amount: 0}, {name: 'Miscellaneous',  websites: '', percentage: 0, amount: 0}];

    let totalFootprint = 0;

    this.state.user.orders.map((or) => {

      if (or.website.toLowerCase() === 'tesco' || or.website.toLowerCase() === 'uber eats' || or.website.toLowerCase() === 'kauppahalli24' || or.website.toLowerCase() === 'foodie' || or.website.toLowerCase() === 'k ruoka') {

        categories[2].amount += parseFloat(or.carbon);

        if (categories[2].websites.length < 30) {
          let hasIns = false;

          hasInsWeb.map((web) => {
            if (web === or.website) {
              hasIns = true;
            }
          })
          if (!hasIns) {
            categories[2].websites += `${or.website.charAt(0).toUpperCase() + or.website.slice(1)}, `
            hasInsWeb.push(or.website)
          }
        }

      } else if (or.website.toLowerCase() === 'amazon') {

        categories[1].amount += parseFloat(or.carbon);

        if (categories[1].websites.length < 30) {
          let hasIns = false;

          hasInsWeb.map((web) => {
            if (web === or.website) {
              hasIns = true;
            }
          })
          if (!hasIns) {
            categories[1].websites += `${or.website.charAt(0).toUpperCase() + or.website.slice(1)}, `
            hasInsWeb.push(or.website)
          }
        }

      } else {
        for (const web of travel) {

          if (web === or.website.toLowerCase()) {

            categories[0].amount += parseFloat(or.carbon);

            if (categories[0].websites.length < 30) {
              let hasIns = false;

              hasInsWeb.map((web) => {
                if (web === or.website) {
                  hasIns = true;
                }
              })
              if (!hasIns) {
                categories[0].websites += `${or.website.charAt(0).toUpperCase() + or.website.slice(1)}, `
                hasInsWeb.push(or.website)
              }
            }

          }

      }
      }

    totalFootprint += parseFloat(or.carbon);
    })

    console.log('TOT', totalFootprint)

    console.log('categoriesCHECK', categories[1].amount / totalFootprint)

    categories[0].percentage = Math.round((categories[0].amount / totalFootprint) * 100);
    categories[1].percentage = Math.round((categories[1].amount / totalFootprint) * 100);
    categories[2].percentage = Math.round((categories[2].amount / totalFootprint) * 100);
    categories[3].percentage = Math.round((categories[3].amount / totalFootprint) * 100);
    categories[4].percentage = Math.round((categories[4].amount / totalFootprint) * 100);

    categories[0].amount = parseFloat(categories[0].amount).toFixed(1);
    categories[1].amount = parseFloat(categories[1].amount).toFixed(1);
    categories[2].amount = parseFloat(categories[2].amount).toFixed(1);
    categories[3].amount = parseFloat(categories[3].amount).toFixed(1);
    categories[4].amount = parseFloat(categories[4].amount).toFixed(1);

    let misCat = categories[4];

    categories.sort((a, b) => (parseFloat(a.amount) < parseFloat(b.amount)) ? 1 : -1)

    categories = categories.filter((cat) => {
      if (cat.name !== 'Miscellaneous') {
        return cat;

      }
    })

    categories.push(misCat);

    console.log('cat', categories);

    return categories;
  }
  returnCatIcon(cat) {
    if (cat === 'Travel') {
      return planeDeparture;
    } else if (cat === 'Ecommerce') {
      return shippingFast;
    } else if (cat === 'Food') {
      return utensilsIcon;
    } else if (cat === 'Entertainment') {
      return movieOpen;
    } else if (cat === 'Miscellaneous') {
      return boxesIcon;
    } else {
      return boxesIcon;
    }

  }
  returnOrderImage(web) {

  let webImage;

  if (web === 'tesco' || web === 'Tesco') {
    webImage = 'tesco.png';
  } else if (web === 'Amazon') {
    webImage = 'amazon.png';
  } else if (web === 'Skyscanner') {
    webImage = 'skyscanner.png';
  } else if (web === 'Uber Eats') {
    webImage = `ubereats.png`;
  } else if (web === 'Momondo') {
    webImage = `momondo.png`;
  } else if (web === 'Booking.com') {
    webImage = `momondo.png`;
  } else if (web === 'Kayak') {
    webImage = `kayak.png`;
  } else if (web === 'Trip Advisor') {
    webImage = `tripAdvisor.png`;
  } else if (web === 'KLM') {
    webImage = `klm.png`;
  } else if (web === 'Expedia') {
    webImage = `expedia.png`;
  } else if (web === 'Google Flights') {
    webImage = `googleFlights.png`;
  } else if (web === 'Foodie') {
    webImage = `foodie.png`;
  } else if (web === 'K Ruoka') {
    webImage = `kruoka.png`;
  } else if (web === 'Kauppahalli24') {
    webImage = `kauppahalli24.png`;
  }

  return <img src={require(`../assets/img/companyLogos/${webImage}`)} id="analytics__ordersImage" />;
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
                      <div className="analytics__weekChangeGrowth"><Icon icon={arrowGrowth} /> Down 50% this {this.state.bigChartData === 'data1' ? 'year' : this.state.bigChartData === 'data2' ? 'month' : 'week'}</div>

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
                  <div className="chart-area" id="analytics__middleCharts">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Carbon Budget</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bag-16 text-primary" id="analytics__destinationIconColour" />{" "}
                    {this.getUserDestinations()}%
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area" id="analytics__middleCharts">
                    <Line
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
                    <i className="tim-icons icon-world text-success" id="analytics__destinationIconColour" />{this.returnTotalOffsets()}<span style={{ fontSize: '0.47em', top: '3px', position: 'relative' }}>2</span>
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
                        Highest CO2e
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Lowest CO2e
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        {this.state.ordersSort === 'recent' ? this.state.ordersRecent.map((or) => {

                            return (<tr>
                              <td id="analytics__recentOrdersImageWidth">
                              {this.returnOrderImage(or.website)}
                              </td>
                              <td id="analytics__recentOrdersTextSize">
                                <p className="title">{this.returnUpperCase(or.website)}</p>
                                <p className="text-muted">
                                    {or.name.length > 72 ? or.name.slice(0, 72) + ' ...' : or.name}
                                </p>
                              </td>
                              <td className="td-actions text-right">
                                <Button
                                  color="link"
                                  id="tooltip636901683"
                                  title=""
                                  type="button"
                                >
                                  <p id="analytics__mainTextSideOrders">{this.returnOrdersEm(or.carbon)}<span id="analytics__ordersSmall2">2</span></p>
                                </Button>
                              </td>
                            </tr>)
                          }) : undefined}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>


            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <h6 id="analytics__recentOrdersTitleOffset" className="title d-inline">🛫 Emissions by Category</h6>
                </CardHeader>
                <div className="analytics__offsetsSpacing"></div>
                <CardBody>
                  <div className="table-full-width table-responsive" id="analytics__orByCatTopContainer">


                  {this.returnOrderCategories().map((cat) => {

                  return (
                  <div>
                  <div className="analytics__orByCatIndv">

                  <div className="analytics__orByCatIconContainer"><Icon icon={this.returnCatIcon(cat.name)} /></div>

                  <div className="analytics__orByCatTextLeft">

                  <div className="analytics__orByCatCatName">{cat.name}</div>
                  <div className="analytics__orByCatWebsites">{cat.websites.length > 0 ? cat.websites : 'No Sites'}</div>

                  </div>

                  <div className="analytics__orByCatBarText" style={{ "right": `${cat.percentage < 1 ? '15px' : `${0.84*(cat.percentage)}` + `px`} `}}>
                  <div className="analytics__orByCatBarEm">{cat.amount}kg</div>
                  <div className="analytics__orByCatBarPer">{cat.percentage ? cat.percentage : 0}%</div>
                  </div>

                  <div className="analytics__orByCatBar" style={{ "width": `${12*(cat.percentage/100)}%` }}>

                  </div>

                  </div>

                  <div className="analytics__orByCatSeperator"></div></div>)

                  })}










                    {/*   <Table>
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
                    </Table>*/}
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
