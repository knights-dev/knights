extern crate interp_core;
extern crate js_sys;
extern crate serde;
extern crate serde_json;
extern crate wasm_bindgen;

use interp_core::add;
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn apply(f: &js_sys::Function) {
    let _ = f.call1(&JsValue::NULL, &JsValue::from(add(3, 4)));
}

fn make_object() -> JsValue {
    let n = js_sys::Object::new();
    match (|n| -> Result<JsValue, JsValue> {
        js_sys::Reflect::set(n, &"foo".into(), &"bar".into())?;
        js_sys::Reflect::set(n, &"fuga".into(), &"piyo".into())?;
        Ok(n.into())
    })(&n)
    {
        Ok(v) => return v,
        Err(_) => return JsValue::NULL,
    }
}

fn into_hashmap(obj: &js_sys::Object) -> HashMap<String, serde_json::Value> {
    let result: HashMap<String, serde_json::Value> = JsValue::from(obj).into_serde().unwrap();
    return result;
}

#[wasm_bindgen]
pub fn sync_command(payload: &js_sys::Object) -> JsValue {
    match (|| -> Result<JsValue, JsValue> {
        let payload: HashMap<String, serde_json::Value> = into_hashmap(payload);
        let command: String = payload
            .get(&"command".to_string())
            .ok_or(JsValue::NULL)?
            .as_str()
            .ok_or(JsValue::NULL)?
            .to_string();
        let result: JsValue = match command.as_str() {
            "greet" => {
                let name: String = payload
                    .get(&"name".to_string())
                    .ok_or(JsValue::NULL)?
                    .as_str()
                    .ok_or(JsValue::NULL)?
                    .to_string();
                greet(&name);
                JsValue::NULL
            }
            "make_object" => make_object(),
            _ => return Err(JsValue::NULL),
        };
        Ok(result)
    })() {
        Ok(v) => return v,
        Err(_) => return JsValue::NULL,
    }
}
