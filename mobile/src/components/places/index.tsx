import { useRef } from "react";
import { Place, PlaceProps } from "@/components/place";
import { Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { s } from "./style";
import { router } from "expo-router";

type Props = {
    data: PlaceProps[]
};

export type MarketPlacesProps = PlaceProps & {
    latitude: number
    longitude: number
};

export function Places({data}: Props) {
    const dimensions = useWindowDimensions();
    const bottomSheetRef = useRef<BottomSheet>(null);
    
    const snapPoints = {
        min: 278,
        max: dimensions.height - 128
    }
    
    return (
        <BottomSheet 
            ref={bottomSheetRef}
            snapPoints={[snapPoints.min, snapPoints.max]}
            handleIndicatorStyle={s.indicator}
            backgroundStyle={s.container}
            enableOverDrag={false}
            >
            <BottomSheetFlatList 
                data={data} keyExtractor={(item) => item.id}
                renderItem={({item}) => <Place data={item} onPress={() => router.navigate(`/market/${item.id}`)} />}
                contentContainerStyle={s.content}
                ListHeaderComponent={() => (
                    <Text style={s.title}>Explore places nearby</Text>
                )}
                showsVerticalScrollIndicator={false}
            >
            </BottomSheetFlatList>
        </BottomSheet>
    )
}