import { useRef } from "react";
import { Place, PlaceProps } from "@/components/place";
import { Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"

type Props = {
    data: PlaceProps[]
};

export type MarketPlacesProps = PlaceProps & {

};

export function Places({data}: Props) {
    const dimensions = useWindowDimensions();
    const bottomSheetRef = useRef<BottomSheet>(null);
    return (
        <BottomSheet>
            <BottomSheetFlatList data={data} keyExtractor={(item) => item.id} renderItem={({item}) => <Place data={item} />}>

            </BottomSheetFlatList>
        </BottomSheet>
    )
}