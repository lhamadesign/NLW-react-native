import { Image, Text, View } from "react-native";
import { s } from "./style";

export function Welcome() {
    return (
        <View>
            <Image source={require("@/assets/logo.png")} style={s.logo} />
            <Text style={s.title}>Welcome to Nearby!</Text>
            <Text style={s.subtitle}>Find coupons to use in{"\n"}your favorite stores.</Text>
        </View>
    )
}