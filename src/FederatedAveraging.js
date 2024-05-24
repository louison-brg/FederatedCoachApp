// src/FederatedAveraging.js
import * as tf from '@tensorflow/tfjs';

export default function federatedAveraging(models) {
    const averageWeights = (layers) => {
        return layers[0].map((layer, i) => {
            const weights = layers.map((l) => l[i].dataSync());
            const avg = weights[0].map((_, j) =>
                weights.reduce((sum, w) => sum + w[j], 0) / weights.length
            );
            return tf.tensor(avg, layer.shape);
        });
    };

    const layerWeights = models.map((model) => model.getWeights());
    const newWeights = averageWeights(layerWeights);
    const globalModel = models[0];
    globalModel.setWeights(newWeights);

    return globalModel;
}
