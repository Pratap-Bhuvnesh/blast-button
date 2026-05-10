import { Howl } from "howler";

let soundInstance: Howl | null = null;

export function playSound(url: string) {
  if (soundInstance) {
    soundInstance.stop();
  }

  soundInstance = new Howl({
    src: [url],
    volume: 1,
  });

  soundInstance.play();
}