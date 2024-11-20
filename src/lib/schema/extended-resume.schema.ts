import { resumeSchema } from "./resume.schema";

export const extendedResumeSchema = {
    ...resumeSchema,
    "properties": {
        ...resumeSchema.properties,
        "basics": {
            "type": "object",
            "properties": {
                ...resumeSchema.properties.basics.properties,
                "sex": {
                    "type": "string",
                    "description": "Your sex"
                },
            }
        }
    }
}