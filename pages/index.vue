<script setup lang="ts">


let audioContext: AudioContext | null = null;

onMounted(() => {
  audioContext = new AudioContext();
});


const morseCode = {
  "A": ".-",
  "B": "-...",
  "C": "-.-.",
  "D": "-..",
  "E": ".",
  "F": "..-.",
  "G": "--.",
  "H": "....",
  "I": "..",
  "J": ".---",
  "K": "-.-",
  "L": ".-..",
  "M": "--",
  "N": "-.",
  "O": "---",
  "P": ".--.",
  "Q": "--.-",
  "R": ".-.",
  "S": "...",
  "T": "-",
  "U": "..-",
  "V": "...-",
  "W": ".--",
  "X": "-..-",
  "Y": "-.--",
  "Z": "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "@": ".--.-.",
};
type MorseKey = keyof typeof morseCode;

const playing = ref(false);

const rawText = ref("");

const transformTextToMorse = (text = "") => {
  return text?.split("")?.map((char) => morseCode[char.toUpperCase() as MorseKey] || "")?.join(" ");
};

const morsedText = computed(() => {
  return transformTextToMorse(rawText.value);
});



const sampleRate = 44100;
const playMorseCode = (text = "") => {
  if (!audioContext) return;

  const frequency = 440; // Frecuencia del tono Morse
  const ditDuration = sampleRate * 0.1; // Duración de un punto (100ms)
  const dahDuration = sampleRate * 0.3; // Duración de una raya (300ms)
  const spaceBetweenSymbols = sampleRate * 0.1; // Espacio entre símbolos
  const spaceBetweenLetters = sampleRate * 0.3; // Espacio entre letras
  const spaceBetweenWords = sampleRate * 0.7; // Espacio entre palabras

  const morseCodeArray = text
    .toUpperCase()
    .split("")
    .map((char) => morseCode[char as MorseKey] || "")
    .join(" ");

  // Calcular tamaño total del buffer
  let totalSamples = 0;
  for (const code of morseCodeArray) {
    for (const symbol of code) {
      totalSamples += symbol === "." ? ditDuration : dahDuration;
      totalSamples += spaceBetweenSymbols; // Espacio entre símbolos
    }
    totalSamples += spaceBetweenLetters; // Espacio entre letras
  }

  totalSamples += spaceBetweenWords; // Espacio al final para evitar cortes

  const morseCodeBuffer = audioContext.createBuffer(1, totalSamples, sampleRate);
  const morseCodeData = morseCodeBuffer.getChannelData(0);

  let offset = 0;
  if (morseCodeArray.length === 0) return;

  for (const code of morseCodeArray) {
    for (const symbol of code) {
      const duration = symbol === "." ? ditDuration : dahDuration;

      for (let i = 0; i < duration; i++) {
        morseCodeData[offset + i] = 0.5 * Math.sin(2 * Math.PI * frequency * (i / sampleRate));
      }

      offset += duration;
      offset += spaceBetweenSymbols; // Espacio después de cada símbolo
    }

    // Agregar silencio entre letras (sin tono)
    for (let i = 0; i < spaceBetweenLetters; i++) {
      morseCodeData[offset + i] = 0; // Esto asegura un silencio
    }
    offset += spaceBetweenLetters; // Espacio entre letras
  }

  const source = audioContext.createBufferSource();
  source.buffer = morseCodeBuffer;
  source.connect(audioContext.destination);
  playing.value = true;
  source.start(0);

  source.onended = () => {
    playing.value = false;
  };
};



const handleInput = (input = "") => {
  if (input.length > 0) {
    rawText.value = input;
  } else {
    rawText.value = "";
  }
};
const convertToWav = (buffer: AudioBuffer): Blob => {
  const wavData = encodeWav(buffer); // Esta función sería la que convierte el buffer a wav (ver más abajo)
  return new Blob([wavData], { type: 'audio/wav' });
};

// Función para convertir el AudioBuffer a WAV (una implementación básica)
const encodeWav = (buffer: AudioBuffer): Uint8Array => {
  const sampleRate = buffer.sampleRate;
  const numberOfChannels = buffer.numberOfChannels;
  const length = buffer.length;
  const data = new Float32Array(length * numberOfChannels);

  // Aplanar el AudioBuffer en un solo arreglo
  for (let channel = 0; channel < numberOfChannels; channel++) {
    data.set(buffer.getChannelData(channel), channel * length);
  }

  // Crear un array de bytes con los datos WAV
  const wav = new Uint8Array(44 + length * 2); // 44 bytes para el encabezado
  const view = new DataView(wav.buffer);

  // Encabezado WAV
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk size
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * 2, true);
  view.setUint16(32, numberOfChannels * 2, true); // Block align
  view.setUint16(34, 16, true); // Bits per sample
  writeString(view, 36, 'data');
  view.setUint32(40, length * 2, true);

  // Escribir los datos de audio
  for (let i = 0; i < length; i++) {
    const sample = Math.max(-1, Math.min(1, data[i]));
    view.setInt16(44 + i * 2, sample * 0x7FFF, true);
  }

  return wav;
};

// Función auxiliar para escribir cadenas de texto en un DataView
const writeString = (view: DataView, offset: number, string: string): void => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

const downloadAudio = (buffer: AudioBuffer) => {
  const wavBlob = convertToWav(buffer);
  const url = URL.createObjectURL(wavBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'morse-code.wav';
  link.click();
  URL.revokeObjectURL(url);
};
onBeforeUnmount(() => {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
  playing.value = false;
});




</script>

<template>
  <section>


    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-2xl font-bold mb-4">DitDah</h1>
      <input type="text" v-model="rawText" @input="handleInput(rawText)" placeholder="Type here..."
        class="border border-gray-300 p-2.5 rounded-xl mb-4 w-1/2" />
      <div class="flex gap-4 items-center">
        <button title="Play Morse Code" :disabled="playing || !rawText" @click="playMorseCode(rawText)"
          class="bg-blue-500/20 rounded-full text-white px-4 p-2">
          &#x1F3A4;
        </button>
        <p class="text-cyan-400 text-xl">{{ morsedText }}</p>
      </div>

      <h2 class="text-lg font-semibold">Audio:</h2>




      <p v-if="!rawText" class="text-red-500 mt-4">Please enter text to generate Morse code audio.</p>

      <p v-else-if="playing" class="text-green-500 mt-4">Playing Morse code...</p>

      <button v-if="rawText" @click="downloadAudio(audioContext?.createBuffer(1, sampleRate, sampleRate))"
        class="bg-green-500/20 rounded-full text-white px-4 p-2 mt-4">
        Download Audio
      </button>


    </div>
  </section>
</template>