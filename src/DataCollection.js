import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function DataCollection({ onDataCollected }) {
    const [exercise, setExercise] = useState('');
    const [duration, setDuration] = useState('');

    const handleCollectData = () => {
        const data = { exercise, duration: parseFloat(duration) };
        onDataCollected(data);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Exercise"
                value={exercise}
                onChangeText={setExercise}
                style={styles.input}
            />
            <TextInput
                placeholder="Duration (mins)"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Add Exercise" onPress={handleCollectData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});
