import { View, Text } from "react-native";
import { s } from "./style";
import { Step } from "@/components/step";
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";

export function Steps() {
    return (
        <View style={s.container}>
            <Text style={s.title}>See how it works:</Text>

            <Step icon={IconMapPin} title="Find stores and businesses" description="See places around you that are registered to Nearby" />
            <Step icon={IconQrcode} title="Activate coupon by QR Code" description="Scan code in place and have benefits" />
            <Step icon={IconTicket} title="Enjoy a lot of facilities" description="Activate coupons wherever you are, for different types of stores" />
        </View>
    )
}