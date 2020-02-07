extern crate interp_core;
extern crate js_sys;
extern crate wasm_bindgen;

use interp_core::add;
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
