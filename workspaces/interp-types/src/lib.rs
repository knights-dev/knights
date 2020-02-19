//! Definitions AST, values, and types used by interp-if and interp-core

/// Aliases
type VarId = String;
type TyVarId = u64;
type TyConId = String;

/// Literal expression
#[derive(Clone, Debug)]
pub enum Lit {
    Int(i64),
}

/// AST
#[derive(Clone, Debug)]
pub enum Expr {
    App(Box<Expr>, Box<Expr>),
    Lam(VarId, Option<Type>, Box<Expr>),
    Var(VarId),
    Lit(Lit),
}

/// An data expression of a type variable
#[derive(Clone, Debug)]
pub enum TV {
    TV(TyVarId),
}

/// Types
#[derive(Clone, Debug)]
pub enum Type {
    TyVar(TV),
    TyCon(TyConId),
    TyFun(Box<Type>, Box<Type>),
}
