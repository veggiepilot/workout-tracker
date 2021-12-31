const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/api/workouts/", (req, res) => {
    
    Workout.find({})
        .sort({ date: -1 })
        .then(lastWorkout => {
            res.json(lastWorkout);
        })
        .catch(err => {
            res.status(400).json(err)
        });
});

router.put("/api/workouts/:id", async (req, res) => {
    const _id = req.params.id;

    const exercise = req.body;
    if (exercise.type === 'resistance') {
        try{
            const result = await Workout.updateOne(
               { _id },
               { $push: 
                    {exercises: 
                        {
                            name: exercise.name, 
                            type: exercise.type, 
                            duration: exercise.duration, 
                            weight: exercise.weight, 
                            reps: exercise.reps, 
                            sets: exercise.sets
                        }
                    } 
                }
           );
           res.status(200).json(result);
       } catch(err) {
           res.status(500).json(err);
       }  
    } else if (exercise.type === 'cardio') {
        try{
            const result = await Workout.updateOne(
               { _id },
               { $push: 
                    {exercises: 
                        {
                            name: exercise.name, 
                            type: exercise.type, 
                            duration: exercise.duration, 
                            distance: exercise.distance
                        }
                    } 
                }
           );
           res.status(200).json(result);
       } catch(err) {
           res.status(500).json(err);
       }  
    } 
});

router.post("/api/workouts", async (req, res) => {

    const exercise = req.body;

    if (exercise.type === 'resistance') {
        try{
            const result = await Workout.create(  
                {exercises: 
                    {
                        name: exercise.name, 
                        type: exercise.type, 
                        duration: exercise.duration, 
                        weight: exercise.weight, 
                        reps:exercise.reps, 
                        sets: exercise.sets
                    }
                });
            res.status(200).json(result);
         }catch(err) {
             console.log(err);
            res.status(500).json(err);
         }
    } else if (exercise.type === 'cardio') {
        try{
            const result = await Workout.create(  
                {exercises: 
                    {
                        name: exercise.name, 
                        type: exercise.type, 
                        duration: exercise.duration, 
                        distance: exercise.distance
                    }
                });
            console.log(result);
            res.status(200).json(result);
         }catch(err) {
             console.log(err);
            res.status(500).json(err);
         }
    }

});

module.exports = router;