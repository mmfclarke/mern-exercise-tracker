/**
 * Matthew Clarke
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

/**
 * CREATE - POST /exercises
 * Creates a new exercise with the data provided in the request body
 */
app.post('/exercises', asyncHandler(async (req, res) => {
    // Validate the request body
    if (!exercises.isValidExercise(req.body)) {
        // Validation failed
        return res.status(400).json({ Error: "Invalid request" });
    }
    try {
        // Insert new exercise into the database
        const newExercise = await exercises.createExercise(req.body);
        res.status(201).json(newExercise);
    } catch (error) {
        res.status(400).json({ Error: "Invalid request" });
    }
}));

/**
 * READ ALL - GET /exercises
 * Retrieves all exercises from the database
 */
app.get('/exercises', asyncHandler(async (req, res) => {
    const allExercises = await exercises.findExercises();
    res.status(200).json(allExercises);
}));

/**
 * READ ONE - GET /exercises/:_id
 * Retrieves a single exercise by its ID
 */
app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const exerciseId = req.params._id;
    try {
        // Find the exercise by ID
        const exercise = await exercises.findExerciseById(exerciseId);

        if (exercise) {
            res.status(200).json(exercise);
        } else {
            res.status(404).json({ Error: "Not found" });
        }
    } catch (error) {
        res.status(404).json({ Error: "Not found" });
    }
}));

/**
 * UPDATE - PUT /exercises/:_id
 * Updates an existing exercise by its ID with the data in the request body
 */
app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    // Validate the request body
    if (!exercises.isValidExercise(req.body)) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    // Get the exercise ID
    const exerciseId = req.params._id;
    
    try {
        // Update the exercise
        const updatedExercise = await exercises.updateExerciseById(exerciseId, req.body);
        
        if (updatedExercise) {
            res.status(200).json(updatedExercise);
        } else {
            res.status(404).json({ Error: "Not found" });
        }
    } catch (error) {
        res.status(404).json({ Error: "Not found" });
    }
}));

/**
 * DELETE - DELETE /exercises/:_id
 * Deletes an exercise by its ID
 */
app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    // Get the exercise ID
    const exerciseId = req.params._id;
    
    try {
        // Delete the exercise
        const deletedExercise = await exercises.deleteExerciseById(exerciseId);
        
        if (deletedExercise) {
            res.status(204).send();
        } else {
            res.status(404).json({ Error: "Not found" });
        }
    } catch (error) {
        res.status(404).json({ Error: "Not found" });
    }
}));

// Start the server
app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});