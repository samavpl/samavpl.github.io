let net;

const webcamElement = document.getElementById('videoElement');
document.getElementById('Debug').innerText = `Pressed`;
const cameraPush = async () => 
{
  console.log('Loading mobilenet..');
	
  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');
  
  // Create an object from Tensorflow.js data API which could capture image 
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);
  while (true) 
  {
    const img = await webcam.capture();
    const result = await net.classify(img);

    document.getElementById('output_field').innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability}
    `;

    
    img.dispose();

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
  }
}

cameraPush();