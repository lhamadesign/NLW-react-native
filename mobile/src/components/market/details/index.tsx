import { IconMap, IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import { Text, View } from "react-native";
import { s } from "./style";

import { Contact } from "@/components/market/contact";

export type PropsDetails = {
    name: string
    description: string
    address: string
    phone: string
    coupons: number
    rules: {
        id: string
        description: string
    }[]
}

type Props = {
    data: PropsDetails
}

export function Details({data}: Props) {
    return (
        <View style={s.container}>
            <Text style={s.name}>{data.name}</Text>
            <Text style={s.description}>{data.description}</Text>

            <View style={s.group}>
                <Text style={s.title}>Information</Text>

                <Contact icon={IconTicket} description={`${data.coupons} available`} />
                <Contact icon={IconMapPin} description={data.address} />
                <Contact icon={IconPhone} description={data.phone} />
            </View>

            <View style={s.group}>
                <Text style={s.title}>Rules</Text>
                {data.rules.map((rule) => (
                    <Text key={rule.id} style={s.rule}>{`\u2022 ${rule.description}`}</Text>
                ))}
            </View>
        </View>
    )
}