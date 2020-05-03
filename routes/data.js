const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
var jwtDecode = require('jwt-decode');

// Load User model
const Data = require("../models/Data");

global.atob = require("atob");

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

router.post("/req-data", (req, res) => {

  let dataArray = [], mainLists, objectLists;

  let description, weight, category;

  let foodData, preparedFoodData, drinksData;

  let pFoodData, pDrinksData, pTravelData, pApparelData, pMiscellaneousData, pElectronicsData;

  let foodDataKeys, preparedFoodDataKeys, drinksDataKeys, productLevelDataKeys;

  let pFoodDataKeys, pDrinksDataKeys, pTravelDataKeys, pApparelDataKeys, pMiscellaneousDataKeys, pElectronicsDataKeys;

  let predictedCategory, predictedEm, emissions;

  if (req.body.description && req.body.weight) {
    description = req.body.description;
    weight = parseFloat(req.body.weight);
  } else if (req.header('description') && req.header('weight')) {
    description = req.header('description');
    weight = parseFloat(req.header('weight'));
  }

  if (!req.body.description && !req.header('description')) {
    return res.status(400).json(`Description: Not Found`);
  }

  if (!req.body.weight && !req.header('weight')) {
    return res.status(400).json(`Weight: Not Found`);
  }

  if (req.body.category) {
    category = req.body.category;
  } else if (req.header('category')) {
    category = req.header('category');
  }

  Data.find().then((dataA) => {

      // console.log('data', dataA);

      dataArray.push(dataA);
  });

  var timer2 = 0;
  var si2 = setInterval(() => {

    timer2++;

    if ((timer2 > 10000) || dataArray.length > 0) {

      console.log('went', `${timer2}`)

    clearInterval(si2);

    foodData = dataArray[0][0].data;
    preparedFoodData = dataArray[0][1].data;
    drinksData = dataArray[0][2].data;

    pFoodData = JSON.parse(JSON.stringify(dataArray[0][3])).food;
    pDrinksData = JSON.parse(JSON.stringify(dataArray[0][3])).drinks;
    pTravelData = JSON.parse(JSON.stringify(dataArray[0][3])).travel;
    pApparelData = JSON.parse(JSON.stringify(dataArray[0][3])).apparel;
    pMiscellaneousData = JSON.parse(JSON.stringify(dataArray[0][3])).miscellaneous;
    pElectronicsData = JSON.parse(JSON.stringify(dataArray[0][3])).miscellaneous;

    foodDataKeys = Object.keys(foodData)
    preparedFoodDataKeys = Object.keys(preparedFoodData)
    drinksDataKeys = Object.keys(drinksData)

    console.log('pfood data', pFoodData)

    pFoodDataKeys = Object.keys(pFoodData)
    pDrinksDataKeys = Object.keys(pDrinksData)
    pTravelDataKeys = Object.keys(pTravelData)
    pApparelDataKeys = Object.keys(pApparelData)
    pMiscellaneousDataKeys = Object.keys(pMiscellaneousData)
    pElectronicsDataKeys = Object.keys(pElectronicsData)

    mainLists = [drinksDataKeys, foodDataKeys, preparedFoodDataKeys, pTravelDataKeys];

    objectLists = [pFoodDataKeys, pDrinksDataKeys, pApparelDataKeys, pMiscellaneousDataKeys, pElectronicsDataKeys];

    if (category) {

    } else {

    let mi = 0;

    mainLists.map((list) => {

    let tList;

    list.sort(function(a, b){
    return b.length - a.length;
    });

    // console.log('LI', list);

    // see if category is a lc substring of product name
    for (const categ of list){

      if(description) {

          if((description.toLowerCase()).includes(categ.toLowerCase())) {
              predictedCategory = categ
              tList = mi;

              break
          }
      }
    }

    if (predictedCategory) {

      if (tList === 0) {

        predictedEm = parseFloat(drinksData[predictedCategory]);

      } else if (tList === 1) {

        predictedEm = parseFloat(foodData[predictedCategory]);

      } else if (tList === 2) {

        predictedEm = parseFloat(preparedFoodData[predictedCategory]);

      } else if (tList === 3) {

        predictedEm = parseFloat(pTravelData[predictedCategory]);

      }

    }

    mi++;

    })

    let objectPredictedCategory;

    objectLists.map((list) => {

    list.sort(function(a, b){
    return b.length - a.length;
    });

    // see if category is a lc substring of product name
    for (const categ of list){
    // console.log('prodName', productName);
      if(description) {
          if((description.toLowerCase()).includes(categ.toLowerCase().replace(/s$/,''))) {
              objectPredictedCategory = categ
              break
          }
      }
    }

    if (objectPredictedCategory) {

    let newPredictedCategory;

      // see if category is a lc substring of product name
      for (const categ of list[predictedCategory]){
      // console.log('prodName', productName);
        if(description) {
            if((description.toLowerCase()).includes(categ.toLowerCase().replace(/s$/,''))) {
                newPredictedCategory = categ
                break
            }
        }
      }

      if (newPredictedCategory) {
        objectPredictedCategory = newPredictedCategory;
         predictedEm = parseFloat(list[objectPredictedCategory][newPredictedCategory]);
      } else {
        predictedEm = parseFloat(foodData['Apple']);
      }

    }

    })

    if (objectPredictedCategory) {
      predictedCategory = objectPredictedCategory;
    }

    if (!predictedCategory) {
      predictedCategory = 'Apple';
      predictedEm = parseFloat(foodData['Apple']);
    }

    emissions = (weight*predictedEm).toFixed(4)

    }

    return res.json({ emissions });

  }

  }, 5)


});

module.exports = router;
