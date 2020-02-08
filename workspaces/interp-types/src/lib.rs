//! Definitions AST, values, and types used by interp-if and interp-core

/// AST
#[derive(Clone, Debug)]
pub enum Expr {
    Foo,
}

/// Values
#[derive(Clone, Debug)]
pub enum Value{
    Bar,
}

/// Types 
#[derive(Clone, Debug)]
pub enum Type{
    Baz,
}
