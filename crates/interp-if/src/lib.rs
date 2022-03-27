extern crate interp_core;
extern crate js_sys;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn info(s: &str);
}

/// Intermediate representation between JSON string and `interp_core::syntax::Expr` enum
#[derive(Debug, Deserialize)]
struct JsonAst {
    _type: String,
    val: serde_json::Value,
}

/// The `exec()` function executes program written in JSON
#[wasm_bindgen]
pub fn exec(err: &js_sys::Function, json_str: &str) {
    let json_ast = serde_json::from_str::<JsonAst>(json_str).unwrap_or_else(|_| {
        err.call1(
            &JsValue::NULL,
            &js_sys::Error::new("failed to convert JSON string into JsonAst"),
        )
        .ok();
        panic!(); // FIXME: consider setting panic hook
    });

    info(format!("_type: {}", json_ast._type).as_str());
    info(format!("val: {}", json_ast.val).as_str());

    // TODO: convert JsonAst into interp_core::syntax::Expr and reduce it
}
