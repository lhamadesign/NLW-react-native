import { Alert, Text, View } from "react-native";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Categories, CategoriesProps } from "@/components/categories";
import { Places, MarketPlacesProps } from "@/components/places";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { colors, fontFamily } from "@/styles/theme";
import { router } from "expo-router";

export default function Home() {

    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category, setCategory] = useState("");
    const [marketPlaces, setMarketPlaces] = useState<MarketPlacesProps[]>([]);

    const currentLocation = {
        latitude: -23.561187293883442,
        longitude: -46.656451388116494
    }

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
            setCategory(data[0].id);
        } catch (error) {
            console.log(error);
            Alert.alert("Categories", "Could not load categories.");
        }
    }

    async function fetchMarketPlaces() {
        try {
            if (!category) {
                return
            }
            const { data } = await api.get("/markets/category/" + category);
            setMarketPlaces(data);
        } catch (error) {
            Alert.alert("Places", 'Could not load market places.')
        }
    }

    async function getCurrentLocation() {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();

            if (granted) {
                const location = await Location.getCurrentPositionAsync();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCurrentLocation();
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchMarketPlaces();
    }, [category]);

    return (
        <View style={{flex: 1}}>
            <Categories data={categories} onSelect={(id) => setCategory(id)} selected={category} />
            <MapView 
                style={{ flex: 1}}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                >
                    <Marker 
                        identifier="current"
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                        image={require("@/assets/location.png")}
                    />
                    
                    {marketPlaces.map((place) => (
                        <Marker 
                            key={place.id}
                            identifier={place.id}
                            coordinate={{
                                latitude: place.latitude,
                                longitude: place.longitude
                            }}
                            image={require("@/assets/pin.png")}
                        >
                            <Callout onPress={() => router.navigate(`/market/${place.id}`)}>
                                <View>
                                    <Text style={{ fontSize: 14, color: colors.gray[600], fontFamily: fontFamily.medium}}>{place.name}</Text>
                                    <Text style={{ fontSize: 12, color: colors.gray[600], fontFamily: fontFamily.regular}}>{place.address}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
            </MapView>
            <Places data={marketPlaces} />
        </View>
    )
}