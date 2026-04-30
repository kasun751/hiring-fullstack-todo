/**
 * Validation middleware for Todo creation and update requests.
 *
 * Uses express-validator to validate incoming request body:
 *
 * - title:
 *   - Required
 *   - Must be trimmed
 *   - Min length: 3 characters
 *   - Max length: 100 characters
 *
 * - description:
 *   - Optional field
 *   - Trimmed if provided
 *   - Max length: 500 characters
 *
 * After validation rules run:
 * - Collects all validation errors
 * - Returns 400 response if validation fails
 * - Passes control to next middleware if valid
 */
import { body, validationResult } from "express-validator";

export const validateTodo = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3 })
        .withMessage("Title must be at least 3 characters")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.array(),
            });
        }

        next();
    },
];