export interface BalloonData {
  id: string;
  color: string;
  colorHex: string;
  image: string; // base64 or URL
  message: string;
}

export interface SiteContent {
  motherName: string;
  senderName: string;
  heroPhoto: string; // base64 or URL
  finalMessage: string;
  theme: string;
  createdAt: string;
  balloons: BalloonData[];
}

export const DEFAULT_BALLOON_MESSAGES = [
  "Every memory with you is my greatest treasure 💕",
  "Your laughter is my favorite song in the world 🌸",
  "Thank you for being my safe place always 🤗",
  "Your love has shaped everything beautiful in my life 🌺",
  "I carry your warmth with me wherever I go 💫",
  "No words could ever capture how much I love you 💝",
];

export const DEFAULT_FINAL_MESSAGE = `There are moments in life when words feel too small for what the heart holds.
This is one of those moments.

You have been my first love, my safe harbour, and my greatest teacher.
In your eyes, I learned what it means to be brave.
In your arms, I understood what it means to be home.
In your voice, I found my courage — even on the darkest days.

You never asked for credit for the a thousand quiet sacrifices you made —
the sleepless nights, the gentle reassurances,
the way you always seemed to know exactly what I needed before I did.

You are more than a mother.
You are the thread that holds the family together,
the warmth that fills every room,
the grace that makes everything feel possible.

On this Mother's Day, I want you to know:
you are deeply, endlessly, fiercely loved.

Not just today — but every single day.
Forever and always.`;

export const BALLOON_COLORS = [
  { name: 'Rose', value: 'rose', hex: '#e8a0a0', gradient: 'linear-gradient(135deg, #e8a0a0, #c96b6b)' },
  { name: 'Peach', value: 'peach', hex: '#ffd4b3', gradient: 'linear-gradient(135deg, #ffd4b3, #f5a077)' },
  { name: 'Lavender', value: 'lavender', hex: '#c9a8e0', gradient: 'linear-gradient(135deg, #c9a8e0, #9b72c8)' },
  { name: 'Sky', value: 'sky', hex: '#a8d8f0', gradient: 'linear-gradient(135deg, #a8d8f0, #5bacd4)' },
  { name: 'Mint', value: 'mint', hex: '#a8e6cf', gradient: 'linear-gradient(135deg, #a8e6cf, #56b487)' },
  { name: 'Gold', value: 'gold', hex: '#f5d592', gradient: 'linear-gradient(135deg, #f5d592, #d4a853)' },
  { name: 'Coral', value: 'coral', hex: '#ff9a8b', gradient: 'linear-gradient(135deg, #ff9a8b, #e05d4b)' },
];

export const defaultContent: SiteContent = {
  motherName: "Mummy",
  senderName: "Aastha",
  heroPhoto: "",
  finalMessage: DEFAULT_FINAL_MESSAGE,
  theme: "blush",
  createdAt: new Date().toISOString(),
  balloons: [
    {
      id: "1",
      color: "rose",
      colorHex: "#e8a0a0",
      image: "",
      message: DEFAULT_BALLOON_MESSAGES[0],
    },
    {
      id: "2",
      color: "peach",
      colorHex: "#ffd4b3",
      image: "",
      message: DEFAULT_BALLOON_MESSAGES[1],
    },
    {
      id: "3",
      color: "lavender",
      colorHex: "#c9a8e0",
      image: "",
      message: DEFAULT_BALLOON_MESSAGES[2],
    },
    {
      id: "4",
      color: "gold",
      colorHex: "#f5d592",
      image: "",
      message: DEFAULT_BALLOON_MESSAGES[3],
    },
    {
      id: "5",
      color: "sky",
      colorHex: "#a8d8f0",
      image: "",
      message: DEFAULT_BALLOON_MESSAGES[4],
    },
  ],
};
