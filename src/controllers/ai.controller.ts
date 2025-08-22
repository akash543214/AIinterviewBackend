import { Request, Response } from "express";
import { ApiResponse } from "../utils/apiResponse";
import speech from "@google-cloud/speech";
import fs from "fs";
import { evaluateAnswers } from "../services/eval";

const client = new speech.SpeechClient();



const transcribeUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

      const question = req.body.question || "Provide a summary of the transcript.";

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const audioBytes = fileBuffer.toString("base64");



    // Detect format from filename
    const originalName = req.file.originalname.toLowerCase();
    let encoding: "OGG_OPUS" | "WEBM_OPUS" = "WEBM_OPUS";
    if (originalName.endsWith(".ogg")) {
      encoding = "OGG_OPUS";
    }

    const [response] = await client.recognize({
      audio: { content: audioBytes },
      config: {
        encoding,
        sampleRateHertz: 48000,
        languageCode: "en-US",
        enableAutomaticPunctuation: true,
      },
    });

    const transcript = response.results
      ?.map((r) => r.alternatives?.[0].transcript)
      .join("\n");

    // cleanup temp file
    fs.unlinkSync(filePath);


const result = await evaluateAnswers(
  "Akash Sharma",
  "Software Engineer",
  "We are looking for a skilled software engineer with experience in Fullstack and cloud technologies.",
  {
    [question]: transcript || "No transcript available"
  }
);
    res.status(200).json({ result:result });
  } catch (error) {
    console.error("Error in transcribeUpload:", error);
    res
      .status(500)
      .json({ error: "Failed to transcribe uploaded audio file" });
  }
};

const healthCheck = (req: Request, res: Response) => {
  res
    .status(200)
    .json(new ApiResponse(200, {}, "health check completed in production"));
};

export { healthCheck, transcribeUpload };
