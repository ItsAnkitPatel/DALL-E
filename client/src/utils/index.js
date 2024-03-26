import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  const imageBlob = await fetch(photo)
    .then((response) => response.arrayBuffer())
    .then((buffer) => new Blob([buffer], { type: "image/jpg" }));
  const url = URL.createObjectURL(imageBlob)
  FileSaver.saveAs(url, `download-${_id}.jpg`);
}
