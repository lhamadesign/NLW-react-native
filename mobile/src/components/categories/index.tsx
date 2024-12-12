import { s } from "./style";
import { Category } from "@/components/category";
import { FlatList, View } from "react-native";

export type CategoriesProps = {
    id: string
    name: string
}[]

type Props = {
    data?: CategoriesProps
    selected: string
    onSelect: (id: string) => void
}

export function Categories({data, selected, onSelect}: Props) {
    return (
        <View style={s.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Category name={item.name} iconId={item.id} onPress={() => onSelect(item.id)} isSelected={item.id === selected} />}
                horizontal
                contentContainerStyle={s.content}
            />
        </View>
    )
}