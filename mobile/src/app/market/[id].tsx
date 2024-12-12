import { useEffect, useState, useRef } from "react";
import { Alert, View, Modal, StatusBar, ScrollView } from "react-native";
import { useLocalSearchParams, router, Redirect } from "expo-router";
import { api } from "@/services/api";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";
import { useCameraPermissions, CameraView } from "expo-camera";

type DataProps = PropsDetails & {
    cover: string
};

export default function Market() {

    const [_, requestPermission] = useCameraPermissions()
    const params = useLocalSearchParams<{ id: string}>();
    
    const [data, setData] = useState<DataProps>()
    const [isLoading, setIsLoading] = useState(true)
    const [coupon, setCoupon] = useState<string | null>(null)
    const [isFetchingCoupon, setIsFetchingCoupon] = useState(false)
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)

    const qrLock = useRef(false);

    console.log(params.id);
    
    async function fetchMarketInfo() {
        try {
            const { data } = await api.get(`/markets/${params.id}`);
            setData(data);
            setIsLoading(false);
        } catch (error) {
            Alert.alert("Error", "Could not load market information.", [
                { text: "OK", onPress: () => router.back()}
            ]);
        }
    }

    async function handleOpenCamera() {
        try {
            const { granted } = await requestPermission();
            if (!granted) {
                return Alert.alert("Camera", "You have to allow camera usage to read QR Codes.");

            }
            qrLock.current = false;
            setIsVisibleCameraModal(true)
        } catch (error) {
            Alert.alert("Camera", "Could not open camera.");           
        }
    }

    async function getCoupon(id: string) {
        try {
            setIsFetchingCoupon(true);
            const { data } = await api.patch(`/coupons/${id}`);
            Alert.alert("Coupon:", data.coupon)
            setCoupon(data.coupon);
        } catch (error) {
            Alert.alert("Error", "Not possible to fetch coupon.");
        } finally {
            setIsFetchingCoupon(false);
        }
    }

    function confirmCouponUsage(id: string) {
        setIsVisibleCameraModal(false);
        Alert.alert(
            "Coupon",
            "Can't reuse a coupom already redeemed. Really want to redeem now?",
            [
                { style: "cancel", text: "No"},
                { text: "Yes", onPress: () => getCoupon(id)}
            ]
        )
    }

    useEffect(() => {
        fetchMarketInfo();
    }, [params.id, coupon])

    if (isLoading) {
        return <Loading />
    }

    if (!data) {
        return <Redirect href="/home" />
    }

    return (
        <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Cover uri={data.cover} />
                <Details data={data} />
            </ScrollView>
            {coupon && <Coupon code={coupon} />}
            <View style={{ padding: 32}}>
                <Button onPress={handleOpenCamera}>
                    <Button.Title>Read QR Code</Button.Title>
                </Button>
            </View>
            <Modal style={{flex: 1}} visible={isVisibleCameraModal}>
                <CameraView style={{flex: 1}} facing="back" onBarcodeScanned={({ data }) => {
                    if (data && !qrLock.current) {
                        qrLock.current = true
                        setTimeout(() => confirmCouponUsage(data), 500)
                    }
                }} />
                <View style={{flex: 1, justifyContent: "center", position: "absolute", bottom: 32, left: 32, right: 32}}>
                    <Button onPress={() => setIsVisibleCameraModal(false)} isLoading={isFetchingCoupon}>
                        <Button.Title>Back</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}