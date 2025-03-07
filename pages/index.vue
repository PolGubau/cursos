<script setup lang="ts">
 
 const audioContext = new AudioContext();
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
  	"Z": "--.."
  };
  type MorseKey = keyof typeof morseCode;

const playing = ref(false);
const dahDuration = 300; // Duration of a dash in milliseconds
const ditDuration = 100; // Duration of a dot in milliseconds

const morseCodeAudio = ref(null);
const rawText = ref("");


const transformTextToMorse = (text:string) => {
    return text.split("").map((char) => morseCode[char.toUpperCase() as MorseKey] || "").join(" ");
};

const morsedText = computed(() => {
    return transformTextToMorse(rawText.value);
});

const morseCodeAudioRef = ref(null);

const playMorseCode = (text:string) => {
    const audioBuffer = audioContext.createBuffer(1, 44100, 44100);
    const morseCodeArray = text.split("").map((char) => morseCode[char.toUpperCase() as MorseKey] || "").join(" ");
     const morseCodeBuffer = audioContext.createBuffer(1, audioBuffer.length, audioBuffer.sampleRate);
    const morseCodeData = morseCodeBuffer.getChannelData(0);
    let offset = 0;

     for (const code of morseCodeArray) {
     for (const symbol of code.split("")) {   
    if (symbol === ".") {
                for (let i = 0; i < ditDuration; i++) {
                    morseCodeData[offset + i] = 0.5 * Math.sin(2 * Math.PI * 440 * (i / audioBuffer.sampleRate));
                }
                offset += ditDuration;
            } else if (symbol === "-") {
                for (let i = 0; i < dahDuration; i++) {
                    morseCodeData[offset + i] = 0.5 * Math.sin(2 * Math.PI * 440 * (i / audioBuffer.sampleRate));
                }
                offset += dahDuration;
            }
            // Add space between symbols
            offset += ditDuration;
        };
        // Add space between letters
        offset += dahDuration;
    };
    const source = audioContext.createBufferSource();
    source.buffer = morseCodeBuffer;
    source.connect(audioContext.destination);
    source.start(0);
    rawText.value = source;
    playing.value = true;
    source.onended = () => {
        playing.value = false;
    };
    source.onplay = () => {
        playing.value = true;
    };
    source.onpause = () => {
        playing.value = false;
    };
    source.onstop = () => {
        playing.value = false;
    };
    source.onended = () => {
        playing.value = false;
    };
  


};

const handleInput = (input:string) => {
    rawText.value = input;
    playMorseCode(input);
};
 
 </script>

<template>
  <section>

  
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-2xl font-bold mb-4">DitDah</h1>
      <input
        type="text"
        v-model="rawText"
        @input="handleInput(rawText)"
        placeholder="Type here..."
        class="border border-gray-300 p-2 rounded mb-4 w-1/2"
      />
      <div class="flex gap-4">
        <button title="Play Morse Code"
          @click="playMorseCode(rawText)"
          class="bg-blue-500/20 rounded-full text-white px-4 p-2"
        >
          &#x1F3A4;
        </button>
      </div>
      <p class="text-cyan-400">{{morsedText}}</p>
 
        <!-- <h2 class="text-lg font-semibold">Audio:</h2>
        <audio ref="morseCodeAudio" controls>
          <source :src="morseCodeAudio" type="audio/wav" />
          Your browser does not support the audio element.
        </audio> -->
 
 
    </div>
    </section>  
</template>
 