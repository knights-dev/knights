//! Reduction.

use crate::error::*;
use crate::syntax::*;

impl Expr {
    ///Reduce an AST at one step.
    pub fn reduce(&self) -> Result<Expr, ReductionError> {
        Ok(self.clone())
    }
}
