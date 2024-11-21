import { resumeSchema } from "./resume.schema";

export const extendedResumeSchema = {
    ...resumeSchema,
    "properties": {
        ...resumeSchema.properties,
        "basics": {
            "type": "object",
            "properties": {
                ...resumeSchema.properties.basics.properties,
                "pronouns": {
                    "type": "string",
                    "description": "Your pronouns"
                },
            }
        }
    }
}