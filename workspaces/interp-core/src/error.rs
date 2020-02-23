//! Errors in the interpreter.

/// Errors in typing.
#[derive(Debug, Clone, PartialEq)]
pub enum TypingError {
    UnificationFailed,
    OccursCheckFailed,
}

/// Errors in reduction.
#[derive(Debug, Clone, PartialEq)]
pub enum ReductionError {
    SomethingWrong,
}
