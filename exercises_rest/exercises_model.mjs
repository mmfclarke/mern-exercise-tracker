/**
 * Matthew Clarke
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

// Exercise schema definition
const exerciseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 1  // Must have at least 1 character
    },
    reps: { 
        type: Number, 
        required: true,
        min: 1,  // Must be greater than 0
        validate: {
            validator: Number.isInteger,    // Must be an integer
            message: 'Reps must be an integer'
        }
    },
    weight: { 
        type: Number, 
        required: true,
        min: 1,  // Must be greater than 0
        validate: {
            validator: Number.isInteger,    // Must be an integer
            message: 'Weight must be an integer'
        }
    },
    unit: { 
        type: String, 
        required: true,
        enum: ['kgs', 'lbs']  // Only allow 'kgs' or 'lbs'
    },
    date: { 
        type: String, 
        required: true,
        match: [/^\d\d-\d\d-\d\d$/, 'Date must be in MM-DD-YY format']
    }
});

// Exercise model definition
const Exercise = mongoose.model('Exercise', exerciseSchema);

/**
 * Validate date format MM-DD-YY
 * @param {string} date - Date string to validate
 * @returns {boolean} - True if valid format, false otherwise
 */
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
 * Validate exercise request body
 * @param {Object} body - Request body to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidExercise(body) {
    // Check if body exists and is an object
    if (!body || typeof body !== 'object') {
        return false;
    }

    // Get all property names from the request body
    const keys = Object.keys(body);
    
    // Check if exactly 5 properties exist (no more, no less)
    const requiredKeys = ['name', 'reps', 'weight', 'unit', 'date'];
    if (keys.length !== 5 || !requiredKeys.every(key => keys.includes(key))) {
        return false;
    }

    // Validate name: must be a non-empty string
    if (typeof body.name !== 'string' || body.name.trim().length === 0) {
        return false;
    }

    // Validate reps: must be an integer greater than 0
    if (!Number.isInteger(body.reps) || body.reps <= 0) {
        return false;
    }

    // Validate weight: must be an integer greater than 0
    if (!Number.isInteger(body.weight) || body.weight <= 0) {
        return false;
    }

    // Validate unit: must be either 'kgs' or 'lbs'
    if (body.unit !== 'kgs' && body.unit !== 'lbs') {
        return false;
    }

    // Validate date: must be in MM-DD-YY format
    if (typeof body.date !== 'string' || !isDateValid(body.date)) {
        return false;
    }

    return true;
}

/**
 * Create a new exercise document
 * @param {Object} exerciseData - The data for the new exercise
 * @returns {Promise<Object>} The created exercise document
 */
async function createExercise(exerciseData) {
    const exercise = new Exercise(exerciseData);
    return exercise.save();
}

/**
 * Find all exercise documents
 * @returns {Promise<Array>} - Array of all exercise documents
 */
async function findExercises() {
    const exercises = await Exercise.find({});
    return exercises;
}

/**
 * Find an exercise by its ID
 * @param {String} id - The MongoDB ObjectId as a string
 * @returns {Promise<Object|null>} - The exercise document or null if not found
 */
async function findExerciseById(id) {
    const exercise = await Exercise.findById(id);
    return exercise;
}

/**
 * Update an exercise by its ID
 * @param {String} id - The MongoDB ObjectId as a string
 * @param {Object} updateData - Object containing updated exercise data
 * @returns {Promise<Object|null>} - The updated exercise document or null if not found
 */
async function updateExerciseById(id, updateData) {
    // Find and update the document, returning the updated version
    const updatedExercise = await Exercise.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
    );
    return updatedExercise;
}

/**
 * Delete an exercise by its ID
 * @param {String} id - The MongoDB ObjectId as a string
 * @returns {Promise<Object|null>} - The deleted exercise document or null if not found
 */
async function deleteExerciseById(id) {
    const deletedExercise = await Exercise.findByIdAndDelete(id);
    return deletedExercise;
}

export { 
    connect, 
    Exercise, 
    createExercise, 
    findExercises, 
    findExerciseById, 
    updateExerciseById, 
    deleteExerciseById,
    isValidExercise
};