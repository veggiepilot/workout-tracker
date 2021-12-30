const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .sort({ date: -1 })
        .then(lastWorkout => {
            res.json(lastWorkout);
        })
        .catch(err => {
            res.status(400).json(err)
        });
});

router.put("/api/workouts/:id", (req, res) => {
    const _id = req.params;
    const exercise = req.body;

    try{
        const result = Workout.updateOne(
            {_id },
            { $push: {exercises: exercise} }
        );
        res.send(result);
    } catch(err) {
        console.log(err);
    }
    

    
});

module.exports = router;