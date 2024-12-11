import { View, Text } from "react-native";
import { s } from "./style";
import { Step } from "@/components/step";

export function Steps() {
    return (
        <View style={s.container}>
            <Text style={s.title}>See how it works:</Text>

            <Step title="Title" description="Description" />
            <Step title="Hello" description="Linda" />
            <Step title="Fala" description="Princesa" />
        </View>
    )
}