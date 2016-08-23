
package com.artirigo.fileprovider;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;

import java.io.File;
import android.net.Uri;

import android.support.v4.content.FileProvider;

public class RNFileProviderModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNFileProviderModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNFileProvider";
  }

  @ReactMethod
  public void getUriForFile(String authority, String filepath, Promise promise) {
    try {
      // replace file-protocol if present
      filepath = filepath.replace("file://", "");
      //
      File file = new File(filepath);
      if (!file.exists()) throw new Exception("File does not exist");
      Uri contentUri = FileProvider.getUriForFile(this.getReactApplicationContext(), authority, file);
      promise.resolve(contentUri.toString());
    } catch (Exception ex) {
      ex.printStackTrace();
      reject(promise, filepath, ex);
    }
  }

  private void reject(Promise promise, String filepath, Exception ex) {
    promise.reject(null, ex.getMessage());
  }


}