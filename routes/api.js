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

module.exports = router;