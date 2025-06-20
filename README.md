 The Chat-App will
 provide users with a chat interface and options to share images, photos, and their location.


|Expo |Firebase |Google Maps Api |
|-|-|-| 
|Creating the developmental build| RTA storage| Displaying map location

Components leveraged in this Application:
- 
- Gifted Chat
- KeyboardAvoidingView
- Expo-Image-Picker
- Expo-Location
- MapView

## Key Features

 1. A page where users can enter their name and choose a background color for the chat screen before joining the chat.
 2. A page displaying the conversation, as well as an input field and submit button.
 3. The chat must provide users with two additional communication features: sending images and location data.
 4. Data gets stored online and offline.



 # Setting up the environment

 This app utilizes expo to create a development build and only is available to android users.


To run this application, you have to download the development build on your android device: [Development Build](https://expo.dev/accounts/dizzypete/projects/chat/builds/3543635e-635a-4d69-8316-65c833976ba3)

Use the link above to either copy the url into the browser (for emulator) or take a picture of the QR code that is provided. This will QR code is also provided when you run the developmental server on your computer.


If you don't have an android device, you can also run it through the android studio. Follow the "Android Studio" instructions below:

## Android Studio Emulator

 [Download android studio here](https://developer.android.com/studio)

[Follow along with the instructions on running an emulator here](https://developer.android.com/studio/run/emulator)


## Running the build

### Install the Repo

Once you have a test device set up, fork the build here: 
[Chat-App](https://github.com/srpmfp/chat-app)

*Ensure you are running:*
- Node: v22.15.0 <br>


On your computer, create a clone of the repository through github. Open up the repository in your editor.

In your editor of choice use in the terminal:

    npm install 
or<br>
        
    yarn install

<u><b>macOS</b></u>

    brew install

### Prebuild
Once the installer has finished loading the necessary packages, you need to create a preloaded version of the application in your IDE.

In the terminal type
<br>

    npx expo prebuild

Make sure at this point you have your emulator running and type:

    npx expo run:android

If you run into any connectivity issues use:


    npx expo start --tunnel

This will pull up a menu:

    › Using development build
    › Press s │ switch to Expo Go

    › Press a │ open Android// select this one
    › Press w │ open web

    › Press j │ open debugger
    › Press r │ reload app
    › Press m │ toggle menu
    › shift+m │ more tools
    › Press o │ open project code in your editor

    › Press ? │ show all commands

This will ensure any firewalls don't get in the way of running the application.

If you have the App installed on your device or your emulator, this should begin to package the bundle, allowing you to access the application.



---

Future Changes and additions

- long press for adding reactions to chat
- marker for map
- creating cross platform functionality by bringing in leaflet function for web emulation.
- If in `<InputBox>` allowing users to use enter to send messages








