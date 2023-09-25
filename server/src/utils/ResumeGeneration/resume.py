import tensorflow as tf
import json

def generate_model():
  """Generates a TensorFlow.js model for generating resumes."""

  # Create a sequential model
  model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
  ])

  # Compile the model
  model.compile(optimizer='adam',
                loss='binary_crossentropy',
                metrics=['accuracy'])

  # Save the model to a JSON file
  model.save_model('model.json')

if __name__ == '__main__':
  generate_model()