import { Button } from '@/components/button';
import { Steps } from '@/components/steps';
import { Welcome } from '@/components/welcome';
import { View, Text } from 'react-native';
import { router } from "expo-router";

export default function Index() {
    return (
        <View style={{ flex: 1, padding: 40, gap: 40}}>
            <Welcome />
            <Steps />
            <Button onPress={() => router.navigate("/home")}>
                <Button.Title>Start</Button.Title>
            </Button>
        </View>
    )
}