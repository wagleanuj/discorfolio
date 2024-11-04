export const resumeSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "basics": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Your full name"
        },
        "label": {
          "type": "string",
          "description": "e.g. Web Developer"
        },
        "image": {
          "type": "string",
          "description": "URL to a image in JPEG or PNG format",
          "format": "uri"
        },
        "email": {
          "type": "string",
          "description": "e.g. thomas@gmail.com",
          "format": "email"
        },
        "phone": {
          "type": "string",
          "description": "Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923"
        },
        "url": {
          "type": "string",
          "description": "Your personal website",
          "format": "uri"
        },
        "summary": {
          "type": "string",
          "description": "Write a short 2-3 sentence biography about yourself"
        },
        "location": {
          "type": "object",
          "properties": {
            "address": {
              "type": "string",
              "description": "To add multiple address lines, use \\n."
            },
            "postalCode": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "countryCode": {
              "type": "string",
              "description": "code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN"
            },
            "region": {
              "type": "string",
              "description": "The general region where you live. Can be a US state, or a province, for instance."
            }
          }
        },
        "profiles": {
          "type": "array",
          "description": "Specify any number of social networks that you participate in",
          "items": {
            "type": "object",
            "properties": {
              "network": {
                "type": "string",
                "description": "e.g. Facebook or Twitter"
              },
              "username": {
                "type": "string",
                "description": "e.g. neutralthoughts"
              },
              "url": {
                "type": "string",
                "description": "e.g. http://twitter.example.com/neutralthoughts",
                "format": "uri"
              }
            }
          }
        }
      }
    },
    "work": {
      "type": "array",
      "description": "Work experience entries",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Company name"
          },
          "position": {
            "type": "string",
            "description": "Your role/position"
          },
          "url": {
            "type": "string",
            "description": "Company website",
            "format": "uri"
          },
          "startDate": {
            "type": "string",
            "description": "Start date",
            "pattern": "^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$"
          },
          "endDate": {
            "type": "string",
            "description": "End date",
            "pattern": "^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$"
          },
          "summary": {
            "type": "string",
            "description": "Brief description of your role"
          },
          "highlights": {
            "type": "array",
            "description": "Key achievements",
            "items": {
              "type": "string",
              "description": "Achievement description"
            }
          }
        }
      }
    },
    "education": {
      "type": "array",
      "description": "Educational background",
      "items": {
        "type": "object",
        "properties": {
          "institution": {
            "type": "string",
            "description": "School/University name"
          },
          "url": {
            "type": "string",
            "description": "Institution website",
            "format": "uri"
          },
          "area": {
            "type": "string",
            "description": "Field of study"
          },
          "studyType": {
            "type": "string",
            "description": "Degree type"
          },
          "startDate": {
            "type": "string",
            "description": "Start date",
            "pattern": "^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$"
          },
          "endDate": {
            "type": "string",
            "description": "End date",
            "pattern": "^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$"
          },
          "score": {
            "type": "string",
            "description": "Grade/GPA"
          },
          "courses": {
            "type": "array",
            "description": "List of relevant courses",
            "items": {
              "type": "string",
              "description": "Course name"
            }
          }
        }
      }
    },
    "skills": {
      "type": "array",
      "description": "Professional skills",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Skill name"
          },
          "level": {
            "type": "string",
            "description": "Skill level (e.g. Beginner, Intermediate, Advanced)"
          },
          "keywords": {
            "type": "array",
            "description": "Related keywords",
            "items": {
              "type": "string",
              "description": "Keyword"
            }
          }
        }
      }
    },
    "projects": {
      "type": "array",
      "description": "Notable projects",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Project name"
          },
          "description": {
            "type": "string",
            "description": "Project description"
          },
          "highlights": {
            "type": "array",
            "description": "Key features/achievements",
            "items": {
              "type": "string",
              "description": "Feature/Achievement description"
            }
          },
          "keywords": {
            "type": "array",
            "description": "Technologies used",
            "items": {
              "type": "string",
              "description": "Technology name"
            }
          },
          "startDate": {
            "type": "string",
            "description": "Start date",
            "pattern": "^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$"
          },
          "endDate": {
            "type": "string",
            "description": "End date",
            "pattern": "^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$"
          },
          "url": {
            "type": "string",
            "description": "Project URL",
            "format": "uri"
          }
        }
      }
    },
    "awards": {
      "type": "array",
      "description": "Honors and awards",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Award title"
          },
          "date": {
            "type": "string",
            "description": "Date received",
            "pattern": "^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$"
          },
          "awarder": {
            "type": "string",
            "description": "Awarding organization"
          },
          "summary": {
            "type": "string",
            "description": "Award description"
          }
        }
      }
    }
  }
} as const;

export type ResumeSchema = typeof resumeSchema;