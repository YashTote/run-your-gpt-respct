// import WebSocket from 'ws';

// For reverse-proxied streaming, the remote will likely host with ssl - wss://
var URI = 'wss://tell-jewelry-industries-rebates.trycloudflare.com/api/v1/stream'

const run = async (context) => {
  const request = {
    'prompt': context,
    'max_new_tokens': 250,
    'auto_max_new_tokens': false,

    // # Generation params. If 'preset' is set to different than 'None', the values
    // # in presets/preset-name.yaml are used instead of the individual numbers.
    'preset': 'None',
    'do_sample': true,
    'temperature': 0.7,
    'top_p': 0.1,
    'typical_p': 1,
    'epsilon_cutoff': 0, 
    'eta_cutoff': 0,  
    'tfs': 1,
    'top_a': 0,
    'repetition_penalty': 1.18,
    'repetition_penalty_range': 0,
    'top_k': 40,
    'min_length': 0,
    'no_repeat_ngram_size': 0,
    'num_beams': 1,
    'penalty_alpha': 0,
    'length_penalty': 1,
    'early_stopping': false,
    'mirostat_mode': 0,
    'mirostat_tau': 5,
    'mirostat_eta': 0.1,
    'guidance_scale': 1,
    'negative_prompt': '',

    'seed': -1,
    'add_bos_token': true,
    'truncation_length': 2048,
    'ban_eos_token': false,
    'skip_special_tokens': true,
    'stopping_strings': []
  };

  const websocket = new WebSocket(URI);

  await new Promise((resolve) => {
    websocket.addEventListener('open', () => {
      websocket.send(JSON.stringify(request));
      resolve();
    });
  });

  const responses = [];

  await new Promise((resolve) => {
    websocket.addEventListener('message', (data) => {
        // console.log(data.);
      const incomingData = JSON.parse(data.data);
      switch (incomingData.event) {
        case 'text_stream':
          responses.push(incomingData.text);
          break;
        case 'stream_end':
          resolve();
          break;
      }
    });
  });

  return responses;
};

export function updateURI(e){
   URI = e;
   console.log(URI);
   return true;
}


export async function printResponseStream(prompt){
  const responses = await run(prompt);
  let output = '';
  for (const response of responses) {
    output += response;
  } 
  return output;
//   console.log(output);
}

// const prompt = "Tell me in brief about tiger:\n1)";

console.log("Hello World");
// printResponseStream(prompt);
