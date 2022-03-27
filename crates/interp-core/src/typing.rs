//! Typing.

use crate::error::*;
use crate::syntax::*;

impl Expr {
    /// Infer a type of the expression.
    pub fn infer(&self) -> Result<TypedExpr, TypeError> {
        Ok(TypedExpr::TEVar(
            Type::TyCon("Foo".to_string()),
            42, // this value is a placeholder
        ))
    }
}
