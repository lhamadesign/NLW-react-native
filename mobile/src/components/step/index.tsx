import { View, Text } from "react-native";
import { colors, fontFamily } from "@/styles/theme";
import { s } from "./style";

export type Props = {
    title: string,
    description: string,
}

export function Step(props: Props) {
    return (
        <View style={s.container}>
            <View style={s.details}>
                <Text style={s.title}>{props.title}</Text>
                <Text style={s.description}>{props.description}</Text>
            </View>
        </View>
    )
}