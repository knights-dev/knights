//! Definitions AST, values, and types used by interp-if and interp-core

type Name = String;

/// Literal expression
#[derive(Clone, Debug)]
pub enum Lit {
    Int(i64),
}

/// AST
#[derive(Clone, Debug)]
pub enum Expr {
    App(Box<Expr>, Box<Expr>),
    Lam(Name, Option<Type>, Box<Expr>),
    Var(Name),
    Lit(Lit),
}

/// Types
#[derive(Clone, Debug)]
pub enum Type {
    TyVar(Name),
    TyCon(Name),
    TyFun(Box<Type>, Box<Type>),
}
