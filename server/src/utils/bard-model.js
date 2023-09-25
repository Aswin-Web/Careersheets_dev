// const tf = require('@tensorflow/tfjs');

// // Load the Bard model
// const model = tf.loadModel('./bard-model.json');

// // Generate text using the Bard model
// async function generateText(prompt) {
//   // Create the input tensor
//   const inputTensor = tf.tensor([prompt]);

//   // Predict the output text
//   const outputTensor = await model.predict(inputTensor);

//   // Convert the output tensor to a string
//   const text = outputTensor.dataSync()[0];

//   // Return the text
//   return text;
// }

// // Export the generateText function
// module.exports = { generateText };