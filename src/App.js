// src/App.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import DataCollection from './DataCollection';
import Chat from './Chat';
import TensorFlowWebView from './TensorFlowWebView';
import trainModel from './TrainModel';
import federatedAveraging from './FederatedAveraging';
import { updateGlobalModel } from './UpdateModel';
import { ensurePrivacy } from './Privacy';

export default function App() {
    const [data, setData] = useState([]);
    const [model, setModel] = useState(null);
    const [recommendation, setRecommendation] = useState('');

    const handleDataCollected = async (newData) => {
        const processedData = ensurePrivacy(newData);
        setData([...data, processedData]);

        if (data.length > 0) {
            const localModel = await trainModel({
                inputs: data.map(d => d.duration),
                outputs: data.map(d => d.duration)
            });
            const globalModel = await updateGlobalModel(localModel);
            setModel(globalModel);

            // Generate a recommendation based on the new model
            const prediction = globalModel.predict(tf.tensor2d([newData.duration], [1, 1])).dataSync()[0];
            setRecommendation(`Based on your recent activity, we recommend a duration of ${prediction.toFixed(2)} minutes.`);
        }
    };

    const handleModelTrained = (trainedWeights) => {
        console.log('Model weights:', trainedWeights);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', margin: 20 }}>Personalized Fitness Coach</Text>
            <View style={{ flex: 1 }}>
                <DataCollection onDataCollected={handleDataCollected} />
                {recommendation && (
                    <Text style={{ fontSize: 18, textAlign: 'center', margin: 20 }}>{recommendation}</Text>
                )}
                <Chat />
                <TensorFlowWebView onModelTrained={handleModelTrained} />
            </View>
        </SafeAreaView>
    );
}
