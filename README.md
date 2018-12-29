# Moventest ReactNative

This project is part of an experimentation to test different mobile cross platform frameworks.
It connects to a Google Cloud Firestore database, displays a list of stored users, and allows to modify / add some.

## How to
To launch the project:
- install ReactNative: https://facebook.github.io/react-native/docs/getting-started.html
- run `npm install`
- run `react-native run-android`

To display the logs while running on an Android device\
`adb logcat *:S ReactNative:V ReactNativeJS:V`

To install a release apk
- modify the android/gradle.properties file to add the following:
MYAPP_RELEASE_STORE_FILE=F:/Android/keystore/Keystore
MYAPP_RELEASE_KEY_ALIAS=mrk playing with android
MYAPP_RELEASE_STORE_PASSWORD=xxxx
MYAPP_RELEASE_KEY_PASSWORD=xxxx
- execute this command line in the android directory: `gradlew installRelease`