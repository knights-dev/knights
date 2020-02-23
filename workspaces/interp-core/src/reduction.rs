//! Reduction.

use crate::syntax::*;
use crate::error::*;

impl Expr {
    ///Reduce an AST at one step.
    pub fn reduce(&self) -> Result<Expr, ReductionError> {
        Ok(self.clone())
    }
}
