import { Alert, Text, View } from "react-native";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Categories, CategoriesProps } from "@/components/categories";
import { Places, MarketPlacesProps } from "@/components/places";

export default function Home() {

    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category, setCategory] = useState("");
    const [marketPlaces, setMarketPlaces] = useState<MarketPlacesProps[]>([]);

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

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchMarketPlaces();
    }, [category]);

    return (
        <View style={{flex: 1, paddingTop: 24, backgroundColor: "#ccc"}}>
            <Categories data={categories} onSelect={(id) => setCategory(id)} selected={category} />

                <Places data={marketPlaces} />
        </View>
    )
}