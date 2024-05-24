// src/Chat.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { getChatGPTResponse } from './ChatGPTService';

export default function Chat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        const botResponseText = await getChatGPTResponse(input);
        const botMessage = { sender: 'bot', text: botResponseText };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        setInput('');
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <ScrollView style={{ flex: 1 }}>
                {messages.map((msg, index) => (
                    <Text key={index} style={{ color: msg.sender === 'user' ? 'blue' : 'green' }}>
                        {msg.sender}: {msg.text}
                    </Text>
                ))}
            </ScrollView>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                value={input}
                onChangeText={setInput}
            />
            <Button title="Send" onPress={handleSend} />
        </View>
    );
}
