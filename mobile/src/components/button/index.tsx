import { Text, TextProps, TouchableOpacity, TouchableOpacityProps, ActivityIndicator} from "react-native";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import { s } from "./style";
import { colors } from "@/styles/theme";

type ButtonProps = TouchableOpacityProps & {
    isLoading?: boolean
}

function Button({children, style, isLoading = false, ...rest}: ButtonProps) {
    return (
        <TouchableOpacity 
            style={[s.container, style]} 
            disabled={isLoading}
            {...rest}
        >
            {isLoading ? <ActivityIndicator size="small" color={colors.gray['100']} /> : children}
        </TouchableOpacity>
    )
}

function ButtonTitle({children, style}: TextProps) {
    return <Text style={[s.title, style]}>{children}</Text>
}

type IconProps = {
    icon: React.ComponentType<TablerIconProps>
}

function Icon({icon: Icon}: IconProps) {
    return <Icon size={24} color={colors.gray['100']} />
}

Button.Title = ButtonTitle;
Button.Icon = Icon;

export { Button }