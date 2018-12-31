package com.moventes.moventest.reactnative;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.Date;

public class TimerModule extends ReactContextBaseJavaModule {

	private static double startupTime;

	public TimerModule(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	public String getName() {
		return "Timer";
	}

	// @ReactMethod
	// public void setStartupTime(long startupTime) {
	// this.startupTime = startupTime;
	// }

	@ReactMethod
	public void getStartupTime(Promise promise) {
		WritableMap resultData = new WritableNativeMap();
		resultData.putDouble("startupTime", startupTime);
		promise.resolve(resultData);
	}

	public static void setStartupTime() {
		startupTime = new Date().getTime();//System.currentTimeMillis();
	}

}
