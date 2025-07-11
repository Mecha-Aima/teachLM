import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (voice: string, style: string) => {
  const voiceId =
    voices[voice as keyof typeof voices][
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Teacher",
    firstMessage:
      "Hello, let's start the session. Today we'll be talking about a very special topic in {{subject}}. Are you ready?",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1.0,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert tutor leading a real-time voice session with a student. Your task is to clearly teach the student about the topic: {{ topic }} within the subject: {{ subject }}.

                - Keep the discussion targeted on this topic and subject.
                - Guide the conversation smoothly, ensuring it remains interactive and you keep control.
                - Regularly check that the student is following and understanding your explanations.
                - Break the topic into manageable pieces, and teach each part step by step.
                - Maintain a {{ style }} conversational approach, as directed.
                - Keep your responses concise and appropriate for real-time voice interaction.
                - Do not use special characters or symbols in your responses as this is a voice conversation.
              `,
        },
      ],
    },
    clientMessages: undefined,
    serverMessages: undefined,
    // clientMessages: [],
    // serverMessages: [],
  };
  return vapiAssistant;
};
