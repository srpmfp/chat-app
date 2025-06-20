
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';


const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, userID, name, storage }) => {

    const actionSheet = useActionSheet();

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
    }
    // Function to generate a unique reference string for the image
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const ImageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${ImageName}`;
    }

    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(imageURI);
        const blob = await response.blob();

        // Upload the image to Firebase Storage with the unique reference string
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref)
            onSend([{
                _id: Math.random().toString(36).substring(7), // Generate a random ID for the message
                createdAt: new Date(),
                user: {
                    _id: userID,
                    name: name
                }, image: imageURL
            }])
        });
    }

    const pickImage = async () => {
        try { // Request permission to access media library
            let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissions?.granted) {
                let result = await ImagePicker.launchImageLibraryAsync();

                if (!result.canceled) {
                    await uploadAndSendImage(result.assets[0].uri);

                }
                else Alert.alert('You do not have permissions')

            }
        }
        catch (error) {

            Alert.alert('Error picking image', error.message);
        }
    }
    // Function to take a photo using the camera in Action Sheet
    const takePhoto = async () => {
        try {
            let permissions = await ImagePicker.requestCameraPermissionsAsync();
            if (permissions?.granted) {
                let result = await ImagePicker.launchCameraAsync();
                if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
                else Alert.alert("Permissions haven't been granted.");
            }
        }
        catch (error) {
            Alert.alert('Error taking photo', error.message);
        }
    }

    // Function to get the current location in Action Sheet
    const getLocation = async () => {

        try {
            let permissions = await Location.requestForegroundPermissionsAsync();
            if (permissions?.granted) {
                const location = await Location.getCurrentPositionAsync({});
                // If location is found, send it to the chat
                if (location) {
                    onSend([{
                        _id: Math.random().toString(36).substring(7), // Generate a random ID for the message
                        createdAt: new Date(),
                        user: {
                            _id: userID
                        },
                        location: {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude

                        }

                    }])


                } else {
                    Alert.alert('Location not found');
                }
            } else {
                Alert.alert('Permission to access location was denied')
            }
        } catch (error) {
            Alert.alert('Error getting location', error.message);
        }

    }

    return (
        <TouchableOpacity styles={styles.container} onPress={onActionPress} accessibility={true} accessibilityLabel="More options" accessibilityHint="Choose to send an image or location">
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text accessibility={true} accessibilityLabel="More options" accessibilityHint="Choose to send an image or location" style={[styles.iconText, iconTextStyle]}>+</Text>
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
        flex: 2,
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