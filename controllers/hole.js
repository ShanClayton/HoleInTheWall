// DEPENDENCIES
const express = require('express');
const router = express.Router();


//DATABASE
const Food = require('../models/hole.js');
const Seed = require('../models/seed.js');

//credit to Karolin for idea
//___________________
//7 Restful Routes
//___________________
// Index  : GET    '/products'          1/7
// Show   : GET    '/products/:id'      2/7
// New    : GET    '/prodcuts/new'      3/7
// Create : POST   '/products'          4/7
// Edit   : GET    '/products/:id/edit' 5/7
// Update : PUT    '/products/:id'      6/7
// Delete : DELETE '/products/:id'      7/7

//___________________
//ROUTES
//___________________

// INDEX 1/7

// router.get('/', function(req, res){
//     res.render('index.ejs');
// });

//http://localhost3000/shop
router.get('/', (req, res) => {
  Food.find({}, (err, allFoods)=>{
    console.log(allFoods);
      res.render('index.ejs',{
        food:allFoods
      })
    })
})

//SEED ROUTE
router.get('/seed', (req, res)=>{
  console.log(Seed);
  Food.create(Seed, (err, createdSeed)=>{
    res.redirect('/holeinwall');
  })
})

//___________________
//CREATE ROUTES
//___________________

//NEW 3/7
//http://localhost:3000/new
router.get('/new', (req, res)=>{
    res.render('new.ejs');
})

//SHOW 2/7
router.get('/:id', (req, res)=>{
  Food.findById(req.params.id, (err, foundFood)=>{
    console.log(foundFood);
    res.render('show.ejs', {
      food: foundFood
    })
  })
})
//CREATE 4/7
//create new shops
router.post('/', (req, res)=>{
  Food.create(req.body, (err, createdFood)=>{
    res.redirect('/holeinwall');
  })
})

// EDIT ROUTE 5/7
// edit exisiting shops
router.get('/:id/edit', (req, res)=>{
  Food.findById(req.params.id, (err, foundFood)=>{
    res.render('edit.ejs', {
      food: foundFood
    })
  })
})

// UPDATE ROUTE 6/7
//update existing shops

router.put('/:id', (req,res)=>{
  Food.findByIdAndUpdate(req.params.id, req.body,{new:true},(err, updateModel)=>{
    res.redirect('/holeinwall')
  })
})
// DELETE ROUTE 7/7

router.delete('/:id', (req,res) =>{
  Food.findByIdAndRemove(req.params.id, (err, data)=>{
       res.redirect('/holeinwall');//redirect back to index pagee
   })
})


//Seed

// // //___________________
// // //Seed Route - Visit ONCE to populate database
// // //___________________
// router.get('/seed', (req, res)=>{
//    const Food = [
//        {
//            name:'Jenny\'s Family Restaurant',
//            img:'https://media-cdn.tripadvisor.com/media/photo-s/0a/25/17/7d/jenny-s-family-restaurant.jpg',
//            address:'1675 N Perris Blvd # B, Perris, CA 92571',
//            speciality: 'American',
//            rating: 2,
//            reviews: 'I love this 50\'s style dinerService is always excellent, so is the food. The whole family likes to go there for breakfast on the weekends.'
//        },
//        {
//            name:'Corky\'s Kitchen & Bakery',
//            img:'https://res.cloudinary.com/popmenu/image/upload/c_fit,h_1920,w_1920/v1538671879/wmk56y2ujqxmihuhwh6x.jpg',
//            address: '3150 Case Rd unit l, Perris, CA 92570',
//            speciality: 'American',
//            rating: 1,
//            reviews: 'This place gave me stomach bug that lasted over 24 hours. Stay clear away from this location. Will never go back!'
//        },
//        {
//            name:'Chicago Pasta House',
//            img:'https://cdn.onlyinyourstate.com/wp-content/uploads/2016/12/o-68-1-700x525.jpg',
//            address:'24667 Sunnymead Boulevard, Moreno Valley, CA 92553',
//            speciality: 'Italian',
//            rating: 5,
//            reviews:'By far the BEST Italian restaurant I\'ve ever been to. Customer Service was great, and the prices were even better!'
//        },
//        {
//            name:'Dragon House',
//            img:'http://www.changsdragonhouse.com/img/restaurant_small.jpg',
//            address:'10466 Magnolia Ave, Riverside, CA 92505',
//            speciality: 'Chinese',
//            rating: 3,
//            reviews: 'Traditional Chinese food, served in large portions. Drinks are fairly priced, the quality of food is consistent, and the staff seems to genuinely care about the service they\'re providing.'
//        },
//    ];
// });



module.exports = router;
