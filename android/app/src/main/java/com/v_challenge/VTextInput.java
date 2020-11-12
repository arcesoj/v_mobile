package com.v_challenge;

import android.text.Editable;
import android.text.InputType;
import android.text.TextWatcher;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.image.ReactImageView;

import java.lang.ref.WeakReference;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Map;

class VTextInput extends SimpleViewManager<EditText> {

    public static final String REACT_CLASS = "VTextInput";
    ReactApplicationContext mCallerContext;

    public VTextInput(ReactApplicationContext reactApplicationContext){
        this.mCallerContext = reactApplicationContext;
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected EditText createViewInstance(@NonNull ThemedReactContext reactContext) {
        EditText customEditText = new EditText(reactContext);
        //customEditText.setFocusable(false);
        //customEditText.addTextChangedListener(new InputFormatTextWatcher(mCallerContext, customEditText));
        return customEditText;
    }

    @ReactProp(name = "value")
    public void setValue(EditText view, @Nullable String text) {
        //view.setText(text);
    }

    @ReactProp(name = "placeholder")
    public void setPlaceholder(EditText view, @Nullable String text) {
        //view.setHint(text);
    }

    /*
    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                    "topChange",
                    MapBuilder.of(
                    "phasedRegistrationNames",
                    MapBuilder.of("bubbled", "onChange")))
                .build();
    }


    private class InputFormatTextWatcher implements TextWatcher {
        private final WeakReference<EditText> editTextWeakReference;
        private ReactApplicationContext mCallerContext;

        public InputFormatTextWatcher( ReactApplicationContext mCallerContext, EditText editText) {
            this.editTextWeakReference = new WeakReference<>(editText);
            this.mCallerContext = mCallerContext;
        }

        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {
        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
            EditText editText = editTextWeakReference.get();
            if (editText == null) return;
            WritableMap event = Arguments.createMap();
            event.putString("message", editText.getText().toString());
            mCallerContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                    editText.getId(),
                    "topChange",
                    event);
        }

        @Override
        public void afterTextChanged(Editable editable) {
            EditText editText = editTextWeakReference.get();
            if (editText == null) return;
            String s = editable.toString();
            if (s.isEmpty()) return;
            editText.removeTextChangedListener(this);
            String cleanString = s.replaceAll("[$,.]", "");
            BigDecimal parsed = new BigDecimal(cleanString).setScale(2, BigDecimal.ROUND_FLOOR).divide(new BigDecimal(100), BigDecimal.ROUND_FLOOR);
            String formatted = NumberFormat.getCurrencyInstance().format(parsed);
            editText.setText(formatted);
            editText.setSelection(formatted.length());
            editText.addTextChangedListener(this);
        }
    }
     */
}
