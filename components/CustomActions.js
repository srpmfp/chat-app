import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

const CustomActions = () => {
    const actionSheet = useActionSheet();
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);

    const pickImage = async () => {
        const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();

            if (!result.canceled) setImage(result.assets[0]);
            else setImage(null);

        }
    }

    //button items to be selected from extra action
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                    default:
                }
            },
        );
    };

    return (

        <TouchableOpacity styles={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper]}>
                <Text style={[styles.iconText]}>+</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        marginLeft: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomActions;