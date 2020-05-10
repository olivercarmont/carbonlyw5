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

  let accuracyRating = 'D';

  let description, weight, category, unit = 'kg';

  let foodData, preparedFoodData, drinksData;

  let pFoodData, pDrinksData, pTravelData, pApparelData, pMiscellaneousData, pElectronicsData;

  let foodDataKeys, preparedFoodDataKeys, drinksDataKeys, productLevelDataKeys;

  let pFoodDataKeys, pDrinksDataKeys, pTravelDataKeys, pApparelDataKeys, pMiscellaneousDataKeys, pElectronicsDataKeys;

  let predictedCategory, predictedEm, emissions;

  let objectSpecificCat;

  if (!req.body.category && !req.header('category')) {

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

    pFoodDataKeys = Object.keys(pFoodData)
    pDrinksDataKeys = Object.keys(pDrinksData)
    pTravelDataKeys = Object.keys(pTravelData)
    pApparelDataKeys = Object.keys(pApparelData)
    pMiscellaneousDataKeys = Object.keys(pMiscellaneousData)
    pElectronicsDataKeys = Object.keys(pElectronicsData)

    mainLists = [drinksDataKeys, foodDataKeys, preparedFoodDataKeys, pTravelDataKeys];

    objectLists = [pFoodDataKeys, pDrinksDataKeys, pApparelDataKeys, pMiscellaneousDataKeys, pElectronicsDataKeys];

    if (category) {

      if (category === 'flight') {

        let company1, company2, distance1, distance2;
        let company1Em, company2Em;

        let predictedCom1, predictedCom2;
        let comparison1, comparison2;

        if ((req.body.company1 || req.header('company1')) && (req.body.distance1 || req.header('distance1'))) {

          company1 = req.body.company1 ? req.body.company1 : req.header("company1");
          distance1 = req.body.distance1 ? req.body.distance1 : req.header("distance1");

          if ((req.body.company2 || req.header("company2")) && (req.body.distance2 || req.header('distance2'))) {

            company2 = req.body.company2 ? req.body.company2 : req.header("company2");
            distance2 = req.body.distance2 ? req.body.distance2 : req.header("distance2");

            for (const com of pTravelDataKeys) {

              if((company1.toLowerCase()).includes(com.toLowerCase())) {
                  predictedCom1 = com;
                  company1Em = parseFloat(pTravelData[com]) * parseFloat(distance1);
                  accuracyRating = 'B';
              }
            }

            for (const com of pTravelDataKeys) {

              if((company2.toLowerCase()).includes(com.toLowerCase())) {
                  predictedCom2 = com;
                  console.log('ENTERED HERE FOUND');
                  company2Em = parseFloat(pTravelData[com]) * parseFloat(distance2);
                  accuracyRating = 'B';
              }
            }

            if (!company1Em) {
              if (category === 'flight') {
                predictedCom1 = 'Average Flight';
                company1Em = parseFloat(pTravelData['Average Flight']) * parseFloat(distance1);
                accuracyRating = 'C';
              }
            }

            if (!company2Em) {
              if (category === 'flight') {
                predictedCom2 = 'Average Flight';
                company2Em = parseFloat(pTravelData['Average Flight']) * parseFloat(distance2);
                accuracyRating = 'C';
              }
            }

            } else {

              for (const com of pTravelDataKeys) {

                if((company1.toLowerCase()).includes(com.toLowerCase())) {
                    predictedCom1 = com;
                    company1Em = parseFloat(pTravelData[com]) * parseFloat(distance1);
                }
              }

              if (!company1Em) {

                if (category === 'flight') {
                  console.log('entered into defining terr')
                  predictedCom1 = 'Average Flight';
                  company1Em = parseFloat(pTravelData['Average Flight']) * parseFloat(distance1);
                }
              }
            }
          }

          // console.log('c1', company2Em);

          console.log('C1', company1Em);

          let averageAll = parseFloat(pTravelData["Average Flight"]);

          if (company1Em && company2Em) {

            company1Em = company1Em.toFixed(2);
            company2Em = company2Em.toFixed(2);

            let totalEm = (parseFloat(company1Em) + parseFloat(company2Em));
            totalEm = parseFloat(totalEm).toFixed(2);

            let avCom = parseFloat(pTravelData[predictedCom1]) + parseFloat(pTravelData[predictedCom2]);

            avCom /= 2;

            if (avCom > averageAll) {
              comparison = 'Above Average';
            } else if (avCom === averageAll) {
              comparison = 'Average';
            } else if (avCom < averageAll) {
              comparison = 'Below Average';
            }

            return res.json({ company1Em, company2Em, totalEm, predictedCom1, predictedCom2, accuracyRating, comparison });

          } else if (company1Em) {

            company1Em = parseFloat(company1Em).toFixed(2);

            let c1Av = parseFloat(pTravelData[predictedCom1]);

            if (c1Av > averageAll) {
              comparison = 'Above Average';
            } else if (c1Av === averageAll) {
              comparison = 'Average';
            } else if (c1Av < averageAll) {
              comparison = 'Below Average';
            }

            return res.json({ company1Em, "totalEm": company1Em, predictedCom1, accuracyRating, comparison });

          }

      }

    } else {

    let mi = 0;

    mainLists.map((list) => {

    let tList;

    list.sort(function(a, b){
    return a.length - b.length;
    });

    let matchingNum = 0;

    // console.log('LI', list);

    // see if category is a lc substring of product name
    for (const categ of list){

    let localMatch = 0;

      if(description && categ) {

        let descriptors = categ.split(" ");

        if (descriptors.length < 3) {
          if((description.toLowerCase()).includes(categ.toLowerCase())) {
              predictedCategory = categ
              tList = mi;
              // break
          }
        } else {

          descriptors.map((des) => {

            // console.log('des', des);

          if ((description.toLowerCase()).includes(des.toLowerCase())) {
            localMatch++;
          }

          // console.log('categ', `${categ}, ${localMatch}`);


          })

          // console.log('lMatch', localMatch);

          if (localMatch >= 2) {

          // console.log('lMatchAGAIN', localMatch);

          if (localMatch > matchingNum) {

            predictedCategory = categ;
            matchingNum = localMatch;
            tList = mi;
          }
        }

        }


    }
    // console.log('pred', predictedCategory);
  }

    if (predictedCategory) {

      if (tList === 0) {

        accuracyRating = 'C';

        predictedEm = parseFloat(drinksData[predictedCategory]);

      } else if (tList === 1) {

        accuracyRating = 'C';

        predictedEm = parseFloat(foodData[predictedCategory]);

      } else if (tList === 2) {

        accuracyRating = 'B';

        predictedEm = parseFloat(preparedFoodData[predictedCategory]);
        unit = 'portion';

      } else if (tList === 3) {

        accuracyRating = 'B';

        predictedEm = parseFloat(pTravelData[predictedCategory]);

      }

    }

    mi++;

    })

    let objectPredictedCategory;

    objectLists.map((list) => {

    let matchingNum = 0;

    list.sort(function(a, b){
    return a.length - b.length;
    });

    // see if category is a lc substring of product name
    for (const categ of list){

      let localMatch = 0;

      let descriptors = categ.split(" ");

      if(description) {

          // if (descriptors.length < 2) {
          // if((description.toLowerCase()).includes(categ.toLowerCase().replace(/s$/,''))) {
          //     objectPredictedCategory = categ
          //     // break
          // }
          //
          // } else {

            descriptors.map((des) => {

            if ((description.toLowerCase()).includes(des.toLowerCase())) {
              localMatch++;
            }

            })

            if (localMatch >= 1) {

            if (localMatch > matchingNum) {

              objectPredictedCategory = categ
              matchingNum = localMatch;
            }
          }

          // }
      }

    }

    let fullArray, fullArrayKeys;

    if (list === pFoodDataKeys) {
      fullArray = pFoodData;
      accuracyRating = 'B';
      // fullArrayKeys =pFoodData);
    } else if (list === pDrinksDataKeys) {
      fullArray = pDrinksData;
      accuracyRating = 'B';
    } else if (list === pApparelDataKeys) {
      fullArray = pApparelData;
      accuracyRating = 'B';
    } else if (list === pMiscellaneousDataKeys) {
      fullArray = pMiscellaneousData;
      accuracyRating = 'B';
    } else if (list === pElectronicsDataKeys) {
      fullArray = pElectronicsData;
      accuracyRating = 'B';
    }

    if (objectPredictedCategory && fullArray[objectPredictedCategory]) {

    let newPredictedCategory;

    matchingNum = 0;

    //   console.log('predic', objectPredictedCategory)
    //
    // console.log('fArray', fullArray);

    //
    // pDrinksDataKeys = Object.keys(pDrinksData)
    // pTravelDataKeys = Object.keys(pTravelData)
    // pApparelDataKeys = Object.keys(pApparelData)
    // pMiscellaneousDataKeys = Object.keys(pMiscellaneousData)
    // pElectronicsDataKeys = Object.keys(pElectronicsData)

      let newKeys = Object.keys(fullArray[objectPredictedCategory]);

      newKeys.sort(function(a, b){
      return a.length - b.length;
        });

      // console.log('KEY', newKeys);

      for (const categ of newKeys) {

        let localMatch = 0;

        if(description) {

            let descriptors = categ.split(" ");

            if (descriptors.length < 3) {
            if((description.toLowerCase()).includes(categ.toLowerCase().replace(/s$/,''))) {
                newPredictedCategory = categ
                // break
            }

          } else {

            descriptors.map((des) => {

            if ((description.toLowerCase()).includes(des.toLowerCase())) {
              localMatch++;
            }

            })

            if (localMatch >= 2) {

            if (localMatch > matchingNum) {
              newPredictedCategory = categ
              matchingNum = localMatch;
            }
          }

          }
        }
      }

      if (newPredictedCategory) {
         objectSpecificCat = newPredictedCategory;
         predictedEm = parseFloat(fullArray[objectPredictedCategory][newPredictedCategory]);
      } else {
        predictedEm = parseFloat(foodData['Apple']);
      }

    }

    })

    if (objectSpecificCat) {
      predictedCategory = objectSpecificCat;
    }

    if (!predictedCategory) {
      predictedCategory = 'Apple';
      predictedEm = parseFloat(foodData['Apple']);
    }

    if (unit == 'portion') {
      emissions = predictedEm.toFixed(4);
    } else {
      emissions = (weight*predictedEm).toFixed(4);
    }

    }

    return res.json({ emissions, unit, predictedCategory, accuracyRating });


  }

}, 2)


});

module.exports = router;
