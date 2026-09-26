//controller for enhancing a resume's professional summary:
//POST : /api/ai/enhance-pro-sum

import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

export const enhanceProfessioanlSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills,experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message;
        console.log(enhancedContent);

        return res.status(200).json({ enhancedContent })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// controller for enhancing a resume's job description
// POST : /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description  of a resume. The job description should be 1-2 sentences also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else"
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message;
        console.log(enhancedContent);

        return res.status(200).json({ enhancedContent })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// controller for enhancing a resume's job description
// POST : /api/ai/enhance-project-desc

export const enhanceProjectDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the project description  of a resume. The project description should be 3-4 sentences also highlighting key impacts and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else"
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message;
        console.log(enhancedContent);

        return res.status(200).json({ enhancedContent })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// controller for uploading a resume to the databse
// POST : /api/ai/upload/resume

export const uploadResume = async (req, res) => {

    console.log(req.userId);

    try {

        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const systemPrompt = "You are an expert AI agent to extract data from resume."

        const userPrompt = `Extract all information from the following resume and return ONLY valid JSON.

         Rules:
         - Return ONLY a JSON object.
         - Do NOT wrap the JSON in markdown.
         - Do NOT add explanations or extra text.
         - Do NOT invent any information.
         - If a field is missing, use an empty string "".
         - If an array has no items, return [].
         - Keep dates exactly as written in the resume.
         - "is_current" must be a boolean (true or false).
         - "skills" must be an array of strings.

Resume:${resumeText}

Return the data in exactly this format:

{
  "professional_summary": "",

  "skills": [],

  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "portfolio": "",
    "github": "",
    "leetcode": "",
    "codeforces": "",
    "codechef": "",
    "geeksforgeeks": "",
    "atcoder": ""
  },

  "experience": [
    {
      "company": "",
      "position": "",
      "location": "",
      "employment_type": "",
      "start_date": "",
      "end_date": "",
      "is_current": false,
      "description": ""
    }
  ],

  "project": [
    {
      "name": "",
      "type": "",
      "tech_stack": "",
      "github": "",
      "live_demo": "",
      "description": ""
    }
  ],

  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ],

  "achievements": [],

  "certifications": [
    {
      "name": "",
      "issuer": "",
      "issue_date": "",
      "credential_id": "",
      "credential_url": ""
    }
  ]
} `;

        const response = await ai.chat.completions.create({
                model: process.env.OPENAI_MODEL,
                response_format: {
                  type: "json_object"
                },
                 messages: [
             {
                 role: "system",
                 content: systemPrompt
             },
             {
                 role: "user",
                 content: userPrompt
             }
           ]
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({ userId, title, ...parsedData })

        res.json({ resumeId: newResume._id })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}



