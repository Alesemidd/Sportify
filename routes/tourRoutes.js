/* eslint-disable prettier/prettier */
const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

//1. post / tour/tourid1231231/reviews post one reivew on a specific tour

//2. get / tour/tourid1231231/reviews /all reviews per tour

//3. get / tour/tourid1231231/reviews/34234243  one review per tour

router.use('/:tourId/reviews', reviewRouter);

router
 .route('/top-5-cheap')
 .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
 .route('/monthly-plan/:year')
 .get(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide', 'guide'),
  tourController.getMonthlyPlan
 );

router
 .route('/tours-within/:distance/center/:latlng/unit/:unit')
 .get(tourController.getToursWithin);
//ex: tours-within/233/center/-45,54/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
 .route('/')
 .get(tourController.getAllTours)
 .post(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
  tourController.createTour
 );
router
 .route('/:id')
 .get(tourController.getTour)
 .patch(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
  tourController.uploadTourImages,
  tourController.resizeTourImages,
  tourController.updateTour
 )
 .delete(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
  tourController.deleteTour
 );

module.exports = router;
