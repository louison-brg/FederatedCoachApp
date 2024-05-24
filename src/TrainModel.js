// src/TrainModel.js
import * as tf from '@tensorflow/tfjs';

export default async function trainModel(data) {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    const xs = tf.tensor2d(data.inputs, [data.inputs.length, 1]);
    const ys = tf.tensor2d(data.outputs, [data.outputs.length, 1]);

    await model.fit(xs, ys, { epochs: 10 });

    return model;
}
