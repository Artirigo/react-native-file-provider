# React Native Module for setting up a FileProvider for File Sharing

This plugin is for generating and sharing contentURIs (`content://...`) from files stored in the internal storage area.

The files can reside in one of this places:

- `files` subdirectory of your app's internal storage area. This subdirectory is the same as the value returned by `Context.getFilesDir()`.
- `cache` subdirectory of your app's internal storage area. The root path of this subdirectory is the same as the value returned by `getCacheDir()`.
- root of the external storage area. The root path of this subdirectory is the same as the value returned by `Environment.getExternalStorageDirectory()`.
- root of your app's external storage area. The root path of this subdirectory is the same as the value returned by `Context.getExternalFilesDir()`.
- root of your app's external cache area. The root path of this subdirectory is the same as the value returned by `Context.getExternalCacheDir()`.

After generating a contentUri you can for example share the file with other Apps using [react-native-share](https://github.com/EstebanFuentealba/react-native-share), etc.


## Getting started

`$ npm install react-native-file-provider --save`

### Mostly automatic installation

`$ react-native link react-native-file-provider`

### Manual installation


#### Android

1. Append the following lines to `android/settings.gradle`:

  	```
  	include ':react-native-file-provider'
  	project(':react-native-file-provider').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-file-provider/android')
  	```
2. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
    
  	```
    compile project(':react-native-file-provider')
  	```
3. Import Package
  
    **For React Native >= v0.29**
  
    Update the `MainApplication.java` file to use the Plugin via the following changes:
    
    ```java
    ...
    // 1. Import the plugin class.
   import com.artirigo.fileprovider.RNFileProviderPackage;
    
    public class MainApplication extends Application implements ReactApplication {
    
        private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
            ...   
            @Override
            protected List<ReactPackage> getPackages() {
                // 2. Instantiate an instance of the Plugin runtime and add it to the list of
                // existing packages.
                return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNFileProviderPackage()
                );
            }
        };
    }
    ```
    
    **For React Native v0.19 - v0.28**
  
    Update the `MainActivity.java` file to use the Plugin via the following changes:
    
    ```java
    ...
    // 1. Import the plugin class (if you used RNPM to install the plugin, this
    // should already be done for you automatically so you can skip this step).
    import com.artirigo.fileprovider.RNFileProviderPackage;
    
    public class MainActivity extends ReactActivity {    
        @Override
        protected List<ReactPackage> getPackages() {
            // 2. Instantiate an instance of the Plugin runtime and add it to the list of
            // existing packages.
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RNFileProviderPackage()
            );
        }
    
        ...
    }
    ```


## Usage

### Define FileProvider

Defining a FileProvider for your app requires an entry in your manifest. 
This entry specifies the authority to use in generating content URIs, as 
well as the name of an XML file that specifies the directories your app can share.

The following snippet shows you how to add the FileProvider to your `AndroidManifest.xml`

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.myapp">
    <application
        ...>
        <provider
            android:name="android.support.v4.content.FileProvider"
            android:authorities="com.example.myapp.fileprovider"
            android:grantUriPermissions="true"
            android:exported="false">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>
        ...
    </application>
</manifest>
```
### Specify directories

Once you have added the FileProvider to your app manifest, you need to specify the 
directories that contain the files you want to share. To specify the directories, 
start by creating the file `file_paths.xml` in the `res/xml/` subdirectory of your project.
 
In this file, specify the directories by adding an XML element for each directory. 
The following snippet shows you an example of the contents of `res/xml/file_paths.xml`. 
The snippet also demonstrates how to share a subdirectory of the files/ directory 
in your internal storage area:

```xml
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <files-path name="img" path="images/"/>
</paths>
```

For setting up other directories (cache, external storage, ...) follow the guide at 
[https://developer.android.com/reference/android/support/v4/content/FileProvider.html](https://developer.android.com/reference/android/support/v4/content/FileProvider.html) 


### Get contentUri

Finally you can generate the contentUri. 

```javascript
import FileProvider from 'react-native-file-provider';
import { DocumentDirectoryPath } from 'react-native-fs';

if(FileProvider) {
    FileProvider.getUriForFile('com.example.myapp.fileprovider', `${DocumentDirectoryPath}/images/image.jpg`)
        .then((contentUri) => {
            console.log('contentUri', contentUri);
        });
}
```
  